with open('d:/precision-build-website/src/data/blogContent.ts', 'r', encoding='utf-8') as f:
    c = f.read()

target_ids = [
    "torispherical-vs-elliptical-dish-end-polishing",
    "how-to-achieve-mirror-finish-on-stainless-steel-tanks",
    "what-is-a-centerless-pipe-polishing-machine",
    "centerless-vs-conventional-pipe-polishing-machines",
]

for bid in target_ids:
    idx = c.find(f'id: "{bid}"')
    if idx != -1:
        snippet = c[idx:idx+800]
        print(f"=== {bid} ===")
        print(snippet[:500])
        print("...\n")
    else:
        print(f"MISSING: {bid}")

