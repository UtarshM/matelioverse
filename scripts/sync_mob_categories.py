import json

with open('data/mob_categories_full.json', 'r', encoding='utf-8') as f:
    mob_cats = json.load(f)

with open('data/categories.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Read existing slugs
import re
existing_slugs = set(re.findall(r"slug:\s*'([^']+)'", content))
print("Existing category slugs:", existing_slugs)

new_entries = []
for c in mob_cats:
    slug = c.get('slug')
    if slug not in existing_slugs:
        name = c.get('name')
        img = c.get('image') or '/images/categories/building-materials.svg'
        total = c.get('total_products', 0)
        
        # Collect sample brands from subcats
        sample_brands = []
        for s in c.get('subcategories', []):
            sample_brands.extend(s.get('brands', []))
        sample_brands = list(set(sample_brands))[:6]
        brands_str = json.dumps(sample_brands)
        
        entry = f"""  {{
    id: '{slug}',
    slug: '{slug}',
    name: '{name}',
    shortName: '{name}',
    brandName: 'Top Industry Brands',
    isPrivateLabel: false,
    image: '{img}',
    description: 'Genuine {name} and verified construction supplies directly from certified manufacturers.',
    tag: 'Factory Direct Sourcing',
    itemCount: {total},
    associatedBrands: {brands_str},
  }},"""
        new_entries.append(entry)

if new_entries:
    print(f"Adding {len(new_entries)} missing MOB categories to data/categories.ts...")
    target = "\n];"
    r_idx = content.rfind(target)
    if r_idx == -1:
        target = "\r\n];"
        r_idx = content.rfind(target)
    
    insert_str = "\n" + "\n".join(new_entries)
    content = content[:r_idx] + insert_str + content[r_idx:]
    with open('data/categories.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added categories successfully!")
else:
    print("All MOB categories already present in data/categories.ts")

