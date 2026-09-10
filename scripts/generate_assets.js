import fs from 'fs';
import path from 'path';

const prodDir = './public/images/products';
const catDir = './public/images/categories';

// Helper for saving SVG
function saveSvg(filePath, content) {
  fs.writeFileSync(filePath, content.trim(), 'utf8');
}

// ==========================================
// 1. GENERATE CATEGORIES SVGS
// ==========================================

const categories = [
  {
    id: 'tmt-bars',
    title: 'TMT Steel Rebars',
    badge: 'Fe550D / Fe500D',
    svg: `
      <defs>
        <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="50%" stop-color="#94A3B8" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <pattern id="rebarRibs" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#1E293B" stroke-width="4" />
        </pattern>
      </defs>
      <!-- Rebar Bundle -->
      <g transform="translate(60, 40)">
        <rect x="20" y="40" width="260" height="22" rx="11" fill="url(#steelGrad)" stroke="#1E293B" stroke-width="2"/>
        <rect x="20" y="40" width="260" height="22" rx="11" fill="url(#rebarRibs)" opacity="0.3"/>
        <rect x="10" y="70" width="280" height="26" rx="13" fill="url(#steelGrad)" stroke="#1E293B" stroke-width="2"/>
        <rect x="10" y="70" width="280" height="26" rx="13" fill="url(#rebarRibs)" opacity="0.3"/>
        <rect x="0" y="105" width="300" height="30" rx="15" fill="url(#steelGrad)" stroke="#1E293B" stroke-width="2.5"/>
        <rect x="0" y="105" width="300" height="30" rx="15" fill="url(#rebarRibs)" opacity="0.3"/>
        <!-- Steel Strapping Bands -->
        <rect x="50" y="36" width="12" height="104" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5" rx="2"/>
        <rect x="220" y="36" width="12" height="104" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5" rx="2"/>
        <!-- Metal Tag -->
        <g transform="translate(195, 120)">
          <path d="M0,0 L50,0 L60,15 L50,30 L0,30 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
          <circle cx="10" cy="15" r="3" fill="#FFF"/>
          <text x="18" y="19" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#000">TMT 550D</text>
        </g>
      </g>
    `
  },
  {
    id: 'aac-blocks',
    title: 'AAC Concrete Blocks',
    badge: 'Lightweight Masonry',
    svg: `
      <defs>
        <linearGradient id="aacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2E8F0" />
          <stop offset="100%" stop-color="#94A3B8" />
        </linearGradient>
      </defs>
      <g transform="translate(70, 45)">
        <!-- 3D Block Perspective -->
        <polygon points="40,90 190,50 250,80 100,120" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
        <polygon points="40,90 100,120 100,200 40,170" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
        <polygon points="100,120 250,80 250,160 100,200" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <!-- Texture Pores -->
        <circle cx="140" cy="140" r="2.5" fill="#64748B" opacity="0.6"/>
        <circle cx="180" cy="120" r="3" fill="#64748B" opacity="0.5"/>
        <circle cx="160" cy="165" r="2" fill="#64748B" opacity="0.7"/>
        <circle cx="210" cy="145" r="3.5" fill="#64748B" opacity="0.5"/>
        <circle cx="70" cy="140" r="2" fill="#475569" opacity="0.6"/>
        <text x="175" y="145" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#475569" transform="rotate(-15 175 145)" opacity="0.6">AAC 600x200</text>
      </g>
    `
  },
  {
    id: 'cement',
    title: 'Cement & GGBS',
    badge: 'OPC 53 / PPC',
    svg: `
      <g transform="translate(120, 35)">
        <!-- Cement Sack Body -->
        <path d="M20,30 Q80,15 140,30 L150,190 Q80,205 10,190 Z" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/>
        <path d="M15,35 L145,35 L140,185 L20,185 Z" fill="#F8FAFC"/>
        <!-- Stitched Top -->
        <line x1="15" y1="28" x2="145" y2="28" stroke="#DC2626" stroke-width="4" stroke-dasharray="6,3"/>
        <!-- Brand Band -->
        <rect x="18" y="70" width="124" height="60" fill="#DC2626"/>
        <text x="80" y="96" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">CEMENT</text>
        <text x="80" y="116" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FEF08A" text-anchor="middle">50 KG NET</text>
        <rect x="50" y="145" width="60" height="22" rx="4" fill="#E2E8F0" stroke="#64748B"/>
        <text x="80" y="160" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">OPC 53 / PPC</text>
      </g>
    `
  },
  {
    id: 'aac-wall-panel',
    title: 'AAC Wall Panels',
    badge: 'Reinforced Drywall',
    svg: `
      <g transform="translate(90, 30)">
        <!-- Vertical Panels in Perspective -->
        <polygon points="30,40 100,10 140,30 70,60" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <polygon points="30,40 70,60 70,210 30,190" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
        <polygon points="70,60 140,30 140,180 70,210" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
        <!-- Steel Mesh lines -->
        <line x1="85" y1="60" x2="85" y2="200" stroke="#3B82F6" stroke-width="2" stroke-dasharray="8,6" opacity="0.7"/>
        <line x1="110" y1="50" x2="110" y2="190" stroke="#3B82F6" stroke-width="2" stroke-dasharray="8,6" opacity="0.7"/>
        <polygon points="110,60 180,30 220,50 150,80" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <polygon points="110,60 150,80 150,230 110,210" fill="#94A3B8" stroke="#64748B" stroke-width="2"/>
        <polygon points="150,80 220,50 220,200 150,230" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
      </g>
    `
  },
  {
    id: 'adhesive-waterproofing',
    title: 'Adhesive & Waterproofing',
    badge: 'Chemicals & Sealants',
    svg: `
      <g transform="translate(70, 40)">
        <!-- Waterproofing Canister -->
        <rect x="20" y="50" width="90" height="130" rx="12" fill="#0284C7" stroke="#0369A1" stroke-width="2.5"/>
        <rect x="45" y="30" width="40" height="22" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
        <path d="M40,50 L40,38 L90,38 L90,50" fill="none" stroke="#D97706" stroke-width="4"/>
        <rect x="25" y="85" width="80" height="50" fill="#FFFFFF" rx="4"/>
        <text x="65" y="105" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0284C7" text-anchor="middle">WATERPROOF</text>
        <text x="65" y="122" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#F59E0B" text-anchor="middle">LW+ LIQUID</text>
        <!-- Tile Adhesive Bag -->
        <path d="M130,70 L220,55 L240,180 L140,195 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/>
        <polygon points="145,85 215,72 230,170 155,182" fill="#FFFFFF"/>
        <text x="190" y="115" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#DC2626" text-anchor="middle">TILE</text>
        <text x="190" y="132" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">ADHESIVE</text>
        <text x="190" y="152" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#64748B" text-anchor="middle">20 KG</text>
      </g>
    `
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Pipes',
    badge: 'CPVC / UPVC / SWR',
    svg: `
      <g transform="translate(60, 45)">
        <!-- Pipe bundle -->
        <rect x="20" y="50" width="240" height="24" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
        <line x1="20" y1="62" x2="260" y2="62" stroke="#DC2626" stroke-width="3"/>
        <rect x="30" y="85" width="240" height="28" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
        <line x1="30" y1="99" x2="270" y2="99" stroke="#DC2626" stroke-width="3"/>
        <rect x="10" y="125" width="250" height="34" rx="17" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
        <line x1="10" y1="142" x2="260" y2="142" stroke="#DC2626" stroke-width="3"/>
        <!-- Brass Elbow / Fitting -->
        <path d="M210,105 L260,105 Q285,105 285,130 L285,180" fill="none" stroke="#F59E0B" stroke-width="18" stroke-linecap="round"/>
        <path d="M210,105 L260,105 Q285,105 285,130 L285,180" fill="none" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
      </g>
    `
  },
  {
    id: 'bath-fittings-sanitary',
    title: 'Bath Fittings & Sanitary',
    badge: 'Toilets & Diverters',
    svg: `
      <g transform="translate(70, 35)">
        <!-- Wall Hung Toilet Commode -->
        <path d="M30,50 L110,50 L125,120 Q125,180 75,180 Q25,180 25,120 Z" fill="#FFFFFF" stroke="#64748B" stroke-width="3"/>
        <!-- Seat Cover -->
        <ellipse cx="75" cy="115" rx="35" ry="50" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
        <ellipse cx="75" cy="120" rx="20" ry="30" fill="#E2E8F0"/>
        <!-- Chrome Shower Diverter -->
        <circle cx="195" cy="110" r="45" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <circle cx="195" cy="110" r="40" fill="none" stroke="#94A3B8" stroke-width="4"/>
        <rect x="190" y="80" width="10" height="60" rx="5" fill="#334155"/>
        <circle cx="195" cy="110" r="10" fill="#0F172A"/>
      </g>
    `
  },
  {
    id: 'tiles',
    title: 'Tiles & Surfaces',
    badge: 'GVT / PGVT / Vitrified',
    svg: `
      <g transform="translate(70, 40)">
        <!-- Vitrified Tile Slab (600x1200 style) -->
        <polygon points="50,60 210,30 250,150 90,180" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.5"/>
        <!-- Marble Veins -->
        <path d="M80,80 Q130,90 150,60 T200,90" fill="none" stroke="#CBD5E1" stroke-width="3"/>
        <path d="M110,130 Q160,110 180,140 T230,120" fill="none" stroke="#B45309" stroke-width="2" opacity="0.7"/>
        <path d="M70,110 Q120,130 150,120" fill="none" stroke="#94A3B8" stroke-width="1.5"/>
        <!-- High Gloss Reflection Shine -->
        <polygon points="70,65 130,55 90,165 40,160" fill="#FFFFFF" opacity="0.4"/>
      </g>
    `
  },
  {
    id: 'flush-tank',
    title: 'Concealed Cisterns',
    badge: 'Dual-Flush Modules',
    svg: `
      <g transform="translate(90, 30)">
        <!-- Steel Frame (Blue Geberit style) -->
        <rect x="30" y="20" width="160" height="210" rx="6" fill="none" stroke="#1D4ED8" stroke-width="8"/>
        <!-- Concealed Tank Container -->
        <rect x="45" y="40" width="130" height="110" rx="10" fill="#F1F5F9" stroke="#64748B" stroke-width="2.5"/>
        <!-- Actuator Plate Window -->
        <rect x="80" y="60" width="60" height="40" rx="4" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
        <ellipse cx="100" cy="80" rx="10" ry="10" fill="#E2E8F0"/>
        <ellipse cx="125" cy="80" rx="8" ry="8" fill="#E2E8F0"/>
        <!-- Flush Pipe Outlet -->
        <rect x="95" y="150" width="30" height="60" fill="#1E293B" rx="4"/>
      </g>
    `
  },
  {
    id: 'kitchen-sink',
    title: 'Kitchen Sinks',
    badge: 'SS 304 Undermount',
    svg: `
      <g transform="translate(60, 40)">
        <!-- Stainless Steel Sink Basin -->
        <rect x="20" y="30" width="240" height="170" rx="16" fill="#CBD5E1" stroke="#475569" stroke-width="3"/>
        <rect x="40" y="50" width="200" height="130" rx="12" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2.5"/>
        <!-- Metallic Gloss Gradient -->
        <polygon points="40,50 140,50 80,180 40,180" fill="#FFFFFF" opacity="0.3"/>
        <!-- Drain Hole & Waste Coupling -->
        <circle cx="140" cy="115" r="22" fill="#64748B" stroke="#334155" stroke-width="2"/>
        <circle cx="140" cy="115" r="14" fill="#334155"/>
        <circle cx="140" cy="115" r="6" fill="#F8FAFC"/>
        <!-- Sound Deadening lines -->
        <line x1="60" y1="70" x2="110" y2="100" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4,4"/>
        <line x1="220" y1="70" x2="170" y2="100" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4,4"/>
      </g>
    `
  },
  {
    id: 'radiant-cooling',
    title: 'Radiant Cooling',
    badge: 'Hydronic PEX Pipes',
    svg: `
      <g transform="translate(80, 40)">
        <!-- Pipe Coils -->
        <ellipse cx="120" cy="120" rx="100" ry="60" fill="none" stroke="#DC2626" stroke-width="16"/>
        <ellipse cx="120" cy="110" rx="80" ry="48" fill="none" stroke="#EF4444" stroke-width="14"/>
        <ellipse cx="120" cy="100" rx="60" ry="36" fill="none" stroke="#F87171" stroke-width="12"/>
        <!-- Brass Manifold Coupler -->
        <rect x="180" y="70" width="30" height="60" rx="4" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      </g>
    `
  },
  {
    id: 'wellness-products',
    title: 'Wellness & Spa',
    badge: 'Luxury Bathtubs',
    svg: `
      <g transform="translate(60, 40)">
        <!-- Free-standing Oval Bathtub -->
        <ellipse cx="140" cy="110" rx="120" ry="60" fill="#FFFFFF" stroke="#64748B" stroke-width="3"/>
        <ellipse cx="140" cy="105" rx="105" ry="45" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2"/>
        <!-- Water reflection -->
        <path d="M60,110 Q140,125 220,110" fill="none" stroke="#0284C7" stroke-width="2" opacity="0.6"/>
        <!-- Chrome Overflow & Jets -->
        <circle cx="80" cy="110" r="5" fill="#94A3B8"/>
        <circle cx="200" cy="110" r="5" fill="#94A3B8"/>
      </g>
    `
  },
  {
    id: 'paints',
    title: 'Paints & Coatings',
    badge: 'Interior / Exterior',
    svg: `
      <g transform="translate(100, 35)">
        <!-- Paint Bucket -->
        <path d="M30,60 L45,180 Q100,195 155,180 L170,60 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
        <!-- Metal Rim & Handle -->
        <ellipse cx="100" cy="60" rx="70" ry="16" fill="#E2E8F0" stroke="#475569" stroke-width="3"/>
        <path d="M25,60 Q100,0 175,60" fill="none" stroke="#334155" stroke-width="4"/>
        <!-- Paint Splash Banner -->
        <path d="M35,100 L165,100 L158,150 L42,150 Z" fill="#3B82F6"/>
        <text x="100" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">LUXURY PAINT</text>
        <!-- Dripping Paint Drop -->
        <path d="M140,150 Q140,170 145,170 Q150,170 150,150 Z" fill="#3B82F6"/>
      </g>
    `
  },
  {
    id: 'wall-putty',
    title: 'Wall Putty',
    badge: 'White Cement Based',
    svg: `
      <g transform="translate(110, 35)">
        <!-- Putty Bag -->
        <path d="M20,30 L160,30 L150,190 L30,190 Z" fill="#FFFFFF" stroke="#64748B" stroke-width="2.5"/>
        <!-- Green Birla Leaf or Brand Band -->
        <rect x="25" y="70" width="130" height="50" fill="#16A34A"/>
        <text x="90" y="95" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">WALL PUTTY</text>
        <text x="90" y="112" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#DCFCE7" text-anchor="middle">WATER RESISTANT</text>
        <circle cx="90" cy="150" r="16" fill="#F1F5F9" stroke="#16A34A" stroke-width="2"/>
        <text x="90" y="154" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#16A34A" text-anchor="middle">40 KG</text>
      </g>
    `
  },
  {
    id: 'drainage-solution',
    title: 'Drainage Systems',
    badge: 'SS 304 Linear Drains',
    svg: `
      <g transform="translate(50, 60)">
        <!-- Linear Floor Drain Channel -->
        <polygon points="10,60 270,30 290,70 30,100" fill="#E2E8F0" stroke="#475569" stroke-width="2.5"/>
        <polygon points="30,100 290,70 290,110 30,140" fill="#94A3B8" stroke="#475569" stroke-width="2.5"/>
        <!-- Perforated Grill Slots -->
        <line x1="50" y1="62" x2="60" y2="82" stroke="#1E293B" stroke-width="3"/>
        <line x1="80" y1="58" x2="90" y2="78" stroke="#1E293B" stroke-width="3"/>
        <line x1="110" y1="54" x2="120" y2="74" stroke="#1E293B" stroke-width="3"/>
        <line x1="140" y1="50" x2="150" y2="70" stroke="#1E293B" stroke-width="3"/>
        <line x1="170" y1="46" x2="180" y2="66" stroke="#1E293B" stroke-width="3"/>
        <line x1="200" y1="42" x2="210" y2="62" stroke="#1E293B" stroke-width="3"/>
        <line x1="230" y1="38" x2="240" y2="58" stroke="#1E293B" stroke-width="3"/>
      </g>
    `
  }
];

