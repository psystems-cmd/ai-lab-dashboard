# ahead® — Design Language

*Source: www.ahead-nutrition.com, scraped and live CSS-inspected via Playwright, April 2026.*

---

## Logo

- **Wordmark:** `ahead®` — lowercase with registered trademark symbol
- **Primary logo file:** `ahead_Logo_Yellow_RGB_WEB.svg`
- **Colour:** Yellow on transparent background (web use)
- The logo appears in two instances in the nav (likely desktop and mobile variants loaded simultaneously), both pointing to the same SVG at ~160px wide render size

The all-lowercase "ahead" with the ® attached suggests confidence without aggression — friendly, but legally protected.

---

## Colour Palette

The brand pairs **purple** (dominant UI colour) with **yellow** (logo + CTA accent). This is an unusual, bold combination for a food brand — it reads confident and playful rather than clinical or outdoorsy.

### Core palette

| Role | Hex | RGB | Usage |
|---|---|---|---|
| **Purple — primary** | `#8345BA` | rgb(131, 69, 186) | CTA button backgrounds, primary UI elements |
| **Purple — text** | `#592B8A` | rgb(89, 43, 138) | Body text, headers, links, borders |
| **Purple — active/accent** | `#763AC7` | rgb(118, 58, 199) | Active states, free shipping bar, cart icon text |
| **Yellow — brand/logo** | `#FFEE1D` | rgb(255, 238, 29) | Logo, CTA button text on purple, highlight accent |
| **Background — cream** | `#FFFAF1` | rgb(255, 250, 241) | Page background (warm off-white, not clinical white) |
| **Pink — secondary** | `#F4C3D7` | rgb(244,195,215) | Secondary accent (used in the dashboard, softer UI moments) |

### Functional / UI colours

| Role | Hex | Usage |
|---|---|---|
| **Sale badge green** | `#008540` | "% off" badges, sale indicators |
| **Sale price red** | `#A8053C` | Highlighted sale prices |
| **Rating star amber** | `#F49A13` | Star ratings (REVIEWS.io component) |
| **Badge blue** | `#0047C7` | Custom product badge type 1 |
| **Near-black** | `#1D1D1D` | Secondary badge backgrounds |
| **Inactive light blue** | `#9ADCF7` | Inactive/off states |
| **White** | `#FFFFFF` | Surfaces, cards |

### Free shipping bar gradient
`linear-gradient(90deg, #FFA723 → #A5FF33)` — orange to lime green, filling as cart total grows. Playful, energetic — distinctly not a standard progress bar.

### Colour character
- Purple as the dominant colour is a deliberate break from the beige/green/blue conventions of the health food category
- The yellow+purple combination has high contrast and shelf-pop energy
- The cream background (`#FFFAF1`) avoids clinical white — warmer, more indulgent-feeling

---

## Typography

Extracted from live CSS (`--gsc-*` variables).

### Typefaces

| Role | Font | Weight |
|---|---|---|
| **Headings** | `Zufo-Bold` (custom), fallback `sans-serif` | 400 (the Bold is baked into the font name) |
| **Body / UI / Menus / Buttons** | `Red Hat Display` / `Red Hat Text`, fallback `sans-serif` | 400–700 |

**Zufo-Bold** is a custom typeface — not a Google Font, likely licensed or bespoke. It is used exclusively for headings and display text. The name suggests a bold geometric or display cut.

**Red Hat** is the Red Hat Display/Text family by Google Fonts — a clean, humanist sans-serif used across all body and interface text.

### Type scale (from CSS custom properties)

The site uses a rem-based scale. Key sizes:

| Label | Size |
|---|---|
| Display 1 | `clamp(5.2rem, 8.929vw, 11.2rem)` — fluid |
| Display 2 | `clamp(4.8rem, 7.143vw, 9.6rem)` — fluid |
| Heading 1 | `3.6rem` |
| Heading 2 | `3.2rem` |
| Heading 3 | `2.8rem` |
| Body M | `1.44rem` (0.9 scale × 1.6rem base) |
| Body S | `1.26rem` (0.9 scale × 1.4rem base) |
| Buttons | `1.4rem` |

Heading line-height: **90%** (tight, impactful — common in bold display typography).
Body line-height: **1.5–1.625** (comfortable reading).

---

## Site Structure & Navigation

### Navigation hierarchy (from site map)
```
Highlights
├── Bundle-Builder (up to 20% saving)
└── Seasonal Picks (e.g. Frühlings-Picks)

Produkte
├── Low Sugar Snacks
│   ├── Schokoriegel, Fruchtgummies, Cream-Filled Wafer Bars
│   ├── Proteinriegel, Nussriegel, Nut Butter Cups
│   ├── Soft Cookies, Double Cookies, Flips
│   └── Alle Low Sugar Snacks
├── Aufstriche & Toppings
│   ├── Nuss Cremes, Fruchtaufstrich, Chunks, Saucen, Flavour Powder
├── Drinks & Shakes
│   ├── Zero Sugar Sirup, Whey Protein, Clear Whey, Vegan Protein
│   ├── Kakao Drink, Matcha Whey, Coffee Whey
└── Weitere Produkte
    └── Vegan, Cereals, Zuckerersatz, Merch, Gutschein, Jelly

Mehr Entdecken
├── Unsere Mission
├── Insider Club
├── 10€ für dich (referral programme)
├── FAQ
└── B2B
```

