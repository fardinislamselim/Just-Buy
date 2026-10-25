const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  path.join(__dirname, '../public/images/banners'),
  path.join(__dirname, '../public/images/categories'),
  path.join(__dirname, '../public/images/products'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Generate logo-white.svg
try {
  const logoPath = path.join(__dirname, '../public/logo.svg');
  if (fs.existsSync(logoPath)) {
    let logoSvg = fs.readFileSync(logoPath, 'utf8');
    logoSvg = logoSvg.replace(/fill="#[A-Fa-f0-9]{6}"/g, 'fill="#FFFFFF"');
    fs.writeFileSync(path.join(__dirname, '../public/logo-white.svg'), logoSvg);
    console.log('Created logo-white.svg');
  }
} catch (e) {
  console.error('Error generating logo-white.svg', e);
}

// 2. Helper to write SVG file
function writeSvg(filePath, svgContent) {
  fs.writeFileSync(filePath, svgContent.trim());
}

// 3. Category SVGs
const categories = {
  'category-woman.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Woman Fashion Figure -->
    <circle cx="100" cy="45" r="16" fill="#F4A261"/>
    <!-- Wide Brim Hat -->
    <ellipse cx="100" cy="38" rx="28" ry="8" fill="#E76F51"/>
    <!-- Red Dress -->
    <path d="M88 64 C88 64 80 110 65 140 L135 140 C120 110 112 64 112 64 Z" fill="#E63946"/>
    <!-- Slender Legs -->
    <path d="M92 140 L90 175 M108 140 L110 175" stroke="#DDA15E" stroke-width="4" stroke-linecap="round"/>
    <!-- Heels -->
    <path d="M86 175 L92 175 L90 180 M114 175 L108 175 L110 180" stroke="#E63946" stroke-width="3" stroke-linecap="round"/>
    <!-- Shopping Bags -->
    <rect x="52" y="105" width="22" height="28" rx="3" fill="#FF5A0A"/>
    <path d="M57 105 C57 97 69 97 69 105" stroke="#FFA915" stroke-width="2.5" fill="none"/>
    <rect x="126" y="98" width="24" height="30" rx="3" fill="#FFA915"/>
    <path d="M132 98 C132 89 144 89 144 98" stroke="#FF5A0A" stroke-width="2.5" fill="none"/>
  </svg>`,

  'category-man.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Two Stylish Men Silhouettes -->
    <!-- Man 1 -->
    <circle cx="80" cy="50" r="14" fill="#3D405B"/>
    <path d="M68 68 L92 68 L90 120 L70 120 Z" fill="#1D3557"/>
    <path d="M72 120 L72 175 M88 120 L88 175" stroke="#3D405B" stroke-width="5" stroke-linecap="round"/>
    <!-- Man 2 -->
    <circle cx="120" cy="46" r="14" fill="#6C757D"/>
    <path d="M108 64 L132 64 L130 115 L110 115 Z" fill="#457B9D"/>
    <path d="M112 115 L112 175 M128 115 L128 175" stroke="#2B2D42" stroke-width="5" stroke-linecap="round"/>
  </svg>`,

  'category-electronics.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- PC Monitor Screen -->
    <rect x="50" y="45" width="100" height="68" rx="6" fill="#1E293B"/>
    <rect x="56" y="51" width="88" height="56" rx="3" fill="#38BDF8"/>
    <!-- Stand -->
    <rect x="94" y="113" width="12" height="18" fill="#64748B"/>
    <rect x="80" y="131" width="40" height="6" rx="3" fill="#475569"/>
    <!-- Keyboard & Mouse -->
    <rect x="45" y="145" width="80" height="12" rx="3" fill="#334155"/>
    <ellipse cx="145" cy="151" rx="8" ry="12" fill="#0EA5E9"/>
    <!-- Speaker Tower -->
    <rect x="156" y="60" width="22" height="70" rx="4" fill="#0F172A"/>
    <circle cx="167" cy="80" r="6" fill="#38BDF8"/>
    <circle cx="167" cy="110" r="7" fill="#38BDF8"/>
  </svg>`,

  'category-sports.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- American Football -->
    <ellipse cx="85" cy="115" rx="38" ry="24" transform="rotate(-25 85 115)" fill="#B45309"/>
    <path d="M60 125 L110 102 M75 110 L78 116 M85 106 L88 112 M95 101 L98 107" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    <!-- Basketball -->
    <circle cx="132" cy="100" r="28" fill="#EA580C"/>
    <path d="M104 100 H160 M132 72 V128 M112 80 C125 92 125 108 112 120 M152 80 C139 92 139 108 152 120" stroke="#000000" stroke-width="2" stroke-opacity="0.4" fill="none"/>
    <!-- Tennis/Cricket Ball -->
    <circle cx="145" cy="148" r="14" fill="#84CC16"/>
    <path d="M136 140 C146 142 146 154 136 156" stroke="#FFFFFF" stroke-width="2" fill="none"/>
  </svg>`,

  'category-toys.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Open Toy Box -->
    <path d="M45 105 L100 85 L155 105 L155 160 L100 175 L45 160 Z" fill="#D97706"/>
    <path d="M45 105 L100 120 L155 105" stroke="#B45309" stroke-width="2" fill="none"/>
    <path d="M100 120 L100 175" stroke="#B45309" stroke-width="2"/>
    <!-- Teddy Bear Head -->
    <circle cx="100" cy="72" r="20" fill="#92400E"/>
    <circle cx="84" cy="58" r="8" fill="#78350F"/>
    <circle cx="116" cy="58" r="8" fill="#78350F"/>
    <ellipse cx="100" cy="77" rx="9" ry="6" fill="#FDE68A"/>
    <circle cx="100" cy="74" r="3" fill="#18181B"/>
    <circle cx="93" cy="68" r="2.5" fill="#18181B"/>
    <circle cx="107" cy="68" r="2.5" fill="#18181B"/>
    <!-- Colorful Balls / Blocks -->
    <circle cx="70" cy="95" r="12" fill="#EF4444"/>
    <circle cx="130" cy="95" r="11" fill="#3B82F6"/>
    <rect x="110" y="86" width="16" height="16" rx="2" fill="#10B981" transform="rotate(15 110 86)"/>
  </svg>`,

  'category-home.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Cozy Armchair -->
    <rect x="65" y="90" width="70" height="55" rx="12" fill="#0D9488"/>
    <rect x="52" y="105" width="16" height="40" rx="8" fill="#14B8A6"/>
    <rect x="132" y="105" width="16" height="40" rx="8" fill="#14B8A6"/>
    <!-- Cushion -->
    <rect x="74" y="112" width="52" height="30" rx="6" fill="#CCFBF1"/>
    <!-- Wooden Legs -->
    <path d="M68 145 L62 170 M132 145 L138 170" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
    <!-- Floor Lamp -->
    <path d="M155 60 L145 90 H165 Z" fill="#F59E0B"/>
    <line x1="155" y1="90" x2="155" y2="168" stroke="#475569" stroke-width="3"/>
    <ellipse cx="155" cy="168" rx="12" ry="3" fill="#334155"/>
  </svg>`,

  'category-medicine.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- First Aid Box -->
    <rect x="55" y="80" width="90" height="75" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="85" y="65" width="30" height="16" rx="4" stroke="#DC2626" stroke-width="4" fill="none"/>
    <!-- Red Cross -->
    <rect x="94" y="98" width="12" height="40" rx="3" fill="#DC2626"/>
    <rect x="80" y="112" width="40" height="12" rx="3" fill="#DC2626"/>
  </svg>`,

  'category-groceries.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Paper Bag -->
    <path d="M65 80 L135 80 L128 165 H72 Z" fill="#D97706"/>
    <!-- Bag Handle -->
    <path d="M85 80 C85 62 115 62 115 80" stroke="#B45309" stroke-width="4" fill="none"/>
    <!-- Baguette & Greens Peeking out -->
    <path d="M78 85 L72 45 C72 40 85 40 85 45 L86 85" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
    <circle cx="112" cy="72" r="16" fill="#16A34A"/>
    <circle cx="125" cy="78" r="12" fill="#EF4444"/>
    <circle cx="98" cy="78" r="10" fill="#EA580C"/>
  </svg>`,

  'category-beauty.svg': `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="12" fill="#F5F6F8"/>
    <!-- Perfume Bottle -->
    <rect x="75" y="90" width="50" height="65" rx="8" fill="#F472B6" fill-opacity="0.2" stroke="#EC4899" stroke-width="3"/>
    <rect x="88" y="70" width="24" height="20" fill="#FBBF24"/>
    <circle cx="100" cy="58" r="10" fill="#EC4899"/>
    <rect x="90" y="110" width="20" height="25" rx="2" fill="#EC4899" fill-opacity="0.3"/>
  </svg>`
};

Object.entries(categories).forEach(([name, content]) => {
  writeSvg(path.join(__dirname, '../public/images/categories', name), content);
});
console.log('Created category SVGs');

// 4. Products SVGs
const products = {
  'the-north-coat.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Winter Puffer Coat (Pinkish Red like reference) -->
    <!-- Hood -->
    <path d="M110 80 C110 50 190 50 190 80 C190 95 180 105 150 105 C120 105 110 95 110 80 Z" fill="#E11D48"/>
    <!-- Fur trim / inner -->
    <path d="M125 78 C125 65 175 65 175 78 C175 90 125 90 125 78 Z" fill="#BE123C"/>
    <!-- Torso -->
    <path d="M95 95 L205 95 L220 230 L80 230 Z" fill="#F43F5E" rx="10"/>
    <!-- Sleeves -->
    <path d="M95 95 L55 190 L85 195 L110 120 Z" fill="#E11D48"/>
    <path d="M205 95 L245 190 L215 195 L190 120 Z" fill="#E11D48"/>
    <!-- Horizontal Puffer Quilting Lines -->
    <line x1="88" y1="130" x2="212" y2="130" stroke="#BE123C" stroke-width="3" stroke-linecap="round"/>
    <line x1="84" y1="165" x2="216" y2="165" stroke="#BE123C" stroke-width="3" stroke-linecap="round"/>
    <line x1="82" y1="200" x2="218" y2="200" stroke="#BE123C" stroke-width="3" stroke-linecap="round"/>
    <!-- Center Zip -->
    <line x1="150" y1="95" x2="150" y2="230" stroke="#9F1239" stroke-width="3"/>
    <circle cx="150" cy="115" r="4" fill="#FDE047"/>
    <!-- Pockets -->
    <rect x="98" y="175" width="30" height="28" rx="4" fill="#BE123C"/>
    <rect x="172" y="175" width="30" height="28" rx="4" fill="#BE123C"/>
  </svg>`,

  'gucci-duffle-bag.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Luxury Duffle Bag (Brown patterned barrel bag) -->
    <!-- Handles -->
    <path d="M110 130 C110 70 145 70 145 130" stroke="#451A03" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M155 130 C155 70 190 70 190 130" stroke="#451A03" stroke-width="10" stroke-linecap="round" fill="none"/>
    <!-- Main Body -->
    <rect x="50" y="125" width="200" height="105" rx="20" fill="#A16207"/>
    <!-- Signature Monogram/Pattern Texture -->
    <pattern id="gucci-pat" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="3" fill="#78350F"/>
    </pattern>
    <rect x="50" y="125" width="200" height="105" rx="20" fill="url(#gucci-pat)" fill-opacity="0.3"/>
    <!-- Iconic Center Stripe (Green-Red-Green) -->
    <rect x="135" y="125" width="30" height="105" fill="#15803D"/>
    <rect x="144" y="125" width="12" height="105" fill="#DC2626"/>
    <!-- Leather Corner Trims -->
    <path d="M50 150 C50 130 65 125 80 125 L80 230 C65 230 50 225 50 205 Z" fill="#451A03"/>
    <path d="M250 150 C250 130 235 125 220 125 L220 230 C235 230 250 225 250 205 Z" fill="#451A03"/>
    <!-- Metal Gold Rivets -->
    <circle cx="108" cy="142" r="5" fill="#FBBF24"/>
    <circle cx="192" cy="142" r="5" fill="#FBBF24"/>
  </svg>`,

  'rgb-liquid-cpu-cooler.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Radiator Box -->
    <rect x="40" y="100" width="160" height="90" rx="8" fill="#18181B" stroke="#27272A" stroke-width="3"/>
    <!-- Fan 1 (RGB Ring) -->
    <circle cx="85" cy="145" r="34" stroke="url(#rgb1)" stroke-width="7" fill="#09090B"/>
    <circle cx="85" cy="145" r="14" fill="#27272A"/>
    <!-- Fan 2 (RGB Ring) -->
    <circle cx="155" cy="145" r="34" stroke="url(#rgb2)" stroke-width="7" fill="#09090B"/>
    <circle cx="155" cy="145" r="14" fill="#27272A"/>
    <!-- Sleeved Cooling Tubes -->
    <path d="M195 125 C230 125 240 160 225 185" stroke="#3F3F46" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M195 145 C245 145 255 180 235 200" stroke="#27272A" stroke-width="10" stroke-linecap="round" fill="none"/>
    <!-- CPU Pump Block with Mirror RGB -->
    <circle cx="230" cy="190" r="28" fill="#18181B" stroke="#06B6D4" stroke-width="4"/>
    <circle cx="230" cy="190" r="18" fill="#0E7490"/>
    <defs>
      <linearGradient id="rgb1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#EC4899"/>
        <stop offset="50%" stop-color="#8B5CF6"/>
        <stop offset="100%" stop-color="#06B6D4"/>
      </linearGradient>
      <linearGradient id="rgb2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#06B6D4"/>
        <stop offset="50%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>`,

  'small-bookshelf.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Mid-century Wood Small Bookshelf / Side Table -->
    <!-- Angled Legs -->
    <path d="M95 190 L75 250 M195 190 L215 250 M110 190 L95 245 M180 190 L195 245" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
    <!-- Main Box Cabinet -->
    <rect x="85" y="85" width="130" height="115" rx="8" fill="#D97706" stroke="#B45309" stroke-width="4"/>
    <!-- Shelf Divider -->
    <rect x="85" y="138" width="130" height="6" fill="#B45309"/>
    <!-- Books on Shelf -->
    <rect x="98" y="144" width="12" height="45" rx="2" fill="#2563EB"/>
    <rect x="112" y="148" width="14" height="41" rx="2" fill="#DC2626"/>
    <rect x="128" y="142" width="10" height="47" rx="2" fill="#16A34A"/>
    <rect x="140" y="152" width="15" height="37" rx="2" fill="#9333EA" transform="rotate(12 140 152)"/>
    <!-- Plant / Decor on top -->
    <rect x="135" y="65" width="22" height="20" rx="3" fill="#E2E8F0"/>
    <circle cx="146" cy="55" r="10" fill="#15803D"/>
  </svg>`,

  'breed-dry-dog-food.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Dog Food Bag (Purple/Gold Cesar style) -->
    <path d="M85 70 L215 70 L225 240 L75 240 Z" fill="#4C1D95" rx="8"/>
    <path d="M85 70 L150 85 L215 70" stroke="#FBBF24" stroke-width="4" fill="none"/>
    <!-- Golden Crown / Brand Banner -->
    <rect x="105" y="95" width="90" height="30" rx="5" fill="#FBBF24"/>
    <text x="150" y="116" font-family="sans-serif" font-weight="900" font-size="16" fill="#4C1D95" text-anchor="middle">Cesar</text>
    <!-- Westie Dog Face Silhouette -->
    <circle cx="150" cy="155" r="28" fill="#FFFFFF"/>
    <circle cx="140" cy="150" r="3" fill="#000000"/>
    <circle cx="160" cy="150" r="3" fill="#000000"/>
    <ellipse cx="150" cy="162" rx="5" ry="4" fill="#000000"/>
    <!-- Food Bowl / Kibble -->
    <ellipse cx="150" cy="210" rx="40" ry="14" fill="#EA580C"/>
    <circle cx="138" cy="208" r="4" fill="#78350F"/>
    <circle cx="150" cy="206" r="4" fill="#78350F"/>
    <circle cx="162" cy="208" r="4" fill="#78350F"/>
  </svg>`,

  'canon-eos-dslr-camera.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- DSLR Camera Body (Canon EOS style) -->
    <!-- Viewfinder hump -->
    <path d="M120 100 L135 78 L165 78 L180 100 Z" fill="#18181B"/>
    <rect x="135" y="80" width="30" height="5" fill="#E11D48"/>
    <!-- Main Body -->
    <rect x="70" y="95" width="160" height="110" rx="14" fill="#27272A" stroke="#18181B" stroke-width="4"/>
    <!-- Grip -->
    <rect x="70" y="95" width="40" height="110" rx="12" fill="#18181B"/>
    <!-- Shutter Button / Dial -->
    <rect x="80" y="87" width="18" height="8" rx="2" fill="#71717A"/>
    <rect x="195" y="87" width="22" height="8" rx="2" fill="#52525B"/>
    <!-- Huge Circular Lens -->
    <circle cx="160" cy="150" r="48" fill="#18181B" stroke="#3F3F46" stroke-width="8"/>
    <circle cx="160" cy="150" r="36" fill="#09090B" stroke="#0284C7" stroke-width="4"/>
    <circle cx="160" cy="150" r="22" fill="#0369A1"/>
    <!-- Lens Light Reflection -->
    <ellipse cx="150" cy="140" rx="10" ry="6" transform="rotate(-30 150 140)" fill="#38BDF8" fill-opacity="0.6"/>
  </svg>`,

  'asus-fhd-gaming-laptop.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Open Gaming Laptop (3D angled like screenshot) -->
    <!-- Display Screen -->
    <polygon points="70,140 180,60 250,90 140,170" fill="#09090B" stroke="#1E293B" stroke-width="3"/>
    <polygon points="78,137 178,65 242,93 142,165" fill="#0284C7"/>
    <!-- Futuristic Screen Graphic -->
    <line x1="100" y1="120" x2="220" y2="85" stroke="#F43F5E" stroke-width="4"/>
    <circle cx="160" cy="105" r="15" fill="#FBBF24" fill-opacity="0.6"/>
    <!-- Base / Keyboard Deck -->
    <polygon points="70,140 140,170 230,215 160,185" fill="#18181B"/>
    <polygon points="140,170 230,215 150,240 60,195" fill="#27272A" stroke="#0F172A" stroke-width="2"/>
    <!-- RGB Keyboard Glow -->
    <polygon points="120,175 190,205 150,220 80,190" fill="#EC4899" fill-opacity="0.8"/>
    <polygon points="110,218 135,230 120,235 95,223" fill="#38BDF8"/>
  </svg>`,

  'curology-product-set.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Skincare Bottle Set on Wooden Stand -->
    <!-- Wooden Stand -->
    <rect x="55" y="195" width="190" height="35" rx="6" fill="#D97706" stroke="#B45309" stroke-width="3"/>
    <!-- Tall Purple Cleanser Tube -->
    <rect x="80" y="90" width="34" height="110" rx="6" fill="#4338CA"/>
    <rect x="85" y="190" width="24" height="10" fill="#FFFFFF"/>
    <text x="97" y="150" font-family="sans-serif" font-size="8" fill="#A5B4FC" text-anchor="middle" transform="rotate(-90 97 150)">CLEANSER</text>
    <!-- White Moisturizer Bottle with Pump -->
    <rect x="128" y="105" width="44" height="95" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="144" y="90" width="12" height="15" fill="#CBD5E1"/>
    <path d="M142 90 H164 L160 84 H142 Z" fill="#94A3B8"/>
    <text x="150" y="155" font-family="sans-serif" font-weight="bold" font-size="9" fill="#4338CA" text-anchor="middle">curology</text>
    <!-- Dark Blue Custom Bottle -->
    <rect x="186" y="95" width="34" height="105" rx="6" fill="#1E1B4B"/>
    <rect x="191" y="85" width="24" height="10" fill="#FFFFFF"/>
  </svg>`,

  'kids-electric-car.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Red Miniature Sports Car (Mercedes style) -->
    <!-- Wheels -->
    <circle cx="95" cy="210" r="26" fill="#18181B" stroke="#71717A" stroke-width="6"/>
    <circle cx="215" cy="210" r="26" fill="#18181B" stroke="#71717A" stroke-width="6"/>
    <circle cx="95" cy="210" r="10" fill="#E2E8F0"/>
    <circle cx="215" cy="210" r="10" fill="#E2E8F0"/>
    <!-- Car Body -->
    <path d="M60 180 C60 170 70 160 90 155 L125 150 L140 120 L195 120 L210 150 L245 155 C255 160 260 170 260 185 L260 205 L60 205 Z" fill="#DC2626"/>
    <!-- Windshield -->
    <polygon points="135,150 145,125 190,125 198,150" fill="#38BDF8" fill-opacity="0.7"/>
    <!-- Steering Wheel -->
    <ellipse cx="170" cy="138" rx="8" ry="12" fill="#09090B"/>
    <!-- Headlights -->
    <polygon points="62,175 75,170 75,185 62,185" fill="#FEF08A"/>
    <!-- Grille & Badge -->
    <rect x="60" y="185" width="12" height="15" fill="#18181B"/>
    <circle cx="66" cy="192" r="3" fill="#E2E8F0"/>
  </svg>`,

  'jr-zoom-soccer-cleats.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Pair of Neon Yellow / Black Soccer Cleats -->
    <!-- Shoe 1 (Side View) -->
    <path d="M65 140 C80 130 110 125 140 135 L190 138 C220 140 240 155 245 168 C245 178 220 185 190 185 L75 185 C65 180 60 160 65 140 Z" fill="#EAB308"/>
    <!-- Black Swoosh / Accents -->
    <path d="M110 148 C140 145 175 160 205 160 C180 168 150 165 125 158 Z" fill="#09090B"/>
    <!-- Red Heel Counter -->
    <path d="M65 140 C60 160 65 180 75 185 L85 185 C80 170 75 155 75 140 Z" fill="#EF4444"/>
    <!-- Cleat Studs -->
    <rect x="85" y="185" width="8" height="8" rx="2" fill="#18181B"/>
    <rect x="110" y="185" width="8" height="8" rx="2" fill="#18181B"/>
    <rect x="180" y="185" width="8" height="8" rx="2" fill="#18181B"/>
    <rect x="210" y="185" width="8" height="8" rx="2" fill="#18181B"/>
    <!-- Shoe 2 (Sole View bottom) -->
    <ellipse cx="150" cy="225" rx="75" ry="20" fill="#CA8A04"/>
    <ellipse cx="150" cy="225" rx="65" ry="14" fill="#09090B"/>
    <circle cx="105" cy="225" r="4" fill="#EAB308"/>
    <circle cx="120" cy="220" r="4" fill="#EAB308"/>
    <circle cx="120" cy="230" r="4" fill="#EAB308"/>
    <circle cx="180" cy="220" r="4" fill="#EAB308"/>
    <circle cx="180" cy="230" r="4" fill="#EAB308"/>
    <circle cx="200" cy="225" r="4" fill="#EAB308"/>
  </svg>`,

  'gp11-shooter-usb-gamepad.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Black Gaming Controller (GP11 Gamepad) -->
    <!-- Handles and Body -->
    <path d="M80 185 C70 215 85 240 105 235 C125 230 135 185 150 185 C165 185 175 230 195 235 C215 240 230 215 220 185 C225 150 205 120 180 120 L120 120 C95 120 75 150 80 185 Z" fill="#18181B" stroke="#27272A" stroke-width="4"/>
    <!-- Red Trim Glow -->
    <path d="M98 160 C95 190 102 215 110 220" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
    <path d="M202 160 C205 190 198 215 190 220" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
    <!-- D-pad (Left) -->
    <rect x="105" y="145" width="10" height="26" rx="2" fill="#3F3F46"/>
    <rect x="97" y="153" width="26" height="10" rx="2" fill="#3F3F46"/>
    <!-- Thumbsticks -->
    <circle cx="130" cy="180" r="14" fill="#09090B" stroke="#52525B" stroke-width="3"/>
    <circle cx="170" cy="180" r="14" fill="#09090B" stroke="#52525B" stroke-width="3"/>
    <!-- Action Buttons (Right XYAB) -->
    <circle cx="195" cy="142" r="5" fill="#3B82F6"/>
    <circle cx="207" cy="154" r="5" fill="#EF4444"/>
    <circle cx="183" cy="154" r="5" fill="#10B981"/>
    <circle cx="195" cy="166" r="5" fill="#F59E0B"/>
    <!-- Center Guide Button -->
    <circle cx="150" cy="145" r="8" fill="#EF4444"/>
  </svg>`,

  'quilted-satin-jacket.png': `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="#F5F6F8"/>
    <!-- Olive Green Quilted Satin Bomber Jacket -->
    <!-- Ribbed Collar -->
    <path d="M120 85 C120 75 180 75 180 85 C170 95 130 95 120 85 Z" fill="#14532D"/>
    <!-- Body -->
    <path d="M100 95 L200 95 L215 220 L85 220 Z" fill="#166534" rx="8"/>
    <!-- Diamond Quilting Stitch Pattern -->
    <line x1="100" y1="120" x2="200" y2="180" stroke="#14532D" stroke-width="2"/>
    <line x1="100" y1="150" x2="180" y2="210" stroke="#14532D" stroke-width="2"/>
    <line x1="200" y1="120" x2="100" y2="180" stroke="#14532D" stroke-width="2"/>
    <line x1="200" y1="150" x2="120" y2="210" stroke="#14532D" stroke-width="2"/>
    <!-- Sleeves -->
    <path d="M100 95 L60 185 L90 190 L115 120 Z" fill="#15803D"/>
    <path d="M200 95 L240 185 L210 190 L185 120 Z" fill="#15803D"/>
    <!-- Ribbed Cuffs and Hem -->
    <rect x="58" y="185" width="32" height="10" rx="3" fill="#14532D"/>
    <rect x="210" y="185" width="32" height="10" rx="3" fill="#14532D"/>
    <rect x="85" y="215" width="130" height="12" rx="3" fill="#14532D"/>
    <!-- Center Metal Zipper -->
    <line x1="150" y1="92" x2="150" y2="215" stroke="#FBBF24" stroke-width="3"/>
    <circle cx="150" cy="115" r="4" fill="#FBBF24"/>
  </svg>`
};

Object.entries(products).forEach(([name, content]) => {
  writeSvg(path.join(__dirname, '../public/images/products', name), content);
});
console.log('Created product SVGs');

// 5. Hero Banner Placeholders matching screenshot design
const banners = {
  'hero-banner-1.jpg': `<svg width="1200" height="500" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark Background -->
    <rect width="1200" height="500" fill="#0A0A0A"/>
    <!-- Yellow Circle Accents (Matching Reference Screenshot) -->
    <circle cx="750" cy="90" r="110" fill="#FFA915"/>
    <circle cx="730" cy="70" r="90" fill="#FFC107"/>
    <path d="M850 0 L1200 0 L1200 500 L850 500 C800 350 820 180 850 0 Z" fill="#FBBF24" fill-opacity="0.95"/>
    <circle cx="1060" cy="110" r="50" fill="#0A0A0A"/>
    <circle cx="865" cy="400" r="20" fill="#0A0A0A"/>
    
    <!-- Woman Shopping Silhouette with Bags (Left) -->
    <g transform="translate(360, 50)">
      <!-- Head and hair -->
      <circle cx="95" cy="70" r="28" fill="#FDE047"/>
      <ellipse cx="95" cy="80" rx="36" ry="42" fill="#B45309"/>
      <circle cx="95" cy="75" r="22" fill="#FCD34D"/>
      <!-- Smiling Face sunglasses -->
      <rect x="80" y="70" width="14" height="9" rx="3" fill="#18181B"/>
      <rect x="98" y="70" width="14" height="9" rx="3" fill="#18181B"/>
      <!-- Orange top -->
      <path d="M60 120 L130 120 L150 280 L40 280 Z" fill="#FF5A0A"/>
      <!-- Colorful Shopping Bags Held High -->
      <!-- Red Bag -->
      <rect x="70" y="130" width="60" height="80" rx="5" fill="#EF4444" transform="rotate(-15 70 130)"/>
      <path d="M85 130 C85 105 115 105 115 130" stroke="#FBBF24" stroke-width="5" fill="none" transform="rotate(-15 70 130)"/>
      <!-- Yellow Bag -->
      <rect x="120" y="160" width="55" height="75" rx="5" fill="#FBBF24" transform="rotate(10 120 160)"/>
      <!-- Blue Bag -->
      <rect x="160" y="140" width="65" height="90" rx="5" fill="#0EA5E9" transform="rotate(25 160 140)"/>
      <path d="M180 140 C180 115 210 115 210 140" stroke="#FFFFFF" stroke-width="5" fill="none" transform="rotate(25 160 140)"/>
    </g>

    <!-- SHOP ONLINE Headline -->
    <text x="750" y="115" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" letter-spacing="2">SHOP</text>
    <text x="750" y="165" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" letter-spacing="2">ONLINE</text>

    <!-- 3D Yellow Shopping Cart on Right (matching screenshot) -->
    <g transform="translate(840, 100)">
      <!-- Cart Wire Mesh -->
      <path d="M40 80 L200 40 L230 150 L80 180 Z" fill="none" stroke="#EF4444" stroke-width="6"/>
      <line x1="70" y1="70" x2="110" y2="170" stroke="#EF4444" stroke-width="4"/>
      <line x1="110" y1="60" x2="150" y2="160" stroke="#EF4444" stroke-width="4"/>
      <line x1="150" y1="50" x2="190" y2="150" stroke="#EF4444" stroke-width="4"/>
      <line x1="55" y1="110" x2="215" y2="75" stroke="#EF4444" stroke-width="4"/>
      <line x1="68" y1="145" x2="225" y2="115" stroke="#EF4444" stroke-width="4"/>
      <!-- Cart Chassis & Wheels -->
      <path d="M80 180 L75 220 L190 200 L195 160" stroke="#94A3B8" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="85" cy="225" r="16" fill="#EF4444" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="185" cy="210" r="16" fill="#EF4444" stroke="#FFFFFF" stroke-width="4"/>
    </g>

    <!-- Social Icons at Bottom -->
    <circle cx="680" cy="400" r="15" fill="#27272A"/>
    <circle cx="720" cy="400" r="15" fill="#27272A"/>
    <circle cx="760" cy="400" r="15" fill="#27272A"/>
  </svg>`,

  'hero-banner-2.jpg': `<svg width="1200" height="500" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Vibrant Tech Promotion Banner -->
    <rect width="1200" height="500" fill="#0F172A"/>
    <circle cx="1000" cy="250" r="300" fill="#FF5A0A" fill-opacity="0.2"/>
    <circle cx="200" cy="400" r="200" fill="#0284C7" fill-opacity="0.2"/>
    
    <!-- Text Left -->
    <rect x="80" y="80" width="170" height="36" rx="18" fill="#FF5A0A"/>
    <text x="165" y="104" font-family="sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF" text-anchor="middle">LIMITED TIME OFFER</text>
    
    <text x="80" y="190" font-family="sans-serif" font-weight="900" font-size="64" fill="#FFFFFF">MEGA TECH SALE</text>
    <text x="80" y="240" font-family="sans-serif" font-weight="500" font-size="28" fill="#94A3B8">Up to 40% Off Laptops, Audio & Accessories</text>
    
    <rect x="80" y="290" width="180" height="52" rx="8" fill="#FF5A0A"/>
    <text x="170" y="323" font-family="sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF" text-anchor="middle">Shop Deals Now →</text>
    
    <!-- Tech Visuals Right -->
    <g transform="translate(680, 70)">
      <rect x="80" y="60" width="360" height="230" rx="14" fill="#1E293B" stroke="#38BDF8" stroke-width="4"/>
      <rect x="95" y="75" width="330" height="200" rx="6" fill="#0F172A"/>
      <text x="260" y="180" font-family="sans-serif" font-weight="bold" font-size="32" fill="#38BDF8" text-anchor="middle">GAMING RIGS</text>
      <circle cx="160" cy="330" r="60" fill="#FF5A0A" fill-opacity="0.9"/>
      <circle cx="340" cy="320" r="50" fill="#FFA915"/>
    </g>
  </svg>`
};

Object.entries(banners).forEach(([name, content]) => {
  writeSvg(path.join(__dirname, '../public/images/banners', name), content);
});
console.log('Created banner placeholders');
