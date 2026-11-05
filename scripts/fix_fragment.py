file_path = "app/categories/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

target = """) : (
          <div className="categories-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>"""

replacement = """) : (
          <>
            <div className="categories-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>"""

target_end = """              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 10 }}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>"""

replacement_end = """              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 10 }}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
          </>
        )}
      </div>
    </div>"""

if target in code and target_end in code:
    code = code.replace(target, replacement, 1)
    code = code.replace(target_end, replacement_end, 1)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("Fixed JSX fragment in app/categories/page.tsx")
else:
    print("Target not found. Looking with CRLF...")
    code = code.replace(target.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'), 1)
    code = code.replace(target_end.replace('\n', '\r\n'), replacement_end.replace('\n', '\r\n'), 1)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("Fixed with CRLF")

