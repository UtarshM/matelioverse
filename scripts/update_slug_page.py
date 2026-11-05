file_path = r"app/products/[slug]/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = "export function generateStaticParams() {\n  return PRODUCTS.map((p) => ({\n    slug: p.slug,\n  }));\n}"
if target not in content:
    target = "export function generateStaticParams() {\r\n  return PRODUCTS.map((p) => ({\r\n    slug: p.slug,\r\n  }));\r\n}"

replacement = """export const dynamicParams = true;

export function generateStaticParams() {
  // Pre-render the top 50 featured products at build time; all others render on demand
  return PRODUCTS.slice(0, 50).map((p) => ({
    slug: p.slug,
  }));
}"""

if target in content:
    content = content.replace(target, replacement, 1)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated dynamicParams and generateStaticParams in ProductDetailPage")
else:
    print("Could not find target in ProductDetailPage")

