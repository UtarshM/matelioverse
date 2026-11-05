with open('app/categories/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Let's inspect where selectedCategory useEffect ends
# and where 'return (' begins
start_idx = None
end_idx = None
for i, line in enumerate(lines):
    if "setCurrentPage(1);" in line:
        start_idx = i + 3 # after closing bracket of useEffect
    if "return (" in line and start_idx is not None and end_idx is None:
        end_idx = i
        break

print(f"Replacing lines {start_idx} to {end_idx}")

clean_block = [
    "\n",
    "  const filteredProducts = useMemo(() => {\n",
    "    return PRODUCTS.filter((p) => {\n",
    "      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;\n",
    "      if (selectedBrand !== 'all') {\n",
    "        const normBrand = selectedBrand.toLowerCase();\n",
    "        const productBrand = p.brand.toLowerCase();\n",
    "        if (!productBrand.includes(normBrand) && !normBrand.includes(productBrand)) {\n",
    "          return false;\n",
    "        }\n",
    "      }\n",
    "      if (selectedSla !== 'all' && p.slaType !== selectedSla) return false;\n",
    "      if (onlyPrivateLabels && !p.isPrivateLabel) return false;\n",
    "      if (searchQuery.trim()) {\n",
    "        const query = searchQuery.toLowerCase();\n",
    "        const matchName = p.name.toLowerCase().includes(query);\n",
    "        const matchBrand = p.brand.toLowerCase().includes(query);\n",
    "        const matchCategory = p.category.toLowerCase().includes(query);\n",
    "        const matchSubCategory = p.subCategory ? p.subCategory.toLowerCase().includes(query) : false;\n",
    "        const matchDesc = p.description.toLowerCase().includes(query);\n",
    "        const matchSpecs = p.specs ? Object.values(p.specs).some((v) => v.toLowerCase().includes(query)) : false;\n",
    "        if (!matchName && !matchBrand && !matchCategory && !matchSubCategory && !matchDesc && !matchSpecs) return false;\n",
    "      }\n",
    "      return true;\n",
    "    });\n",
    "  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);\n",
    "\n",
    "  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;\n",
    "  const paginatedProducts = useMemo(() => {\n",
    "    const start = (currentPage - 1) * PAGE_SIZE;\n",
    "    return filteredProducts.slice(start, start + PAGE_SIZE);\n",
    "  }, [filteredProducts, currentPage]);\n",
    "\n"
]

new_lines = lines[:start_idx] + clean_block + lines[end_idx:]

with open('app/categories/page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Clean replace completed!")

