with open('app/categories/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

target1 = """  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);"""

# Normalize \r\n to \n for search
is_crlf = '\r\n' in text
norm_text = text.replace('\r\n', '\n')

fil_start = norm_text.find("  const filteredProducts = useMemo(() => {")
fil_end = norm_text.find("  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);") + len("  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);")

pag_start = norm_text.find("  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;")
pag_end = norm_text.find("  }, [filteredProducts, currentPage]);") + len("  }, [filteredProducts, currentPage]);")

print(f"fil: {fil_start} to {fil_end}, pag: {pag_start} to {pag_end}")

if pag_start < fil_start and pag_start != -1 and fil_start != -1:
    pag_block = norm_text[pag_start:pag_end]
    fil_block = norm_text[fil_start:fil_end]
    
    # Reassemble: before pag, then fil, then newline, then pag, then after fil
    before = norm_text[:pag_start]
    after = norm_text[fil_end:]
    
    new_text = before + fil_block + "\n\n" + pag_block + after
    if is_crlf:
        new_text = new_text.replace('\n', '\r\n')
    
    with open('app/categories/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Reordered successfully!")
else:
    print("Positions invalid or already ordered")

