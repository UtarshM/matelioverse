import json
import os
import io
import ssl
import urllib.request
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.drawing.image import Image as XLImage
import PIL.Image

ctx = ssl._create_unverified_context()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

cache_dir = "scripts/img_cache"
os.makedirs(cache_dir, exist_ok=True)

def download_and_format_img(url, filename):
    if not url:
        return None
    local_path = os.path.join(cache_dir, filename)
    if not os.path.exists(local_path):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=12) as r:
                raw_data = r.read()
            pil_img = PIL.Image.open(io.BytesIO(raw_data))
            pil_img.thumbnail((55, 55))
            # Convert to RGBA/RGB PNG
            if pil_img.mode in ('RGBA', 'LA'):
                background = PIL.Image.new('RGB', pil_img.size, (255, 255, 255))
                background.paste(pil_img, mask=pil_img.split()[3])
                pil_img = background
            else:
                pil_img = pil_img.convert('RGB')
            pil_img.save(local_path, format='PNG')
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            return None
    return local_path

with open('data/mob_categories_full.json', 'r', encoding='utf-8') as f:
    categories = json.load(f)

wb = openpyxl.Workbook()

# Styling defs
header_fill_navy = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
header_fill_amber = PatternFill(start_color="D97706", end_color="D97706", fill_type="solid")
header_font = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
cell_font = Font(name="Segoe UI", size=10)
bold_cell_font = Font(name="Segoe UI", size=10, bold=True)
center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)
left_align = Alignment(horizontal="left", vertical="center", wrap_text=True)
border_thin = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)
stripe_fill = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")

# -------------------------------------------------------------
# Sheet 1: Master View (Category + Subcategory Hierarchy)
# -------------------------------------------------------------
ws1 = wb.active
ws1.title = "Category & Subcategory Catalog"
ws1.views.sheetView[0].showGridLines = True

headers_ws1 = [
    ("Category ID", 14),
    ("Category Name", 26),
    ("Category Image", 16),
    ("Category URL", 32),
    ("Subcategory ID", 16),
    ("Subcategory Name", 30),
    ("Subcategory Image", 18),
    ("Subcategory URL", 40),
    ("Products Count", 15),
    ("Associated Brands", 32),
    ("Sample Products", 42)
]

for col_idx, (h_name, width) in enumerate(headers_ws1, 1):
    cell = ws1.cell(row=1, column=col_idx, value=h_name)
    cell.fill = header_fill_navy
    cell.font = header_font
    cell.alignment = center_align
    ws1.column_dimensions[get_column_letter(col_idx)].width = width

ws1.row_dimensions[1].height = 28

current_row = 2
img_counter = 0

print("Generating Sheet 1: All categories & subcategories...")
for cat_idx, cat in enumerate(categories):
    cat_id = cat.get('id')
    cat_name = cat.get('name')
    cat_img_url = cat.get('image')
    cat_url = cat.get('url')
    subcats = cat.get('subcategories', [])
    
    # Download main category image
    cat_local_img = download_and_format_img(cat_img_url, f"cat_{cat_id}_{cat.get('slug')}.png")
    
    for sub_idx, sub in enumerate(subcats):
        ws1.row_dimensions[current_row].height = 48
        is_stripe = (cat_idx % 2 == 1)
        
        c1 = ws1.cell(row=current_row, column=1, value=cat_id)
        c2 = ws1.cell(row=current_row, column=2, value=cat_name)
        c3 = ws1.cell(row=current_row, column=3, value="") # Image placeholder
        c4 = ws1.cell(row=current_row, column=4, value=cat_url)
        c5 = ws1.cell(row=current_row, column=5, value=sub.get('id'))
        c6 = ws1.cell(row=current_row, column=6, value=sub.get('name'))
        c7 = ws1.cell(row=current_row, column=7, value="") # Sub image placeholder
        c8 = ws1.cell(row=current_row, column=8, value=sub.get('url'))
        c9 = ws1.cell(row=current_row, column=9, value=sub.get('total_products', 0))
        
        brands_str = ", ".join(sub.get('brands', [])) if sub.get('brands') else "Catalog Brands"
        sample_prods_str = " | ".join(sub.get('sample_products', [])) if sub.get('sample_products') else ""
        c10 = ws1.cell(row=current_row, column=10, value=brands_str)
        c11 = ws1.cell(row=current_row, column=11, value=sample_prods_str)
        
        for c in [c1, c5, c9]:
            c.alignment = center_align
            c.font = cell_font
            c.border = border_thin
            if is_stripe: c.fill = stripe_fill
            
        for c in [c2, c4, c6, c8, c10, c11]:
            c.alignment = left_align
            c.font = bold_cell_font if c in [c2, c6] else cell_font
            c.border = border_thin
            if is_stripe: c.fill = stripe_fill
            
        for c in [c3, c7]:
            c.alignment = center_align
            c.border = border_thin
            if is_stripe: c.fill = stripe_fill
            
        # Add category image only on first row of category or every row
        if sub_idx == 0 and cat_local_img and os.path.exists(cat_local_img):
            try:
                img = XLImage(cat_local_img)
                img.width = 50
                img.height = 50
                ws1.add_image(img, f"C{current_row}")
            except Exception as e:
                print(f"Failed to place cat image: {e}")
                
        # Add subcategory image
        sub_img_url = sub.get('image')
        if sub_img_url:
            sub_filename = f"sub_{sub.get('id')}_{sub.get('slug')}.png"
            sub_local_img = download_and_format_img(sub_img_url, sub_filename)
            if sub_local_img and os.path.exists(sub_local_img):
                try:
                    img = XLImage(sub_local_img)
                    img.width = 50
                    img.height = 50
                    ws1.add_image(img, f"G{current_row}")
                except Exception as e:
                    print(f"Failed to place subcat image: {e}")
                    
        current_row += 1

