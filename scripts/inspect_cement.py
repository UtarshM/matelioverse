import urllib.request
import ssl
import json
import re

ctx = ssl._create_unverified_context()
req = urllib.request.Request('https://madoverbuildings.com/building-materials/cement', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, context=ctx) as r:
    html = r.read().decode('utf-8', errors='ignore')

match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if match:
    d = json.loads(match.group(1))
    props = d.get('props', {}).get('pageProps', {})
    print("pageProps keys:", list(props.keys()))
    print("initialPagination:", props.get('initialPagination'))
    prods = props.get('initialProducts', [])
    print("initialProducts len:", len(prods))
    if prods:
        print("First product keys:", list(prods[0].keys()))
        print("First product:", json.dumps(prods[0], indent=2)[:500])