// Generate each category SVG
categories.forEach(cat => {
  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </radialGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-opacity="0.08" />
    </filter>
  </defs>
  <!-- Studio Backdrop -->
  <rect width="400" height="300" rx="16" fill="url(#bgGrad)"/>
  
  <!-- Main Illustration with Shadow -->
  <g filter="url(#dropShadow)">
    ${cat.svg}
  </g>
  
  <!-- Category Info Bottom Strip -->
  <g transform="translate(20, 255)">
    <rect width="360" height="32" rx="8" fill="#FFFFFF" fill-opacity="0.9" stroke="#E2E8F0" stroke-width="1"/>
    <text x="14" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#0F172A">${cat.title}</text>
    <rect x="250" y="6" width="96" height="20" rx="4" fill="#F8FAFC" stroke="#CBD5E1"/>
    <text x="298" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="700" fill="#475569" text-anchor="middle">${cat.badge}</text>
  </g>
</svg>`;
  saveSvg(path.join(catDir, `${cat.id}.svg`), fullSvg);
});

console.log(`Generated ${categories.length} Category SVGs.`);

// ==========================================
// 2. GENERATE DEDICATED PRODUCT SVGS (ALL 39)
// ==========================================

const products = [
  // 1. JSW Steel Neosteel Fe550D
  {
    id: 'jsw-neosteel-fe550d-12mm',
    brand: 'JSW STEEL',
    brandColor: '#002B49',
    accentColor: '#E31837',
    name: 'JSW Neosteel Fe550D (12mm)',
    badge: '100% Primary Virgin Steel · BIS 1786',
    draw: `
      <!-- JSW Steel Rebar Bundle with Ribs -->
      <g transform="translate(50, 40)">
        <defs>
          <linearGradient id="jswSteel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="35%" stop-color="#94A3B8" />
            <stop offset="65%" stop-color="#E2E8F0" />
            <stop offset="100%" stop-color="#1E293B" />
          </linearGradient>
        </defs>
        <!-- Rebars in perspective -->
        <rect x="10" y="30" width="280" height="22" rx="11" fill="url(#jswSteel)" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="0" y="60" width="300" height="26" rx="13" fill="url(#jswSteel)" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="15" y="95" width="270" height="24" rx="12" fill="url(#jswSteel)" stroke="#0F172A" stroke-width="1.5"/>
        <rect x="5" y="125" width="290" height="28" rx="14" fill="url(#jswSteel)" stroke="#0F172A" stroke-width="2"/>
        
        <!-- Distinctive Helical Ribs -->
        ${Array.from({length: 12}).map((_, i) => `
          <line x1="${30 + i * 22}" y1="58" x2="${42 + i * 22}" y2="88" stroke="#0F172A" stroke-width="3" opacity="0.6"/>
          <line x1="${35 + i * 22}" y1="123" x2="${48 + i * 22}" y2="155" stroke="#0F172A" stroke-width="3.5" opacity="0.6"/>
        `).join('')}

        <!-- JSW Official Metal Mill Tag -->
        <g transform="translate(170, 75)">
          <rect width="110" height="50" rx="6" fill="#002B49" stroke="#E31837" stroke-width="2"/>
          <text x="55" y="22" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">JSW NEOSTEEL</text>
          <text x="55" y="36" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#E31837" text-anchor="middle">Fe 550D · 12mm</text>
          <circle cx="10" cy="25" r="4" fill="#F8FAFC"/>
        </g>
      </g>
    `
  },

  // 2. SAIL TMT Fe500D
  {
    id: 'sail-tmt-fe500d-16mm',
    brand: 'SAIL',
    brandColor: '#004B87',
    accentColor: '#F58220',
    name: 'SAIL TMT Fe500D (16mm)',
    badge: 'Govt. PSU Primary Steel · IS 1786',
    draw: `
      <g transform="translate(50, 40)">
        <defs>
          <linearGradient id="sailSteel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="40%" stop-color="#94A3B8" />
            <stop offset="70%" stop-color="#CBD5E1" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>
        <!-- 16mm Heavy Bars -->
        <rect x="5" y="35" width="290" height="30" rx="15" fill="url(#sailSteel)" stroke="#0F172A" stroke-width="2"/>
        <rect x="0" y="75" width="300" height="34" rx="17" fill="url(#sailSteel)" stroke="#0F172A" stroke-width="2.5"/>
        <rect x="10" y="120" width="280" height="32" rx="16" fill="url(#sailSteel)" stroke="#0F172A" stroke-width="2"/>
        
        <!-- Cross-Rib Lug Pattern -->
        ${Array.from({length: 11}).map((_, i) => `
          <line x1="${30 + i * 25}" y1="73" x2="${45 + i * 25}" y2="110" stroke="#0F172A" stroke-width="4" opacity="0.65"/>
        `).join('')}

        <!-- SAIL Official Tag -->
        <g transform="translate(160, 65)">
          <rect width="120" height="52" rx="6" fill="#004B87" stroke="#F58220" stroke-width="2"/>
          <text x="60" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">SAIL TMT</text>
          <text x="60" y="40" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#F58220" text-anchor="middle">Fe500D · 16mm Heavy</text>
        </g>
      </g>
    `
  },

  // 3. Tuffar Fe550D TMT
  {
    id: 'tuffar-tmt-12mm',
    brand: 'TUFFAR',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'Tuffar® Fe550D TMT Rebar (12mm)',
    badge: 'Matelio Private Label · High Ductility',
    draw: `
      <g transform="translate(50, 40)">
        <defs>
          <linearGradient id="tuffarSteel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="45%" stop-color="#64748B" />
            <stop offset="65%" stop-color="#E2E8F0" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>
        <rect x="10" y="30" width="280" height="24" rx="12" fill="url(#tuffarSteel)" stroke="#0F172A" stroke-width="2"/>
        <rect x="0" y="65" width="300" height="28" rx="14" fill="url(#tuffarSteel)" stroke="#0F172A" stroke-width="2"/>
        <rect x="10" y="105" width="280" height="26" rx="13" fill="url(#tuffarSteel)" stroke="#0F172A" stroke-width="2"/>
        <rect x="5" y="140" width="290" height="26" rx="13" fill="url(#tuffarSteel)" stroke="#0F172A" stroke-width="2"/>

        ${Array.from({length: 12}).map((_, i) => `
          <line x1="${25 + i * 23}" y1="63" x2="${38 + i * 23}" y2="94" stroke="#0F172A" stroke-width="3.5" opacity="0.7"/>
          <line x1="${30 + i * 23}" y1="103" x2="${43 + i * 23}" y2="132" stroke="#0F172A" stroke-width="3" opacity="0.7"/>
        `).join('')}

        <!-- Tuffar Gold Tag -->
        <g transform="translate(170, 75)">
          <rect width="115" height="52" rx="6" fill="#FCEFD2" stroke="#B45309" stroke-width="2.5"/>
          <text x="58" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#B45309" text-anchor="middle">TUFFAR® TMT</text>
          <text x="58" y="40" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#0F172A" text-anchor="middle">Fe550D · 16% Elongation</text>
        </g>
      </g>
    `
  },

  // 4. JK SmartBlox AAC Block
  {
    id: 'jk-smartblox-600x200x150',
    brand: 'JK SMARTBLOX',
    brandColor: '#047857',
    accentColor: '#10B981',
    name: 'JK SmartBlox AAC Block (600x200x150mm)',
    badge: 'Precision Autoclaved Aerated Concrete Block',
    draw: `
      <g transform="translate(60, 40)">
        <!-- 3D Concrete AAC Block -->
        <polygon points="50,90 200,50 260,80 110,120" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
        <polygon points="50,90 110,120 110,210 50,180" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
        <polygon points="110,120 260,80 260,170 110,210" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        
        <!-- Micro-cellular Pores -->
        ${Array.from({length: 15}).map((_, i) => `
          <circle cx="${125 + (i * 9) % 110}" cy="${135 + ((i * 13) % 65)}" r="${1.5 + (i % 3)}" fill="#64748B" opacity="0.6"/>
        `).join('')}

        <!-- JK Stamp -->
        <rect x="145" y="130" width="80" height="30" rx="4" fill="#047857" opacity="0.9"/>
        <text x="185" y="150" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">JK SMARTBLOX</text>
      </g>
    `
  },

  // 5. NXT BLOC AAC Block
  {
    id: 'nxt-bloc-lightweight-aac',
    brand: 'NXT BLOC',
    brandColor: '#1E3A8A',
    accentColor: '#3B82F6',
    name: 'NXT BLOC High-Strength AAC (600x200x200)',
    badge: 'Thermal Insulation Masonry Block',
    draw: `
      <g transform="translate(60, 40)">
        <polygon points="50,85 200,45 265,75 115,115" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
        <polygon points="50,85 115,115 115,215 50,185" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
        <polygon points="115,115 265,75 265,175 115,215" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        
        ${Array.from({length: 14}).map((_, i) => `
          <circle cx="${130 + (i * 11) % 110}" cy="${130 + ((i * 17) % 70)}" r="${1.5 + (i % 3)}" fill="#475569" opacity="0.5"/>
        `).join('')}

        <rect x="150" y="135" width="85" height="32" rx="4" fill="#1E3A8A"/>
        <text x="192" y="155" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">NXT BLOC</text>
      </g>
    `
  },

  // 6. UltraTech Super PPC Cement (50kg)
  {
    id: 'ultratech-super-cement-ppc',
    brand: 'ULTRATECH',
    brandColor: '#FACC15',
    accentColor: '#1E3A8A',
    name: 'UltraTech Super PPC Cement (50kg)',
    badge: 'Weather-Proof High Strength Cement',
    draw: `
      <g transform="translate(115, 30)">
        <!-- Cement Bag Shape -->
        <path d="M20,30 Q85,15 150,30 L160,195 Q85,210 10,195 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="3"/>
        <line x1="15" y1="28" x2="155" y2="28" stroke="#1E3A8A" stroke-width="5" stroke-dasharray="8,4"/>
        
        <!-- Navy Blue Brand Section -->
        <rect x="18" y="70" width="134" height="65" fill="#1E3A8A"/>
        <text x="85" y="96" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#FACC15" text-anchor="middle">UltraTech</text>
        <text x="85" y="112" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">SUPER CEMENT</text>
        <text x="85" y="125" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#93C5FD" text-anchor="middle">Weather-Proof PPC · 50kg</text>

        <rect x="55" y="150" width="60" height="24" rx="4" fill="#FFFFFF" stroke="#CA8A04"/>
        <text x="85" y="166" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#1E3A8A" text-anchor="middle">IS 1489</text>
      </g>
    `
  },

  // 7. Wonder Cement OPC 53
  {
    id: 'wonder-cement-opc-53',
    brand: 'WONDER CEMENT',
    brandColor: '#DC2626',
    accentColor: '#FFFFFF',
    name: 'Wonder Cement OPC 53 Grade (50kg)',
    badge: 'High Early Strength · Direct Dispatch',
    draw: `
      <g transform="translate(115, 30)">
        <path d="M20,30 Q85,15 150,30 L160,195 Q85,210 10,195 Z" fill="#FFFFFF" stroke="#DC2626" stroke-width="3"/>
        <line x1="15" y1="28" x2="155" y2="28" stroke="#DC2626" stroke-width="5" stroke-dasharray="7,3"/>
        
        <rect x="18" y="65" width="134" height="70" fill="#DC2626"/>
        <text x="85" y="93" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">WONDER</text>
        <text x="85" y="110" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FEF08A" text-anchor="middle">CEMENT</text>
        <text x="85" y="124" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">OPC 53 GRADE · 50 KG</text>

        <circle cx="85" cy="165" r="18" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
        <text x="85" y="169" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#DC2626" text-anchor="middle">BIS 53</text>
      </g>
    `
  },

  // 8. CemXtra OPC 53 Cement
  {
    id: 'cemxtra-opc-53',
    brand: 'CEMXTRA',
    brandColor: '#EA580C',
    accentColor: '#0D9488',
    name: 'CemXtra OPC 53 Grade Cement (50kg)',
    badge: 'Matelio Private Label · High Strength',
    draw: `
      <g transform="translate(115, 30)">
        <path d="M20,30 Q85,15 150,30 L160,195 Q85,210 10,195 Z" fill="#FCEFD2" stroke="#EA580C" stroke-width="3"/>
        <line x1="15" y1="28" x2="155" y2="28" stroke="#EA580C" stroke-width="5" stroke-dasharray="7,3"/>

        <rect x="18" y="65" width="134" height="70" fill="#EA580C"/>
        <text x="85" y="95" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">CemXtra®</text>
        <text x="85" y="113" font-family="Arial, sans-serif" font-size="10.5" font-weight="bold" fill="#FEF08A" text-anchor="middle">OPC 53 CEMENT</text>
        <text x="85" y="126" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">50 KG · HEAVY SLAB GRADE</text>

        <rect x="55" y="152" width="60" height="24" rx="4" fill="#0D9488"/>
        <text x="85" y="168" font-family="Arial, sans-serif" font-size="9.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CERTIFIED</text>
      </g>
    `
  },

  // 9. ZmartBuild AAC Wall Panel by NXT BLOC
  {
    id: 'zmartbuild-wall-panel-nxt-bloc',
    brand: 'ZMARTBUILD / NXT BLOC',
    brandColor: '#1E3A8A',
    accentColor: '#10B981',
    name: 'ZmartBuild Steel-Reinforced Wall Panel',
    badge: '3000x600x100mm Drywall Panel',
    draw: `
      <g transform="translate(85, 25)">
        <polygon points="30,40 100,10 150,30 80,60" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        <polygon points="30,40 80,60 80,225 30,205" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
        <polygon points="80,60 150,30 150,195 80,225" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
        <!-- Steel Mesh -->
        <line x1="100" y1="50" x2="100" y2="210" stroke="#3B82F6" stroke-width="3" stroke-dasharray="8,6"/>
        <line x1="130" y1="40" x2="130" y2="200" stroke="#3B82F6" stroke-width="3" stroke-dasharray="8,6"/>
        <!-- Tongue & Groove edge -->
        <rect x="150" y="80" width="8" height="60" fill="#94A3B8"/>
        <g transform="translate(90, 110)">
          <rect width="90" height="30" rx="4" fill="#1E3A8A"/>
          <text x="45" y="20" font-family="Arial, sans-serif" font-size="9.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">ZMARTBUILD</text>
        </g>
      </g>
    `
  },

  // 10. EzyWall Reinforced AAC Wall Panel (100mm)
  {
    id: 'ezywall-aac-panel-100',
    brand: 'EZYWALL',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'EzyWall Reinforced AAC Wall Panel (100mm)',
    badge: 'Matelio Private Label · 4x Faster Drywall',
    draw: `
      <g transform="translate(85, 25)">
        <polygon points="30,40 100,10 150,30 80,60" fill="#FCEFD2" stroke="#B45309" stroke-width="2"/>
        <polygon points="30,40 80,60 80,225 30,205" fill="#D97706" stroke="#B45309" stroke-width="2"/>
        <polygon points="80,60 150,30 150,195 80,225" fill="#FEF3C7" stroke="#B45309" stroke-width="2"/>
        <line x1="100" y1="50" x2="100" y2="210" stroke="#B45309" stroke-width="3" stroke-dasharray="8,6"/>
        <line x1="130" y1="40" x2="130" y2="200" stroke="#B45309" stroke-width="3" stroke-dasharray="8,6"/>
        <g transform="translate(85, 110)">
          <rect width="90" height="30" rx="4" fill="#B45309"/>
          <text x="45" y="20" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">EzyWall® 100mm</text>
        </g>
      </g>
    `
  },

  // 11. Dr. Fixit 101 Pidiproof LW+ (20L)
  {
    id: 'dr-fixit-101-lw-waterproofing',
    brand: 'DR. FIXIT',
    brandColor: '#0284C7',
    accentColor: '#F59E0B',
    name: 'Dr. Fixit 101 Pidiproof LW+ (20 Litres)',
    badge: 'Integral Waterproofing Liquid Compound',
    draw: `
      <g transform="translate(110, 35)">
        <!-- Canister Body -->
        <rect x="20" y="45" width="140" height="160" rx="16" fill="#0284C7" stroke="#0369A1" stroke-width="3"/>
        <rect x="65" y="20" width="50" height="28" rx="6" fill="#F59E0B" stroke="#D97706" stroke-width="2.5"/>
        <path d="M45,45 L45,28 L135,28 L135,45" fill="none" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Front Label -->
        <rect x="30" y="80" width="120" height="95" rx="8" fill="#FFFFFF"/>
        <rect x="30" y="80" width="120" height="24" fill="#F59E0B"/>
        <text x="90" y="97" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#000" text-anchor="middle">DR. FIXIT</text>
        
        <text x="90" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#0284C7" text-anchor="middle">101 LW+</text>
        <text x="90" y="142" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0F172A" text-anchor="middle">PIDIPROOF LIQUID</text>
        <text x="90" y="162" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#DC2626" text-anchor="middle">20 LITRES</text>
      </g>
    `
  },

  // 12. Roff T01 Tile Adhesive (20kg)
  {
    id: 'roff-t01-nca-tile-adhesive',
    brand: 'ROFF',
    brandColor: '#DC2626',
    accentColor: '#1E293B',
    name: 'Roff T01 New Construction Adhesive (20kg)',
    badge: 'Polymer Modified Tile Adhesive Bag',
    draw: `
      <g transform="translate(115, 30)">
        <path d="M20,30 Q85,15 150,30 L160,195 Q85,210 10,195 Z" fill="#F8FAFC" stroke="#DC2626" stroke-width="3"/>
        <line x1="15" y1="28" x2="155" y2="28" stroke="#DC2626" stroke-width="5" stroke-dasharray="6,3"/>

        <rect x="18" y="70" width="134" height="65" fill="#DC2626"/>
        <text x="85" y="97" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">ROFF</text>
        <text x="85" y="115" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FEF08A" text-anchor="middle">T01 NCA ADHESIVE</text>
        <text x="85" y="128" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">NEW CONSTRUCTION · 20 KG</text>

        <!-- Tile pattern icon -->
        <rect x="70" y="150" width="30" height="30" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5"/>
        <line x1="85" y1="150" x2="85" y2="180" stroke="#DC2626" stroke-width="2"/>
        <line x1="70" y1="165" x2="100" y2="165" stroke="#DC2626" stroke-width="2"/>
      </g>
    `
  },

  // 13. Sika Latex Power (10L)
  {
    id: 'sika-latex-power-waterproofing',
    brand: 'SIKA',
    brandColor: '#EAB308',
    accentColor: '#DC2626',
    name: 'Sika Latex Power SBR Agent (10 Litres)',
    badge: 'Waterproof Bonding & Repair Agent',
    draw: `
      <g transform="translate(115, 35)">
        <rect x="20" y="45" width="130" height="155" rx="14" fill="#EAB308" stroke="#CA8A04" stroke-width="3"/>
        <rect x="60" y="22" width="50" height="25" rx="5" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
        <path d="M40,45 L40,28 L130,28 L130,45" fill="none" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>

        <!-- Sika Triangular Logo & Text -->
        <polygon points="85,80 65,115 105,115" fill="#DC2626"/>
        <text x="85" y="108" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">SIKA</text>
        
        <rect x="25" y="130" width="120" height="45" rx="4" fill="#FFFFFF"/>
        <text x="85" y="150" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#000000" text-anchor="middle">LATEX POWER</text>
        <text x="85" y="165" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#DC2626" text-anchor="middle">SBR BONDING · 10L</text>
      </g>
    `
  },

  // 14. Bondex Pro Gold Tile Adhesive
  {
    id: 'bondex-gold-adhesive',
    brand: 'BONDEX',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'Bondex Pro Gold Type-2 Tile Adhesive (20kg)',
    badge: 'Matelio Private Label · Polymer Modified',
    draw: `
      <g transform="translate(115, 30)">
        <path d="M20,30 Q85,15 150,30 L160,195 Q85,210 10,195 Z" fill="#FCEFD2" stroke="#B45309" stroke-width="3"/>
        <line x1="15" y1="28" x2="155" y2="28" stroke="#B45309" stroke-width="5" stroke-dasharray="6,3"/>

        <rect x="18" y="70" width="134" height="65" fill="#B45309"/>
        <text x="85" y="97" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">Bondex®</text>
        <text x="85" y="115" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#FEF08A" text-anchor="middle">PRO GOLD TYPE-2</text>
        <text x="85" y="128" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">HIGH-BOND TILE ADHESIVE</text>

        <rect x="60" y="152" width="50" height="24" rx="4" fill="#F59E0B"/>
        <text x="85" y="168" font-family="Arial, sans-serif" font-size="9.5" font-weight="900" fill="#000" text-anchor="middle">20 KG</text>
      </g>
    `
  },

  // 15. Astral CPVC PRO Pipe (1 Inch x 3m)
  {
    id: 'astral-cpvc-pro-pipe-1inch',
    brand: 'ASTRAL PIPES',
    brandColor: '#E11D48',
    accentColor: '#FEF08A',
    name: 'Astral Pipes CPVC PRO High Pressure (1 Inch)',
    badge: 'SDR-11 Hot & Cold Potable Water Pipe',
    draw: `
      <g transform="translate(50, 45)">
        <!-- Astral Cream CPVC pipes with Red lettering -->
        <rect x="10" y="45" width="280" height="26" rx="13" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="10" y1="58" x2="290" y2="58" stroke="#E11D48" stroke-width="3.5"/>
        
        <rect x="20" y="85" width="280" height="32" rx="16" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="20" y1="101" x2="300" y2="101" stroke="#E11D48" stroke-width="4"/>

        <rect x="0" y="130" width="290" height="30" rx="15" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="0" y1="145" x2="290" y2="145" stroke="#E11D48" stroke-width="3.5"/>

        <!-- Astral Stamp -->
        <g transform="translate(140, 85)">
          <text x="30" y="18" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#E11D48">ASTRAL CPVC PRO</text>
          <text x="30" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#B45309">SDR 11 · 1 INCH · 3M</text>
        </g>
      </g>
    `
  },

  // 16. Ashirvad by Aliaxis CPVC Pipe
  {
    id: 'ashirvad-flowguard-cpvc-pipe-34inch',
    brand: 'ASHIRVAD BY ALIAXIS',
    brandColor: '#2563EB',
    accentColor: '#DC2626',
    name: 'Ashirvad FlowGuard Plus CPVC (3/4 Inch)',
    badge: 'FlowGuard Gold Technology · Hot & Cold',
    draw: `
      <g transform="translate(50, 45)">
        <rect x="10" y="45" width="280" height="26" rx="13" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="10" y1="58" x2="290" y2="58" stroke="#2563EB" stroke-width="3.5"/>
        
        <rect x="20" y="85" width="280" height="30" rx="15" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="20" y1="100" x2="300" y2="100" stroke="#2563EB" stroke-width="4"/>

        <rect x="0" y="130" width="290" height="28" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="0" y1="144" x2="290" y2="144" stroke="#DC2626" stroke-width="3.5"/>

        <g transform="translate(130, 85)">
          <text x="30" y="18" font-family="Arial, sans-serif" font-size="10.5" font-weight="900" fill="#2563EB">ASHIRVAD FLOWGUARD</text>
          <text x="30" y="27" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#DC2626">3/4 INCH · 3 METERS</text>
        </g>
      </g>
    `
  },

  // 17. Supreme Lifeline CPVC Pipe
  {
    id: 'supreme-lifeline-cpvc-pipe',
    brand: 'SUPREME',
    brandColor: '#DC2626',
    accentColor: '#1E293B',
    name: 'Supreme Lifeline C-PVC Pipe (1 Inch)',
    badge: 'High Pressure Potable Water Piping',
    draw: `
      <g transform="translate(50, 45)">
        <rect x="10" y="45" width="280" height="26" rx="13" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="10" y1="58" x2="290" y2="58" stroke="#DC2626" stroke-width="3.5"/>
        
        <rect x="20" y="85" width="280" height="32" rx="16" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="20" y1="101" x2="300" y2="101" stroke="#DC2626" stroke-width="4"/>

        <rect x="0" y="130" width="290" height="30" rx="15" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
        <line x1="0" y1="145" x2="290" y2="145" stroke="#DC2626" stroke-width="3.5"/>

        <g transform="translate(140, 85)">
          <text x="30" y="18" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#DC2626">SUPREME LIFELINE</text>
          <text x="30" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#0F172A">C-PVC · 1 INCH POTABLE</text>
        </g>
      </g>
    `
  },

  // 18. HydroLine ProFlow CPVC Pipe
  {
    id: 'hydroline-cpvc-pipe-1inch',
    brand: 'HYDROLINE',
    brandColor: '#B45309',
    accentColor: '#0284C7',
    name: 'HydroLine ProFlow SDR-11 CPVC (1 Inch)',
    badge: 'Matelio Private Label · 100% Leak-Proof',
    draw: `
      <g transform="translate(50, 45)">
        <rect x="10" y="45" width="280" height="26" rx="13" fill="#FCEFD2" stroke="#B45309" stroke-width="2"/>
        <line x1="10" y1="58" x2="290" y2="58" stroke="#0284C7" stroke-width="3.5"/>
        
        <rect x="20" y="85" width="280" height="32" rx="16" fill="#FCEFD2" stroke="#B45309" stroke-width="2"/>
        <line x1="20" y1="101" x2="300" y2="101" stroke="#0284C7" stroke-width="4"/>

        <rect x="0" y="130" width="290" height="30" rx="15" fill="#FCEFD2" stroke="#B45309" stroke-width="2"/>
        <line x1="0" y1="145" x2="290" y2="145" stroke="#0284C7" stroke-width="3.5"/>

        <g transform="translate(130, 85)">
          <text x="30" y="18" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#B45309">HydroLine® ProFlow</text>
          <text x="30" y="28" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#0284C7">SDR-11 · 1 INCH CPVC</text>
        </g>
      </g>
    `
  },

  // 19. Hindware Elegance Aura Rimless Wall Mounted Toilet
  {
    id: 'hindware-elegance-aura-wall-hung-toilet',
    brand: 'HINDWARE',
    brandColor: '#E11D48',
    accentColor: '#FFFFFF',
    name: 'Hindware Aura Rimless Wall Hung Toilet',
    badge: 'Vortex Rimless Flush · Soft-Close Slim Seat',
    draw: `
      <g transform="translate(100, 35)">
        <!-- Wall-Hung Modern Commode -->
        <path d="M40,50 L160,50 L175,130 Q175,200 100,200 Q25,200 25,130 Z" fill="#FFFFFF" stroke="#64748B" stroke-width="3"/>
        <ellipse cx="100" cy="130" rx="45" ry="55" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
        <ellipse cx="100" cy="135" rx="25" ry="35" fill="#E2E8F0"/>
        <!-- Hindware Badge -->
        <rect x="75" y="60" width="50" height="18" rx="3" fill="#E11D48"/>
        <text x="100" y="73" font-family="Arial, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">HINDWARE</text>
      </g>
    `
  },

  // 20. Jaquar Queen Concealed Single Lever Shower Diverter
  {
    id: 'jaquar-queen-single-lever-diverter',
    brand: 'JAQUAR',
    brandColor: '#0F172A',
    accentColor: '#F59E0B',
    name: 'Jaquar Queen Concealed Shower Diverter',
    badge: 'High Flow 40mm Cartridge · Solid Chrome Brass',
    draw: `
      <g transform="translate(110, 40)">
        <circle cx="90" cy="110" r="75" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/>
        <circle cx="90" cy="110" r="68" fill="none" stroke="#FFFFFF" stroke-width="4"/>
        
        <!-- Hot / Cold Indicators -->
        <circle cx="50" cy="110" r="5" fill="#DC2626"/>
        <circle cx="130" cy="110" r="5" fill="#2563EB"/>
        
        <!-- Sleek Single Lever Handle -->
        <rect x="83" y="65" width="14" height="90" rx="7" fill="#334155" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="90" cy="110" r="14" fill="#0F172A"/>

        <!-- Jaquar branding -->
        <text x="90" y="55" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0F172A" text-anchor="middle">JAQUAR</text>
      </g>
    `
  },

  // 21. Duravit ME by Starck Modern Washbasin
  {
    id: 'duravit-me-by-starck-washbasin',
    brand: 'DURAVIT',
    brandColor: '#1E293B',
    accentColor: '#3B82F6',
    name: 'Duravit ME by Starck Modern Washbasin (600mm)',
    badge: 'Ceramic Countertop Vanity Basin',
    draw: `
      <g transform="translate(70, 50)">
        <!-- Countertop Ceramic Basin -->
        <polygon points="30,70 230,70 210,160 50,160" fill="#FFFFFF" stroke="#64748B" stroke-width="3"/>
        <ellipse cx="130" cy="70" rx="100" ry="25" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="130" cy="115" r="12" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
        <circle cx="130" cy="115" r="6" fill="#334155"/>
        <text x="130" y="55" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">DURAVIT ME BY STARCK</text>
      </g>
    `
  },

  // 22. Sanivo Aura Rimless Wall-Hung EWC
  {
    id: 'sanivo-rimless-ewc',
    brand: 'SANIVO',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'Sanivo Aura Rimless Wall-Hung EWC',
    badge: 'Matelio Private Label · Soft-Close Slim Seat',
    draw: `
      <g transform="translate(100, 35)">
        <path d="M40,50 L160,50 L175,130 Q175,200 100,200 Q25,200 25,130 Z" fill="#FFFFFF" stroke="#B45309" stroke-width="3"/>
        <ellipse cx="100" cy="130" rx="45" ry="55" fill="#FCEFD2" stroke="#D97706" stroke-width="2"/>
        <ellipse cx="100" cy="135" rx="25" ry="35" fill="#E2E8F0"/>
        <rect x="75" y="60" width="50" height="18" rx="3" fill="#B45309"/>
        <text x="100" y="73" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle">SANIVO®</text>
      </g>
    `
  },

  // 23. Qutone Marmo Royal Glazed Vitrified Tile
  {
    id: 'qutone-marmo-royal-vitrified-tile',
    brand: 'QUTONE',
    brandColor: '#0F172A',
    accentColor: '#E2E8F0',
    name: 'Qutone Marmo Royal GVT (600x1200mm)',
    badge: 'High Gloss Polished Vitrified Tile',
    draw: `
      <g transform="translate(60, 40)">
        <polygon points="40,50 220,20 260,160 80,190" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
        <!-- Marble Veining -->
        <path d="M70,80 Q140,85 160,50 T220,80" fill="none" stroke="#94A3B8" stroke-width="3"/>
        <path d="M100,140 Q160,120 180,150 T240,130" fill="none" stroke="#64748B" stroke-width="2.5"/>
        <polygon points="60,60 120,50 80,180 40,170" fill="#FFFFFF" opacity="0.4"/>
        <g transform="translate(150, 145)">
          <rect width="70" height="24" rx="4" fill="#0F172A"/>
          <text x="35" y="16" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFF" text-anchor="middle">QUTONE GVT</text>
        </g>
      </g>
    `
  },

  // 24. Varmora Carving Matt Finish GVT Tile
  {
    id: 'varmora-carving-matt-vitrified-tile',
    brand: 'VARMORA',
    brandColor: '#DC2626',
    accentColor: '#1E293B',
    name: 'Varmora Carving Matt GVT Tile (600x600mm)',
    badge: 'Architectural Carving Matt Finish',
    draw: `
      <g transform="translate(75, 40)">
        <polygon points="30,50 190,30 230,170 70,190" fill="#F1F5F9" stroke="#DC2626" stroke-width="2.5"/>
        <path d="M60,80 Q120,100 150,70 T200,100" fill="none" stroke="#CBD5E1" stroke-width="4"/>
        <path d="M80,130 Q140,110 170,140" fill="none" stroke="#94A3B8" stroke-width="3"/>
        <g transform="translate(130, 140)">
          <rect width="65" height="24" rx="4" fill="#DC2626"/>
          <text x="32" y="16" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFF" text-anchor="middle">VARMORA</text>
        </g>
      </g>
    `
  },

  // 25. TileTrendz Statuario Calacatta Gold GVT
  {
    id: 'tiletrendz-calacatta-gold',
    brand: 'TILETRENDZ',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'TileTrendz Statuario Calacatta Gold (600x1200)',
    badge: 'Matelio Private Label · Luxury Gold Marble Vein',
    draw: `
      <g transform="translate(60, 40)">
        <polygon points="40,50 220,20 260,160 80,190" fill="#FFFFFF" stroke="#B45309" stroke-width="2.5"/>
        <!-- Golden Veins -->
        <path d="M70,75 Q130,85 160,45 T230,75" fill="none" stroke="#D97706" stroke-width="3.5"/>
        <path d="M100,140 Q160,115 190,145 T250,125" fill="none" stroke="#B45309" stroke-width="2.5"/>
        <path d="M120,100 Q150,115 170,95" fill="none" stroke="#CBD5E1" stroke-width="2"/>
        <g transform="translate(130, 145)">
          <rect width="90" height="24" rx="4" fill="#FCEFD2" stroke="#B45309" stroke-width="1.5"/>
          <text x="45" y="16" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#B45309" text-anchor="middle">TileTrendz® Gold</text>
        </g>
      </g>
    `
  },

  // 26. Geberit Sigma 12cm Concealed Dual-Flush Cistern
  {
    id: 'geberit-sigma-concealed-cistern',
    brand: 'GEBERIT',
    brandColor: '#1D4ED8',
    accentColor: '#FFFFFF',
    name: 'Geberit Sigma Concealed Dual-Flush Cistern',
    badge: 'Swiss Precision UP320 Cistern Module',
    draw: `
      <g transform="translate(100, 30)">
        <rect x="25" y="20" width="150" height="205" rx="6" fill="none" stroke="#1D4ED8" stroke-width="8"/>
        <rect x="40" y="40" width="120" height="105" rx="8" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
        <rect x="70" y="60" width="60" height="40" rx="4" fill="#334155" stroke="#E2E8F0" stroke-width="2"/>
        <ellipse cx="90" cy="80" rx="10" ry="10" fill="#E2E8F0"/>
        <ellipse cx="115" cy="80" rx="7" ry="7" fill="#E2E8F0"/>
        <rect x="85" y="145" width="30" height="65" fill="#1E293B" rx="4"/>
        <text x="100" y="38" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#1D4ED8" text-anchor="middle">GEBERIT SIGMA</text>
      </g>
    `
  },

  // 27. TECE Base Concealed Dual Flush Cistern
  {
    id: 'tece-base-concealed-cistern-module',
    brand: 'TECE',
    brandColor: '#DC2626',
    accentColor: '#1E293B',
    name: 'TECE Base Concealed Cistern Frame',
    badge: 'Acoustic Sound Insulation Cistern Frame',
    draw: `
      <g transform="translate(100, 30)">
        <rect x="25" y="20" width="150" height="205" rx="6" fill="none" stroke="#64748B" stroke-width="8"/>
        <rect x="40" y="40" width="120" height="105" rx="8" fill="#F8FAFC" stroke="#DC2626" stroke-width="2"/>
        <rect x="70" y="60" width="60" height="40" rx="4" fill="#DC2626"/>
        <ellipse cx="90" cy="80" rx="9" ry="9" fill="#FFFFFF"/>
        <ellipse cx="115" cy="80" rx="6" ry="6" fill="#FFFFFF"/>
        <rect x="85" y="145" width="30" height="65" fill="#334155" rx="4"/>
        <text x="100" y="38" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#DC2626" text-anchor="middle">TECE BASE</text>
      </g>
    `
  },

  // 28. Franke Maris Heavy SS 304 Undermount Kitchen Sink
  {
    id: 'franke-maris-ss304-undermount-sink',
    brand: 'FRANKE',
    brandColor: '#DC2626',
    accentColor: '#64748B',
    name: 'Franke Maris Heavy SS 304 Sink (24x18)',
    badge: 'Sound-Deadened SS 304 Undermount Sink',
    draw: `
      <g transform="translate(60, 40)">
        <rect x="20" y="30" width="240" height="170" rx="16" fill="#CBD5E1" stroke="#475569" stroke-width="3"/>
        <rect x="40" y="50" width="200" height="130" rx="12" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2.5"/>
        <polygon points="40,50 140,50 80,180 40,180" fill="#FFFFFF" opacity="0.3"/>
        <circle cx="140" cy="115" r="22" fill="#64748B" stroke="#334155" stroke-width="2"/>
        <circle cx="140" cy="115" r="14" fill="#334155"/>
        <circle cx="140" cy="115" r="6" fill="#F8FAFC"/>
        <g transform="translate(180, 55)">
          <rect width="50" height="18" rx="3" fill="#DC2626"/>
          <text x="25" y="13" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFF" text-anchor="middle">FRANKE</text>
        </g>
      </g>
    `
  },

  // 29. Hindware Quadra Satin Single Bowl Kitchen Sink
  {
    id: 'hindware-quadra-satin-ss-sink',
    brand: 'HINDWARE',
    brandColor: '#E11D48',
    accentColor: '#1E293B',
    name: 'Hindware Quadra Satin Sink with Drainboard',
    badge: 'Single Bowl with Drainboard (37x18 Inch)',
    draw: `
      <g transform="translate(50, 40)">
        <rect x="10" y="30" width="280" height="170" rx="16" fill="#CBD5E1" stroke="#475569" stroke-width="3"/>
        <!-- Bowl -->
        <rect x="25" y="50" width="140" height="130" rx="12" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="95" cy="115" r="20" fill="#64748B"/>
        <!-- Drainboard grooves -->
        <rect x="180" y="50" width="95" height="130" rx="8" fill="#E2E8F0"/>
        <line x1="195" y1="65" x2="260" y2="65" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="195" y1="85" x2="260" y2="85" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="195" y1="105" x2="260" y2="105" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="195" y1="125" x2="260" y2="125" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="195" y1="145" x2="260" y2="145" stroke="#94A3B8" stroke-width="2.5"/>
      </g>
    `
  },

  // 30. Giacomini EVOH Oxygen Barrier PEX-b Pipe
  {
    id: 'giacomini-hydronic-underfloor-pex-cooling-pipe',
    brand: 'GIACOMINI',
    brandColor: '#DC2626',
    accentColor: '#F59E0B',
    name: 'Giacomini EVOH PEX-b Radiant Pipe (200m)',
    badge: 'Underfloor Radiant Heating & Cooling Pipe',
    draw: `
      <g transform="translate(80, 40)">
        <ellipse cx="120" cy="120" rx="100" ry="60" fill="none" stroke="#DC2626" stroke-width="16"/>
        <ellipse cx="120" cy="110" rx="80" ry="48" fill="none" stroke="#EF4444" stroke-width="14"/>
        <ellipse cx="120" cy="100" rx="60" ry="36" fill="none" stroke="#F87171" stroke-width="12"/>
        <rect x="180" y="70" width="30" height="60" rx="4" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
        <text x="120" y="115" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">GIACOMINI EVOH</text>
      </g>
    `
  },

  // 31. Acquaviva Zenith Luxury Whirlpool Bathtub
  {
    id: 'acquaviva-whirlpool-hydro-massage-bathtub',
    brand: 'ACQUAVIVA',
    brandColor: '#0284C7',
    accentColor: '#38BDF8',
    name: 'Acquaviva Zenith Luxury Whirlpool Bathtub',
    badge: 'Hydro-Massage Free-standing Spa Bathtub',
    draw: `
      <g transform="translate(60, 40)">
        <ellipse cx="140" cy="110" rx="120" ry="60" fill="#FFFFFF" stroke="#0284C7" stroke-width="3"/>
        <ellipse cx="140" cy="105" rx="105" ry="45" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2"/>
        <path d="M60,110 Q140,125 220,110" fill="none" stroke="#0284C7" stroke-width="2" opacity="0.6"/>
        <!-- Hydro Massage Jets -->
        <circle cx="75" cy="110" r="5" fill="#94A3B8"/>
        <circle cx="105" cy="125" r="5" fill="#94A3B8"/>
        <circle cx="175" cy="125" r="5" fill="#94A3B8"/>
        <circle cx="205" cy="110" r="5" fill="#94A3B8"/>
        <text x="140" y="90" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#0284C7" text-anchor="middle">ACQUAVIVA SPA</text>
      </g>
    `
  },

  // 32. Birla Opus Style Interior Primer & Emulsion (20L)
  {
    id: 'birla-opus-style-perfect-start-primer',
    brand: 'BIRLA OPUS',
    brandColor: '#7C3AED',
    accentColor: '#EC4899',
    name: 'Birla Opus Style Interior Primer & Emulsion',
    badge: 'Luxury Interior Sheen & Anti-Fungal (20L)',
    draw: `
      <g transform="translate(100, 35)">
        <path d="M30,60 L45,185 Q100,200 155,185 L170,60 Z" fill="#F8FAFC" stroke="#7C3AED" stroke-width="2.5"/>
        <ellipse cx="100" cy="60" rx="70" ry="16" fill="#EDE9FE" stroke="#7C3AED" stroke-width="3"/>
        <path d="M25,60 Q100,0 175,60" fill="none" stroke="#334155" stroke-width="4"/>

        <!-- Birla Opus Multicolor Wave Banner -->
        <path d="M35,100 L165,100 L157,155 L43,155 Z" fill="#7C3AED"/>
        <text x="100" y="125" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">BIRLA OPUS</text>
        <text x="100" y="142" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#FDE047" text-anchor="middle">STYLE INTERIOR · 20L</text>
      </g>
    `
  },

  // 33. Birla Opus Calista WeatherGuard Luxury Exterior Emulsion
  {
    id: 'birla-opus-calista-luxury-emulsion',
    brand: 'BIRLA OPUS',
    brandColor: '#059669',
    accentColor: '#F59E0B',
    name: 'Birla Opus Calista WeatherGuard Exterior',
    badge: 'Weather-Proof Silicon Exterior Paint (20L)',
    draw: `
      <g transform="translate(100, 35)">
        <path d="M30,60 L45,185 Q100,200 155,185 L170,60 Z" fill="#F8FAFC" stroke="#059669" stroke-width="2.5"/>
        <ellipse cx="100" cy="60" rx="70" ry="16" fill="#D1FAE5" stroke="#059669" stroke-width="3"/>
        <path d="M25,60 Q100,0 175,60" fill="none" stroke="#334155" stroke-width="4"/>

        <path d="M35,100 L165,100 L157,155 L43,155 Z" fill="#059669"/>
        <text x="100" y="125" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">BIRLA OPUS</text>
        <text x="100" y="142" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#FEF08A" text-anchor="middle">CALISTA EXTERIOR · 20L</text>
      </g>
    `
  },

  // 34. Birla White WallCare Putty (40kg)
  {
    id: 'birla-white-wallcare-putty-40kg',
    brand: 'BIRLA WHITE',
    brandColor: '#16A34A',
    accentColor: '#FFFFFF',
    name: 'Birla White WallCare Putty (40kg Bag)',
    badge: 'Water-Resistant White Cement Wall Putty',
    draw: `
      <g transform="translate(110, 30)">
        <path d="M20,30 L160,30 L150,195 L30,195 Z" fill="#FFFFFF" stroke="#16A34A" stroke-width="3"/>
        <line x1="15" y1="28" x2="165" y2="28" stroke="#16A34A" stroke-width="4" stroke-dasharray="6,3"/>

        <rect x="25" y="70" width="130" height="55" fill="#16A34A"/>
        <text x="90" y="96" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">BIRLA WHITE</text>
        <text x="90" y="114" font-family="Arial, sans-serif" font-size="9.5" font-weight="bold" fill="#DCFCE7" text-anchor="middle">WALLCARE PUTTY</text>

        <circle cx="90" cy="155" r="18" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
        <text x="90" y="159" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#16A34A" text-anchor="middle">40 KG</text>
      </g>
    `
  },

  // 35. JK Lakshmiplast Gypsum Plaster & Putty (25kg)
  {
    id: 'jk-lakshmiplast-gypsum-putty',
    brand: 'JK LAKSHMIPLAST',
    brandColor: '#DC2626',
    accentColor: '#1E293B',
    name: 'JK Lakshmiplast Gypsum Plaster (25kg)',
    badge: 'Extra Bright High-Gloss Gypsum Plaster',
    draw: `
      <g transform="translate(110, 30)">
        <path d="M20,30 L160,30 L150,195 L30,195 Z" fill="#FFFFFF" stroke="#DC2626" stroke-width="3"/>
        <line x1="15" y1="28" x2="165" y2="28" stroke="#DC2626" stroke-width="4" stroke-dasharray="6,3"/>

        <rect x="25" y="70" width="130" height="55" fill="#DC2626"/>
        <text x="90" y="95" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">JK LAKSHMIPLAST</text>
        <text x="90" y="112" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#FEF08A" text-anchor="middle">GYPSUM PLASTER</text>

        <polygon points="90,135 110,155 90,175 70,155" fill="#FEE2E2" stroke="#DC2626" stroke-width="2"/>
        <text x="90" y="159" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#DC2626" text-anchor="middle">25 KG</text>
      </g>
    `
  },

  // 36. LIDCO SS 304 Linear Shower Floor Drain (600mm)
  {
    id: 'lidco-ss304-linear-floor-drain-channel',
    brand: 'LIDCO',
    brandColor: '#475569',
    accentColor: '#3B82F6',
    name: 'LIDCO SS 304 Linear Shower Floor Drain',
    badge: 'Anti-Odor Cockroach Trap (600mm)',
    draw: `
      <g transform="translate(50, 55)">
        <polygon points="10,60 270,30 290,70 30,100" fill="#E2E8F0" stroke="#334155" stroke-width="2.5"/>
        <polygon points="30,100 290,70 290,115 30,145" fill="#94A3B8" stroke="#334155" stroke-width="2.5"/>
        
        ${Array.from({length: 8}).map((_, i) => `
          <line x1="${50 + i * 28}" y1="${60 - i * 3.5}" x2="${60 + i * 28}" y2="${80 - i * 3.5}" stroke="#1E293B" stroke-width="3"/>
        `).join('')}

        <g transform="translate(180, 80)">
          <rect width="60" height="20" rx="3" fill="#1E293B"/>
          <text x="30" y="14" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#FFF" text-anchor="middle">SS 304</text>
        </g>
      </g>
    `
  },

  // 37. Strongfab Structural ISMB I-Beam (150x75mm)
  {
    id: 'strongfab-i-beam-150',
    brand: 'STRONGFAB',
    brandColor: '#B45309',
    accentColor: '#F59E0B',
    name: 'Strongfab Structural ISMB I-Beam (150x75)',
    badge: 'Matelio Private Label · PEB & Structural Steel',
    draw: `
      <g transform="translate(70, 40)">
        <!-- Heavy Steel I-Beam in 3D Isometric View -->
        <polygon points="20,50 80,50 80,70 60,70 60,130 80,130 80,150 20,150 20,130 40,130 40,70 20,70" fill="#475569" stroke="#0F172A" stroke-width="2"/>
        <polygon points="80,50 240,20 240,40 100,70 100,50" fill="#64748B" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="100,70 240,40 240,100 100,130" fill="#334155" stroke="#0F172A" stroke-width="1.5"/>
        <polygon points="80,150 240,120 240,140 80,170" fill="#64748B" stroke="#0F172A" stroke-width="1.5"/>

        <g transform="translate(130, 80)">
          <rect width="100" height="36" rx="4" fill="#FCEFD2" stroke="#B45309" stroke-width="1.5"/>
          <text x="50" y="18" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#B45309" text-anchor="middle">STRONGFAB®</text>
          <text x="50" y="30" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#000" text-anchor="middle">ISMB 150x75 mm</text>
        </g>
      </g>
    `
  },

  // 38. SafeSite Heavy-Duty Industrial Safety Helmet
  {
    id: 'safesite-helmet-ratchet',
    brand: 'SAFESITE',
    brandColor: '#EAB308',
    accentColor: '#1E293B',
    name: 'SafeSite Industrial Safety Helmet with Ratchet',
    badge: 'ABS Shell · 6-Point Suspension · IS 2925',
    draw: `
      <g transform="translate(100, 45)">
        <!-- Industrial Safety Helmet (High Visibility Yellow) -->
        <path d="M20,130 Q20,40 100,40 Q180,40 180,130 Q195,135 195,145 L5,145 Q5,135 20,130 Z" fill="#EAB308" stroke="#CA8A04" stroke-width="3"/>
        <!-- Brim and Peak -->
        <path d="M5,145 Q100,165 195,145 L200,150 Q100,175 0,150 Z" fill="#CA8A04"/>
        <!-- Center Crown Ridge -->
        <path d="M100,40 L100,135" stroke="#CA8A04" stroke-width="5"/>
        <circle cx="100" cy="100" r="14" fill="#1E293B"/>
        <text x="100" y="104" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#FFF" text-anchor="middle">CE</text>
      </g>
    `
  },

  // 39. GripFit Zinc Plated Heavy Wedge Expansion Anchor Bolts
  {
    id: 'gripfit-anchor-bolt-m12',
    brand: 'GRIPFIT',
    brandColor: '#EAB308',
    accentColor: '#475569',
    name: 'GripFit Heavy Wedge Anchor Bolts (M12x100)',
    badge: 'High-Strength Yellow Zinc Plated Concrete Bolts',
    draw: `
      <g transform="translate(65, 45)">
        <!-- Wedge Anchor Bolt with Nut & Washer -->
        <rect x="30" y="80" width="220" height="18" rx="4" fill="#EAB308" stroke="#B45309" stroke-width="2"/>
        <!-- Threading lines -->
        ${Array.from({length: 12}).map((_, i) => `
          <line x1="${40 + i * 10}" y1="80" x2="${45 + i * 10}" y2="98" stroke="#B45309" stroke-width="2.5"/>
        `).join('')}
        <!-- Hex Nut -->
        <polygon points="160,70 180,70 190,89 180,108 160,108 150,89" fill="#CA8A04" stroke="#78350F" stroke-width="2"/>
        <!-- Washer -->
        <rect x="190" y="72" width="8" height="34" fill="#78350F" rx="2"/>
        <!-- Expansion Wedge Clip -->
        <polygon points="230,76 255,89 230,102" fill="#CA8A04" stroke="#78350F" stroke-width="2"/>
        <g transform="translate(70, 130)">
          <rect width="120" height="28" rx="4" fill="#1E293B"/>
          <text x="60" y="18" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#FDE047" text-anchor="middle">GRIPFIT M12x100mm</text>
        </g>
      </g>
    `
  }
];

// Generate each product SVG
products.forEach(p => {
  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="prodBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </radialGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.07" />
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="300" rx="16" fill="url(#prodBg)" />
  
  <!-- Subtle Brand Watermark -->
  <text x="200" y="170" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="900" fill="#0F172A" opacity="0.03" text-anchor="middle">${p.brand}</text>

  <!-- Product Illustration -->
  <g filter="url(#cardShadow)">
    ${p.draw}
  </g>

  <!-- Product Bottom Quality & Spec Bar -->
  <g transform="translate(16, 256)">
    <rect width="368" height="30" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
    <rect x="8" y="5" width="6" height="20" rx="3" fill="${p.brandColor}"/>
    <text x="22" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="${p.brandColor}">${p.brand}</text>
    <text x="358" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#64748B" text-anchor="end">${p.badge}</text>
  </g>
</svg>`;
  saveSvg(path.join(prodDir, `${p.id}.svg`), fullSvg);
});

console.log(`Generated all ${products.length} dedicated Product SVGs.`);
