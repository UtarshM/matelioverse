import urllib.request
import re
import json
import ssl
import os
import sys

ctx = ssl._create_unverified_context()

def get_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}", file=sys.stderr)
        return ""

print("1. Fetching HomeRun sitemap...")
hr_sitemap = get_url("https://home-run.co/sitemap.xml")
hr_product_urls = re.findall(r"<loc>(https://home-run\.co/products/[^<]+)</loc>", hr_sitemap)
print(f"Found {len(hr_product_urls)} HomeRun product URLs.")

print("2. Fetching MOB sitemap...")
mob_sitemap = get_url("https://madoverbuildings.com/sitemaps/products.xml")
mob_product_urls = re.findall(r"<loc>(https://madoverbuildings\.com/product/[^<]+)</loc>", mob_sitemap)
print(f"Found {len(mob_product_urls)} MOB product URLs.")

# Save both to a lookup dict
with open("scripts/homerun_urls.json", "w") as f:
    json.dump(hr_product_urls, f, indent=2)

with open("scripts/mob_urls.json", "w") as f:
    json.dump(mob_product_urls, f, indent=2)

print("Saved URL lists successfully.")
