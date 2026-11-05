import os

file_path = "app/categories/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add state for currentPage and reset effect
target_filter = "  const filteredProducts = useMemo(() => {"

pagination_logic = """  const PAGE_SIZE = 36;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);

  const filteredProducts = useMemo(() => {"""

code = code.replace(target_filter, pagination_logic, 1)

# 2. Add paginatedProducts slice
target_after_filter = "  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);"

paginated_slice = """  }, [selectedCategory, selectedBrand, selectedSla, onlyPrivateLabels, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);"""

code = code.replace(target_after_filter, paginated_slice, 1)

# 3. Update counter text
old_counter = "Showing <strong>{filteredProducts.length}</strong> verified materials"
new_counter = "Showing <strong>{filteredProducts.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}</strong> of <strong>{filteredProducts.length.toLocaleString()}</strong> verified materials"
code = code.replace(old_counter, new_counter, 1)

# 4. Replace filteredProducts.map with paginatedProducts.map and add pagination controls
old_map = """            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>"""

pagination_controls = """            {paginatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 42, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  background: currentPage === 1 ? '#F1F5F9' : '#FFFFFF',
                  color: currentPage === 1 ? '#94A3B8' : '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                ← Prev
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                if (pageNum < 1 || pageNum > totalPages) return null;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      border: isActive ? '2px solid var(--primary-green)' : '1.5px solid #E2E8F0',
                      background: isActive ? 'var(--primary-green)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#334155',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  background: currentPage === totalPages ? '#F1F5F9' : '#FFFFFF',
                  color: currentPage === totalPages ? '#94A3B8' : '#0F172A',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Next →
              </button>
              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 10 }}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>"""

code = code.replace(old_map, pagination_controls, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Updated app/categories/page.tsx with pagination successfully!")