### Sticky cart (slide-out drawer)
- Shows upsell items immediately below empty cart state
- Cart tracks free shipping/gift milestones: €49 (free shipping, normally €4.90), €79 (free nut cream), €99 (free chunks)
- 60-Tägige Geschmacksgarantie (60-day taste guarantee) visible in cart

---

## Photography & Visual Style

### Homepage hero
- Full-bleed product photography
- Current hero (April 2026): "das Comeback! Peanut Butter Jelly" — product-forward with minimal props
- Desktop and mobile crops served separately (separate image files for each)

### Collection images
High-quality category thumbnails used across the site:
- `Fruchtgummies.jpg`
- `Riegel.jpg`
- `Nuss_Cremes.jpg`
- `Flips.jpg`
- `Nut_Butter_Cups.jpg`
- `Soft_Cookies.jpg`
- `Syrups.jpg`
- `Proteinpulver.jpg`
- `Chunks.jpg`
- `Fruchtaufstriche.jpg`
- `Low_Sugar_Suacen.jpg`
- `Cereals.jpg`
- `Kakao_Drink.jpg`

Pattern: clean white/light backgrounds OR stylised lifestyle shots. Product always prominent.

### About page imagery
- Founders photo: `Johnny_Phil.png` — personal, humanising
- Product spread: `Snacks_e565b257.png` — abundance shot
- Team photo: `ahead_crew_1.jpg` — culture and scale signal
- Timeline photography — one image per era, photographic not illustrated

### Illustration use
- `flower.svg` — decorative element on "Unique Snacking Points" section
- `sugar_free.png` — icon
- Product category icons used throughout (consistent icon set for each USP)
- `ahead-globe.svg` — used for the "goes global" future chapter

---

## Product Packaging Language

From product listing copy patterns:

- Comparison claims are always against "comparable" products: "90% weniger Zucker¹" — the ¹ footnote signals regulatory compliance (EU food claim rules)
- Weights and serving sizes always stated: `500g / 30g Portion`, `6x50g Tüten`
- Product names mix languages: German category names + English/descriptive flavour names (e.g. "Peanut Butter Jelly", "Coconut Dream", "Iced Matcha Latte")

---

## UI & Commerce Patterns

### Trust signals (visible in cart + product pages)
- **60-Tägige Geschmacksgarantie** — prominently placed, not buried
- **Gratis Versand ab €49** — always visible in cart drawer
- **REVIEWS.io integration** — 4.79 stars from 30,205 reviews, shown on about page
- **"Verified Customer"** badges on individual reviews

### Urgency / scarcity signals
- "NEU" badge on new products
- "Wir haben zu viel produziert – daher bekommst du das Produkt für kurze Zeit günstiger!" — overstock sale framing (authentic-sounding, not aggressive)
- Seasonal collections ("Frühlings-Picks") create temporal urgency

### Localisation
- Site supports: Deutsch, Nederlands, Français
- Currency: EUR (CHF for Switzerland)
- Product availability flagged: `de_only` image tags indicate German-market-only SKUs
- B2B portal separate at `b2b-ahead-nutrition.com`

### Social
- Instagram: @ahead_nutrition (primary social channel)
- Facebook: aheadDE
- TikTok: @ahead_nutrition
- Instagram feed embedded on about page — shows launch teasers, events, community content

### Payment methods
American Express, Apple Pay, Bancontact, EPS, Google Pay, Maestro, Mastercard, PayPal, TWINT, UnionPay, Visa

---

## Design Principles (inferred)

1. **Product is the hero** — photography is clear, uncluttered, the product fills the frame
2. **Yellow as anchor** — the brand colour appears in the logo and recurs as an accent throughout
3. **Data-driven trust** — numbers (reviews, protein grams, % less sugar) are always visible
4. **Warmth over clinical** — founders' faces, team photos, and informal copy humanise the brand
5. **Seasonal cadence** — "Highlights" navigation slot is updated seasonally (Frühlings-Picks, etc.) suggesting regular visual refreshes
6. **Mobile-first thinking** — separate mobile hero images, slide-out cart, Shopify-native UX patterns

---

## Platform

- **E-commerce:** Shopify (Shopify CDN observed at `cdn.shopify.com`, storefront payment icons from `shopifycloud`)
- **Reviews:** REVIEWS.io
- **Support:** Gorgias (help center at `ahead-help-center.gorgias.help`)
- **Tracking:** Gokarla for parcel tracking (`app.gokarla.io/track/ahead`)
