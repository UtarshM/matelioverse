import os

file_path = "data/products.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace header:
old_header = "import { Product } from '@/types';\n\nexport const PRODUCTS: Product[] = ["
if old_header not in content:
    old_header = "import { Product } from '@/types';\r\n\r\nexport const PRODUCTS: Product[] = ["

new_header = """import { Product } from '@/types';
import scrapedMaterialsRaw from './scraped_products.json';

export const CURATED_PRODUCTS: Product[] = ["""

content = content.replace(old_header, new_header, 1)

# Replace closing:
old_footer = "\n];"
r_idx = content.rfind(old_footer)
if r_idx == -1:
    old_footer = "\r\n];"
    r_idx = content.rfind(old_footer)

new_footer = """
];

export const SCRAPED_PRODUCTS: Product[] = scrapedMaterialsRaw as unknown as Product[];

export const PRODUCTS: Product[] = [
  ...CURATED_PRODUCTS,
  ...SCRAPED_PRODUCTS,
];
"""

if r_idx != -1:
    content = content[:r_idx] + new_footer
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("data/products.ts updated successfully!")
else:
    print("Could not find footer in data/products.ts")

