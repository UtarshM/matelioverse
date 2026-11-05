import urllib.request
import ssl
import json
import re
import time
import os

ctx = ssl._create_unverified_context()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_json_props(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as r:
            html = r.read().decode('utf-8', errors='ignore')
            match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
            if match:
                data = json.loads(match.group(1))
                return data.get('props', {}).get('pageProps', {})
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return {}

print("Step 1: Fetching homepage categories...")
home_props = fetch_json_props("https://madoverbuildings.com")
categories = home_props.get('initialCategories', [])
print(f"Found {len(categories)} main categories.")

full_data = []

for idx, cat in enumerate(categories):
    cat_id = cat.get('id')
    cat_name = cat.get('name')
    cat_slug = cat.get('slug')
    cat_img = cat.get('image')
    cat_url = f"https://madoverbuildings.com/{cat_slug}"
    print(f"\n[{idx+1}/{len(categories)}] Fetching {cat_name} ({cat_url})...")
    
    cat_props = fetch_json_props(cat_url)
    cat_total_products = cat_props.get('initialTotalProducts', 0)
    sub_cats = cat_props.get('initialSubCategories', [])
    
    # If initialSubCategories is empty, check cat.get('sub_category')
    if not sub_cats:
        sub_cats = cat.get('sub_category', [])
        
    print(f"  Total products: {cat_total_products}, Subcategories: {len(sub_cats)}")
    
    cat_info = {
        'id': cat_id,
        'name': cat_name,
        'slug': cat_slug,
        'image': cat_img,
        'url': cat_url,
        'total_products': cat_total_products,
        'subcategories': []
    }
    
    for s_idx, sub in enumerate(sub_cats):
        sub_name = sub.get('sub_category_name') or sub.get('name')
        sub_slug = sub.get('slug')
        sub_img = sub.get('image')
        sub_id = sub.get('id')
        sub_url = f"https://madoverbuildings.com/{cat_slug}/{sub_slug}" if sub_slug else ""
        
        # Fetch subcategory details to get products count & sample products/brands
        print(f"    -> Subcat: {sub_name} ({sub_slug})")
        sub_props = fetch_json_props(sub_url) if sub_url else {}
        sub_total_products = sub_props.get('initialTotalProducts', 0)
        
        # Extract brands and sample products
        sub_products = sub_props.get('initialProducts', [])
        brands = list(set([p.get('brand', {}).get('brand_name') for p in sub_products if p.get('brand') and p.get('brand', {}).get('brand_name')]))
        sample_prod_names = [p.get('product_name') for p in sub_products[:3] if p.get('product_name')]
        
        cat_info['subcategories'].append({
            'id': sub_id,
            'name': sub_name,
            'slug': sub_slug,
            'image': sub_img,
            'url': sub_url,
            'total_products': sub_total_products,
            'brands': brands,
            'sample_products': sample_prod_names
        })
        time.sleep(0.3)
        
    full_data.append(cat_info)
    time.sleep(0.5)

os.makedirs('data', exist_ok=True)
with open('data/mob_categories_full.json', 'w', encoding='utf-8') as f:
    json.dump(full_data, f, indent=2, ensure_ascii=False)

print("\nFinished! Saved data to data/mob_categories_full.json")

