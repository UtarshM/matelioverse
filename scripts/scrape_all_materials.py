import urllib.request
import ssl
import json
import re
import os
import sys
import time
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ctx = ssl._create_unverified_context()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)
JSONL_FILE = os.path.join(DATA_DIR, "mob_materials_full.jsonl")
FINAL_JSON = os.path.join(DATA_DIR, "mob_materials_full.json")
FINAL_CSV = "MadOverBuildings_All_16452_Materials_Catalog.csv"
FINAL_XLSX = "MadOverBuildings_All_16452_Materials_Catalog.xlsx"

# 1. Fetch current buildId
print("1. Fetching buildId from madoverbuildings.com...")
req = urllib.request.Request('https://madoverbuildings.com', headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
    html = r.read().decode('utf-8', errors='ignore')
match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if not match:
    print("Failed to find __NEXT_DATA__")
    sys.exit(1)
build_id = json.loads(match.group(1)).get('buildId')
print(f"Build ID: {build_id}")

# 2. Fetch all product slugs from sitemap
print("2. Fetching all product slugs from sitemap...")
sitemap_req = urllib.request.Request('https://madoverbuildings.com/sitemaps/products.xml', headers=headers)
with urllib.request.urlopen(sitemap_req, context=ctx, timeout=25) as r:
    xml = r.read().decode('utf-8', errors='ignore')
all_slugs = re.findall(r'<loc>https://madoverbuildings\.com/product/([^<]+)</loc>', xml)
total_slugs = len(all_slugs)
print(f"Found {total_slugs} total material slugs in sitemap.")

# 3. Check existing scraped slugs for resume capability
scraped_slugs = set()
if os.path.exists(JSONL_FILE):
    with open(JSONL_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                item = json.loads(line)
                if 'slug' in item:
                    scraped_slugs.add(item['slug'])
            except:
                pass
    print(f"Resuming: {len(scraped_slugs)} materials already scraped in {JSONL_FILE}.")

remaining_slugs = [s for s in all_slugs if s not in scraped_slugs]
print(f"Remaining materials to fetch: {len(remaining_slugs)}")

def fetch_single_product(slug, retries=2):
    url = f"https://madoverbuildings.com/_next/data/{build_id}/product/{slug}.json"
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                p = data.get('pageProps', {}).get('initialProduct', {})
                if not p:
                    return None
                
                cat = p.get('category')
                cat_name = cat.get('name') if isinstance(cat, dict) else str(cat or '')
                subcat_name = p.get('sub_category_name') or p.get('sub_category') or ''
                
                # Prices
                mrp = p.get('maximum_retail_price')
                price = p.get('selling_price')
                vendors = p.get('vendors', [])
                if vendors and (not mrp or not price):
                    mrp = mrp or vendors[0].get('mrp')
                    price = price or vendors[0].get('price')
                
                imgs = [img.get('image') for img in p.get('images', []) if img.get('image')]
                primary_img = imgs[0] if imgs else ''
                all_imgs_str = "; ".join(imgs)
                
                specs = p.get('specifications') or {}
                
                return {
                    'product_id': p.get('product_id'),
                    'mob_sku': p.get('mob_sku') or '',
                    'item_name_title': p.get('item_name_title') or p.get('name') or '',
                    'brand': p.get('brand') or '',
                    'category': cat_name,
                    'subcategory': str(subcat_name),
                    'mrp': mrp,
                    'selling_price': price,
                    'primary_image': primary_img,
                    'image_count': len(imgs),
                    'all_images': all_imgs_str,
                    'specs': specs,
                    'specs_summary': " | ".join([f"{k}: {v}" for k, v in specs.items()][:6]),
                    'slug': slug,
                    'product_url': f"https://madoverbuildings.com/product/{slug}"
                }
        except Exception as e:
            if attempt == retries:
                return {'slug': slug, 'error': str(e)}
            time.sleep(0.5)
    return None

# 4. Stream & scrape concurrently with ThreadPoolExecutor
BATCH_SIZE = 100
total_done = len(scraped_slugs)
start_time = time.time()

print(f"\n3. Starting concurrent extraction with 28 worker threads...")
with open(JSONL_FILE, 'a', encoding='utf-8') as jsonl_out:
    with ThreadPoolExecutor(max_workers=28) as executor:
        for i in range(0, len(remaining_slugs), BATCH_SIZE):
            batch_slugs = remaining_slugs[i:i + BATCH_SIZE]
            futures = [executor.submit(fetch_single_product, s) for s in batch_slugs]
            
            for f in as_completed(futures):
                res = f.result()
                if res and 'error' not in res:
                    jsonl_out.write(json.dumps(res, ensure_ascii=False) + '\n')
                    total_done += 1
            
            jsonl_out.flush()
            elapsed = time.time() - start_time
            rate = (total_done - len(scraped_slugs)) / elapsed if elapsed > 0 else 0
            pct = (total_done / total_slugs) * 100
            rem_sec = (total_slugs - total_done) / rate if rate > 0 else 0
            print(f"[{total_done}/{total_slugs} ({pct:.1f}%)] Rate: {rate:.1f} items/sec | Elapsed: {elapsed/60:.1f}m | ETA: {rem_sec/60:.1f}m", flush=True)

print(f"\nAll scraping complete! Total materials collected: {total_done}")

# 5. Export to Master JSON
print("4. Consolidating into data/mob_materials_full.json...")
all_materials = []
with open(JSONL_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            all_materials.append(json.loads(line))
        except:
            pass

with open(FINAL_JSON, 'w', encoding='utf-8') as f:
    json.dump(all_materials, f, indent=2, ensure_ascii=False)
print(f"Saved {len(all_materials)} materials to {FINAL_JSON}")

# 6. Export to CSV
print(f"5. Exporting to {FINAL_CSV}...")
csv_fields = [
    'product_id', 'mob_sku', 'item_name_title', 'brand', 'category', 'subcategory',
    'mrp', 'selling_price', 'primary_image', 'image_count', 'all_images', 'specs_summary', 'product_url'
]

with open(FINAL_CSV, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_fields, extrasaction='ignore')
    writer.writeheader()
    for m in all_materials:
        writer.writerow(m)
print(f"Saved CSV with {len(all_materials)} rows!")

# 7. Export to Excel Workbook
print(f"6. Generating structured Excel file: {FINAL_XLSX}...")
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "MadOverBuildings Materials"
ws.views.sheetView[0].showGridLines = True

excel_headers = [
    ("Product ID", 14),
    ("MOB SKU", 16),
    ("Material Title", 45),
    ("Brand", 22),
    ("Category", 26),
    ("Subcategory", 26),
    ("MRP (INR)", 14),
    ("Selling Price", 14),
    ("Primary Image URL", 45),
    ("Image Count", 12),
    ("Key Specifications", 50),
    ("Product Page URL", 45)
]

header_fill = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
header_font = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
cell_font = Font(name="Segoe UI", size=10)
center_align = Alignment(horizontal="center", vertical="center")
left_align = Alignment(horizontal="left", vertical="center", wrap_text=True)

for col_idx, (name, width) in enumerate(excel_headers, 1):
    c = ws.cell(row=1, column=col_idx, value=name)
    c.fill = header_fill
    c.font = header_font
    c.alignment = center_align
    ws.column_dimensions[get_column_letter(col_idx)].width = width

ws.row_dimensions[1].height = 28

for row_idx, m in enumerate(all_materials, 2):
    ws.row_dimensions[row_idx].height = 20
    ws.cell(row=row_idx, column=1, value=m.get('product_id')).alignment = center_align
    ws.cell(row=row_idx, column=2, value=m.get('mob_sku')).alignment = center_align
    ws.cell(row=row_idx, column=3, value=m.get('item_name_title')).alignment = left_align
    ws.cell(row=row_idx, column=4, value=m.get('brand')).alignment = left_align
    ws.cell(row=row_idx, column=5, value=m.get('category')).alignment = left_align
    ws.cell(row=row_idx, column=6, value=m.get('subcategory')).alignment = left_align
    ws.cell(row=row_idx, column=7, value=m.get('mrp')).alignment = center_align
    ws.cell(row=row_idx, column=8, value=m.get('selling_price')).alignment = center_align
    ws.cell(row=row_idx, column=9, value=m.get('primary_image')).alignment = left_align
    ws.cell(row=row_idx, column=10, value=m.get('image_count')).alignment = center_align
    ws.cell(row=row_idx, column=11, value=m.get('specs_summary')).alignment = left_align
    ws.cell(row=row_idx, column=12, value=m.get('product_url')).alignment = left_align

wb.save(FINAL_XLSX)
print(f"\nAll complete! Master files created successfully:\n- {FINAL_JSON}\n- {FINAL_CSV}\n- {FINAL_XLSX}")

