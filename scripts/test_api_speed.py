import urllib.request
import ssl
import json
import re

ctx = ssl._create_unverified_context()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://madoverbuildings.com', headers=headers)
with urllib.request.urlopen(req, context=ctx) as r:
    html = r.read().decode('utf-8', errors='ignore')

match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if match:
    d = json.loads(match.group(1))
    build_id = d.get('buildId')
    print("Build ID:", build_id)
    
    # Test next data json endpoint
    test_url = f"https://madoverbuildings.com/_next/data/{build_id}/bathroom.json?page=2"
    print("Testing Next data endpoint:", test_url)
    req2 = urllib.request.Request(test_url, headers=headers)
    try:
        with urllib.request.urlopen(req2, context=ctx) as r2:
            data = json.loads(r2.read().decode('utf-8'))
            print("Next.js JSON API SUCCESS!")
            page_props = data.get('pageProps', {})
            prods = page_props.get('initialProducts', [])
            print(f"Page 2 products returned: {len(prods)}")
            if prods:
                print("First item:", prods[0].get('item_name_title'), "| SKU:", prods[0].get('mob_sku'))
    except Exception as e:
        print("Next data API error:", e)

