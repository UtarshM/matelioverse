import json

with open('data/scraped_products.json', encoding='utf-8') as f:
    prods = json.load(f)

cats = {}
for p in prods:
    c = p['category']
    s = p['categorySlug']
    if s not in cats:
        cats[s] = {'name': c, 'slug': s, 'count': 0}
    cats[s]['count'] += 1

for k, v in sorted(cats.items()):
    print(f"{v['slug']} -> {v['name']} ({v['count']} items)")

