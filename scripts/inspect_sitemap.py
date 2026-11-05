import urllib.request
import ssl
import re

ctx = ssl._create_unverified_context()
req = urllib.request.Request('https://madoverbuildings.com/sitemaps/products.xml', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as r:
    xml = r.read().decode('utf-8', errors='ignore')

urls = re.findall(r'<loc>(https://madoverbuildings\.com/product/[^<]+)</loc>', xml)
print(f"Total product URLs: {len(urls)}")
print("Sample 10 URLs:")
for u in urls[:10]:
    print(" -", u)
print("Sample 10 URLs from middle:")
for u in urls[5000:5010]:
    print(" -", u)

