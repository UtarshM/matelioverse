import urllib.request
import ssl
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

ctx = ssl._create_unverified_context()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# 1. Get buildId
print("1. Getting buildId...")
req = urllib.request.Request('https://madoverbuildings.com', headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
    html = r.read().decode('utf-8', errors='ignore')
build_id = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
build_id = json.loads(build_id.group(1)).get('buildId')
print(f"Build ID: {build_id}")

# 2. Get sitemap URLs
print("2. Fetching sitemap product URLs...")
sitemap_req = urllib.request.Request('https://madoverbuildings.com/sitemaps/products.xml', headers=headers)
with urllib.request.urlopen(sitemap_req, context=ctx, timeout=20) as r:
    xml = r.read().decode('utf-8', errors='ignore')
all_urls = re.findall(r'<loc>https://madoverbuildings\.com/product/([^<]+)</loc>', xml)
print(f"Total slugs in sitemap: {len(all_urls)}")

# 3. Test speed for 50 items
test_slugs = all_urls[:50]

def fetch_product(slug):
    url = f"https://madoverbuildings.com/_next/data/{build_id}/product/{slug}.json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            p = data.get('pageProps', {}).get('initialProduct', {})
            return {
                'id': p.get('product_id'),
                'sku': p.get('mob_sku'),
                'title': p.get('item_name_title'),
                'brand': p.get('brand'),
                'category': p.get('category', {}).get('name') if isinstance(p.get('category'), dict) else p.get('category'),
                'mrp': p.get('maximum_retail_price'),
                'price': p.get('selling_price'),
                'images': [img.get('image') for img in p.get('images', []) if img.get('image')],
                'specs': p.get('specifications') or {},
                'slug': slug,
                'url': f"https://madoverbuildings.com/product/{slug}"
            }
    except Exception as e:
        return {'slug': slug, 'error': str(e)}

start_time = time.time()
results = []
with ThreadPoolExecutor(max_workers=20) as executor:
    futures = {executor.submit(fetch_product, s): s for s in test_slugs}
    for f in as_completed(futures):
        res = f.result()
        if 'error' not in res:
            results.append(res)

duration = time.time() - start_time
print(f"Successfully fetched {len(results)}/50 products in {duration:.2f} seconds!")
print(f"Rate: {len(results)/duration:.1f} products/sec")
if results:
    print("Sample record:", json.dumps(results[0], indent=2)[:300])