# -------------------------------------------------------------
# Sheet 2: Main Categories Summary
# -------------------------------------------------------------
ws2 = wb.create_sheet(title="Main Categories Summary")
ws2.views.sheetView[0].showGridLines = True

headers_ws2 = [
    ("Category ID", 14),
    ("Category Name", 28),
    ("Category Image", 18),
    ("Subcategory Count", 18),
    ("Total Products", 16),
    ("Category URL", 40),
    ("Image CDN Link", 55)
]

for col_idx, (h_name, width) in enumerate(headers_ws2, 1):
    cell = ws2.cell(row=1, column=col_idx, value=h_name)
    cell.fill = header_fill_amber
    cell.font = header_font
    cell.alignment = center_align
    ws2.column_dimensions[get_column_letter(col_idx)].width = width

ws2.row_dimensions[1].height = 28

print("Generating Sheet 2: Main Categories Summary...")
for idx, cat in enumerate(categories, 2):
    ws2.row_dimensions[idx].height = 48
    cat_id = cat.get('id')
    cat_name = cat.get('name')
    cat_img_url = cat.get('image')
    cat_url = cat.get('url')
    subcat_count = len(cat.get('subcategories', []))
    total_prods = cat.get('total_products', 0)
    
    c1 = ws2.cell(row=idx, column=1, value=cat_id)
    c2 = ws2.cell(row=idx, column=2, value=cat_name)
    c3 = ws2.cell(row=idx, column=3, value="")
    c4 = ws2.cell(row=idx, column=4, value=subcat_count)
    c5 = ws2.cell(row=idx, column=5, value=total_prods)
    c6 = ws2.cell(row=idx, column=6, value=cat_url)
    c7 = ws2.cell(row=idx, column=7, value=cat_img_url)
    
    is_stripe = (idx % 2 == 1)
    for c in [c1, c4, c5]:
        c.alignment = center_align
        c.font = cell_font
        c.border = border_thin
        if is_stripe: c.fill = stripe_fill
        
    for c in [c2, c6, c7]:
        c.alignment = left_align
        c.font = bold_cell_font if c == c2 else cell_font
        c.border = border_thin
        if is_stripe: c.fill = stripe_fill
        
    c3.alignment = center_align
    c3.border = border_thin
    if is_stripe: c3.fill = stripe_fill
    
    cat_local_img = os.path.join(cache_dir, f"cat_{cat_id}_{cat.get('slug')}.png")
    if os.path.exists(cat_local_img):
        try:
            img = XLImage(cat_local_img)
            img.width = 50
            img.height = 50
            ws2.add_image(img, f"C{idx}")
        except Exception as e:
            print(f"Error placing img on sheet 2: {e}")

output_file = "MadOverBuildings_Categories_Catalog.xlsx"
wb.save(output_file)
print(f"\nExcel file saved successfully to {output_file}!")

