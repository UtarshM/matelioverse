import urllib.request
import ssl
import json
import re

ctx = ssl._create_unverified_context()
req = urllib.request.Request('https://madoverbuildings.com/bathroom', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, context=ctx) as r:
    html = r.read().decode('utf-8', errors='ignore')

match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if match:
    d = json.loads(match.group(1))
    props = d.get('props', {}).get('pageProps', {})
    print("Bathroom total products:", props.get('initialTotalProducts'))
    print("Bathroom pagination:", props.get('initialPagination'))
    print("initialProducts len:", len(props.get('initialProducts', [])))

