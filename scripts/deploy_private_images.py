import os
import PIL.Image

brain_dir = r"C:\Users\Atif\.gemini\antigravity\brain\cac8ffad-33a8-4e81-bc51-b76519b74aa3"
dest_dir = r"D:\matelioverse\public\images\products"

mapping = {
    'tuffar-tmt-12mm.webp': 'tuffar_tmt_12mm_1793775255220.jpg',
    'tiletrendz-calacatta-gold.webp': 'tiletrendz_calacatta_gold_1793775272734.jpg',
    'ezywall-aac-panel-100.webp': 'ezywall_aac_panel_100_1793775279959.jpg',
    'bondex-gold-adhesive.webp': 'bondex_gold_adhesive_1793775287533.jpg',
    'sanivo-rimless-ewc.webp': 'sanivo_rimless_ewc_v2_1793775311701.jpg',
    'hydroline-cpvc-pipe-1inch.webp': 'hydroline_cpvc_pipe_1inch_1793775295443.jpg',
    'cemxtra-opc-53.webp': 'cemxtra_opc_53_1793775333366.jpg',
    'strongfab-i-beam-150.webp': 'strongfab_i_beam_150_1793775304729.jpg',
    'reflectoglass-architectural-panel.webp': 'reflectoglass_architectural_panel_1793775310087.jpg',
}

os.makedirs(dest_dir, exist_ok=True)

print("Converting and copying AI-generated product images...")
for target_name, src_name in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    target_path = os.path.join(dest_dir, target_name)
    
    if not os.path.exists(src_path):
        print(f"ERROR: {src_path} does not exist!")
        continue
        
    img = PIL.Image.open(src_path)
    # Resize / optimize to 1000x1000 WebP
    img.save(target_path, format="WEBP", quality=90, method=6)
    size_kb = os.path.getsize(target_path) / 1024
    print(f"Created {target_name}: {img.size} -> {size_kb:.1f} KB")

print("\nAll 9 private-label product images deployed to public/images/products/!")

