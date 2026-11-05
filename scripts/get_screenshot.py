import urllib.request
import ssl
import re

ctx = ssl._create_unverified_context()
req = urllib.request.Request('https://prnt.sc/piAB1yZWAI90', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
    match = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if match:
        print("Screenshot image:", match.group(1))
    else:
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
        print("Images:", imgs)
except Exception as e:
    print("Error:", e)

