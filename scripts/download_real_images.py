import urllib.request
import os
import sys
import ssl

ctx = ssl._create_unverified_context()

IMAGE_SOURCES = {
    # 1. TMT Bars & Steel (Direct MOB Building Materials)
    'jsw-neosteel-fe550d-12mm': 'https://cdn.madoverbuildings.com/category/category/Building_Materials.webp',
    'sail-tmt-fe500d-16mm': 'https://cdn.madoverbuildings.com/category/category/Building_Materials.webp',
    'tuffar-tmt-12mm': 'https://cdn.madoverbuildings.com/category/category/Building_Materials.webp',
    'strongfab-i-beam-150': 'https://cdn.madoverbuildings.com/category/category/Building_Materials.webp',

    # 2. AAC Blocks & Wall Panels (HomeRun & MOB)
    'jk-smartblox-600x200x150': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_JSW_Block_Grip_frot.webp?v=1779699430',
    'nxt-bloc-lightweight-aac': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_JSW_Enduro_Plast_Ready_Mix_Plaster_front.webp?v=1779704930',
    'zmartbuild-wall-panel-nxt-bloc': 'https://cdn.madoverbuildings.com/products/images/Century/565QWI144.webp',
    'ezywall-aac-panel-100': 'https://cdn.madoverbuildings.com/products/images/565QWI170.webp',

    # 3. Cement (HomeRun High-Res Front Pack Shots)
    'ultratech-super-cement-ppc': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Front_shot_Main_Image_6424b44c-46a2-41fb-b061-2fd56c7731c6.webp?v=1775542970',
    'wonder-cement-opc-53': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Front_shot_Main_Image_69ddc2fb-8959-47fc-8d44-c4c9542180e7.webp?v=1775544045',
    'cemxtra-opc-53': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Front_shot_Main_Image_db6e4915-2e01-4f01-9712-a98e2c74529e.webp?v=1775541758',

    # 4. Waterproofing & Adhesives (HomeRun & MOB Clean Shots)
    'dr-fixit-101-lw-waterproofing': 'https://cdn.madoverbuildings.com/products/images/Dr.Fixit/586QWI101.webp',
    'roff-t01-nca-tile-adhesive': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Front_shot_Main_Images_e04ff06f-e6a8-435c-af91-e637997ea7cb.webp?v=1775547723',
    'sika-latex-power-waterproofing': 'https://cdn.madoverbuildings.com/products/images/Dr.Fixit/586QWI106.webp',
    'bondex-gold-adhesive': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Front_shot_Main_Images_3450099b-7c50-4409-bf9f-8be2f2cc0db7_500x.webp',

    # 5. Pipes & Plumbing (HomeRun & MOB)
    'astral-cpvc-pro-pipe-1inch': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Ashirvad_CPVC_Flowguard_Plus_Pipe_SDR-11_5m_Length_1d43fa9c-3624-4929-8973-9b2cc8b755a0.webp',
    'ashirvad-flowguard-cpvc-pipe-34inch': 'https://cdn.madoverbuildings.com/products/images/Ashirvad/561QWI328.webp',
    'supreme-lifeline-cpvc-pipe': 'https://cdn.madoverbuildings.com/products/images/Supreme/561QWI170.webp',
    'hydroline-cpvc-pipe-1inch': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/collections/cpvc_pipes_and_overhead_tanks.png?v=1784101111',
    'giacomini-hydronic-underfloor-pex-cooling-pipe': 'https://cdn.madoverbuildings.com/category/category/Plumbing.webp',

    # 6. Bath & Sanitary Ware (MOB & HomeRun Clean Product Shots)
    'hindware-elegance-aura-wall-hung-toilet': 'https://cdn.madoverbuildings.com/products/images/Hindware/563QWI122.webp',
    'jaquar-queen-single-lever-diverter': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Jaquar_Concealed_Body_for_Single_Lever.webp?v=1783666927',
    'duravit-me-by-starck-washbasin': 'https://cdn.madoverbuildings.com/products/images/Hindware/580QWI233.webp',
    'sanivo-rimless-ewc': 'https://cdn.madoverbuildings.com/products/images/Jaquar/563QWI224.webp',
    'geberit-sigma-concealed-cistern': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Jaquar_Single_Piece_Slim_Concealed_Cistern_S-Type.webp?v=1783672446',
    'tece-base-concealed-cistern-module': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Jaquar_Kubix_Concealed_Cistern_Control_Flush_Plate.webp?v=1783673752',
    'acquaviva-whirlpool-hydro-massage-bathtub': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Opal_Prime_SPJ-CHR-15429PM.webp?v=1786964878',

    # 7. Sinks & Drainage (HomeRun & MOB)
    'franke-maris-ss304-undermount-sink': 'https://cdn.madoverbuildings.com/products/images/Carysil/585QWI101.webp',
    'hindware-quadra-satin-ss-sink': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/6_f7f356a4-ace2-4a11-b4a2-8b4988ac51a0.webp?v=1787142080',
    'lidco-ss304-linear-floor-drain-channel': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/40905-A-Drain-Flat-Round-with-hole..-800x800.jpg?v=1758375389',

    # 8. Tiles & Surfaces (MOB Real Pengvin / Morbi Tiles)
    'qutone-marmo-royal-vitrified-tile': 'https://cdn.madoverbuildings.com/products/images/569QWI114.webp',
    'varmora-carving-matt-vitrified-tile': 'https://cdn.madoverbuildings.com/products/images/569QWI118.webp',
    'tiletrendz-calacatta-gold': 'https://cdn.madoverbuildings.com/products/images/569QWI261.webp',

    # 9. Paints, Primer & Putty (MOB & HomeRun)
    'birla-opus-style-perfect-start-primer': 'https://cdn.madoverbuildings.com/products/images/BirlaOpus/567QWI157-1.webp',
    'birla-opus-calista-luxury-emulsion': 'https://cdn.madoverbuildings.com/products/images/BirlaOpus/567QWI154-1.webp',
    'birla-white-wallcare-putty-40kg': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Birla_white_wallcare_white_cementbased_putty_front.webp?v=1779439084',
    'jk-lakshmiplast-gypsum-putty': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/1_Saint-Gobain_Gyproc_Xpert_Gypsum.webp?v=1779801016',

    # 10. Hardware, Tools & Safety (HomeRun & MOB)
    'safesite-helmet-ratchet': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/HALF_BODY_SAFETY_BELT.webp?v=1784120296',
    'gripfit-anchor-bolt-m12': 'https://cdn.shopify.com/s/files/1/0872/6095/4939/files/Zipco_Wooden_Gypsum_Screws_3.5mm_Box.jpg?v=1770112225'
}

os.makedirs('public/images/products', exist_ok=True)

success_count = 0
for pid, url in IMAGE_SOURCES.items():
    dest_path = f"public/images/products/{pid}.webp"
    print(f"Downloading {pid} from {url[:55]}... ", end="", flush=True)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            data = response.read()
            with open(dest_path, "wb") as f:
                f.write(data)
        size_kb = len(data) / 1024
        print(f"OK ({size_kb:.1f} KB)")
        success_count += 1
    except Exception as e:
        print(f"FAILED: {e}")

print(f"\nDownloaded {success_count}/{len(IMAGE_SOURCES)} real product images successfully.")
