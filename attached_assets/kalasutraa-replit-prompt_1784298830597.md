# Replit Build Prompt — Kalasutraa Website Rebuild

Copy everything below into Replit (Agent / Replit AI) as your project brief.

---

## PROJECT OVERVIEW

Build a modern, elegant e-commerce/showcase website for **Kalasutraa**, a brand that sells authentic, handcrafted traditional Indian art — Pattachitra paintings, Warli paintings, Brass & Bell Metal sculptures, Sandstone and Vrindavan stone carvings, Paper Mâché masks, Palm Leaf paintings, Tussar Silk paintings, and wall hangings.

The brand's positioning is **"heritage preservation," not mass retail** — every piece has a story, a named artisan, and a region of origin. The tone should feel like a luxury art gallery / cultural atelier, not a generic online store. Think: warm, museum-quality, editorial, spiritual — not flashy or discount-driven.

Tagline: **"Hands that Craft. Hearts that Care."**
Sanskrit motto to feature somewhere elegant (e.g. footer or story page): **सत्यं शिवं सुन्दरम् — Truth. Goodness. Beauty.**

---

## TECH STACK

- React (Vite) + TypeScript
- Tailwind CSS for styling
- Framer Motion for scroll/entrance animations
- React Router for pages
- Simple JSON/local data files for products, artisans, and collections (so it's easy to swap for a real backend/CMS later)
- Node/Express (or Replit DB) backend only for: contact form submission, product enquiry form submission, and newsletter signup — store submissions and optionally forward via email (use a placeholder function `sendEmail()` that logs to console for now, structured so it can be swapped for Resend/SendGrid later)
- Fully responsive (mobile-first), fast-loading, accessible (proper alt text, semantic HTML, keyboard nav)

---

## VISUAL / BRAND IDENTITY

The old site had almost no defined design system (just a plain black theme color). Use this palette and system instead — it should evoke Indian temple heritage, earthy materials (brass, stone, terracotta, natural pigment) and gallery-level polish:

**Color Palette**
- Background / base: `#FBF7F0` (warm ivory) and `#FFFFFF`
- Primary dark (text, headers, nav): `#231B14` (near-black warm charcoal, not pure black)
- Accent primary (CTAs, highlights): `#B5651D` → deep **terracotta/copper** (`#A8511E` as a slightly richer variant)
- Accent secondary (luxury detail, dividers, icons): `#8A6D3B` **antique brass/gold**
- Deep accent (section backgrounds, footer): `#2E1F14` **espresso brown**
- Supporting neutral: `#E8DFD0` warm sand/beige for cards and section breaks
- Optional devotional accent (used sparingly, e.g. small motifs): `#7A1F2B` deep temple red

**Typography**
- Headings: an elegant serif (e.g. "Playfair Display" or "Cormorant Garamond") — evokes heritage/editorial feel
- Body: a clean humanist sans-serif (e.g. "Inter" or "Work Sans") for readability
- Use generous letter-spacing on small overline labels (e.g. "MASTERS OF CRAFT", "ART ADVISORY") in uppercase, brass/copper color, like the current site's section eyebrows — this pattern worked well, keep it

**Imagery style**
- Full-bleed hero images with soft dark gradient overlay for text legibility
- Product photography on clean neutral backgrounds
- Rounded corners kept subtle (4–8px) — this is a heritage/craft brand, not a playful consumer brand, so avoid overly rounded, bubbly UI
- Use fine gold/brass hairline dividers between sections instead of hard borders

**Motion**
- Subtle fade/slide-up on scroll for sections
- Smooth image zoom-on-hover for product and collection cards
- Sticky header that condenses on scroll

---

## SITE MAP / PAGES TO BUILD

### 1. Home (`/`)
- Hero section: full-width rotating/looping hero image(s), "100% Made in India" badge, headline "Hands that Craft. Hearts that Care.", subheading about centuries of history/skill/devotion
- **Timeless Art Forms** section: grid of 9 category cards (image + title, hover zoom) linking to each collection:
  Warli Painting, Brass & Bell Metal, Paper Mâché Masks, Tussar Silk Painting, Palm Leaf Painting, Pattachitra Painting, Vrindavan Stone Carvings, Sandstone Structures, Wall Hangings
  **Fix the old bug**: make sure every card's label and link match the correct collection (the old site had labels and URLs swapped for several categories — build this from a single source-of-truth data array so it can't drift)
- **Why These Art Forms Exist**: 3-column editorial block — "Art Rooted in Belief," "Carried by Generations," "Why Preservation Matters Today" — plus the Sanskrit motto
- **Client Experiences**: testimonial carousel/grid (3+ testimonials, customer name + city, star rating optional)
- **Personal Guidance / Consultation CTA**: "Find the Piece That Truly Belongs in Your Space" — free 30-min consultation, embed a Calendly-style booking button (placeholder link) + "no obligation to purchase" note
- **Crafted by Hand, Not by Machines**: brass-making process story with image + link to Our Story
- **The Hands Behind the Art**: artisan preview carousel (photo, name, craft + region, 2–3 line bio) linking to full Meet the Artisans page
- **Feature strip**: 3 icons — "Handmade & Inclusive" (200+ crafts, ethically sourced), "Tailored To Your Taste" (bespoke/customization), "Speak With An Expert"
- **Newsletter signup** footer CTA: "Sign up and receive 10% off your first order"
- Footer: address, social links (Instagram, YouTube), payment icons, quick links, copyright

### 2. Our Story (`/our-story`)
- Hero: "EST. 2026 — The Unbroken Thread — Where heritage breathes, and art finds its home"
- "The Origin — It begins in silence" narrative block with founder quote
- "The Craft Story" — India's craft heritage (temples, ateliers, villages)
- "From Earth to Art" 3-step process: Concept → Craft → Creation (with images)
- Animated counters: Artisans / Villages / Years of Heritage
- "The Artisan Voice" section
- Regional deep-dive block (e.g. Odisha handicrafts — Pattachitra, Pipili appliqué, Dhokra, Tarakasi silver filigree)
- "Materials & Process" — natural materials, slow deliberate process
- Philosophy grid: Heritage / Sustainability / Respect / Authenticity
- Closing CTA: "Explore The Collection" → `/shop`

### 3. Meet the Artisans (`/artisans`)
- Hero: "MASTERS OF CRAFT — The Hands of Heritage — Keepers of inherited wisdom"
- Intro: "Guardians of Civilisation" — regions covered (Odisha, Bastar, Rajasthan, Vrindavan)
- Individual artisan profile cards/sections, each with: photo, name, title/award (e.g. "Lifetime Achievement Awardee, 2018"), region tag, bio paragraph, pull-quote in italics
- Include artisans for: Pattachitra (Odisha), Sand stone carving, Brass & Bell Metal (Vrindavan), Wood sculpture (Konark) — build as a reusable card component fed by a data array so more artisans can be added easily
- Closing CTA: "View Their Masterpieces" → `/shop`

### 4. Shop / Collections (`/shop` and `/shop/:collectionSlug`)
- Filter sidebar: by craft type, price range, region
- Sort dropdown: Featured, Best selling, Price low–high/high–low, Newest
- Grid toggle: 2/3/4/5 columns
- Product card: image, title, "Handcrafted • One of a kind" badge where relevant, price (Rs. formatted), quick "Enquire" or "Add to Wishlist" actions, Sold Out state
- Pagination
- Individual collection pages for each of the 9 categories, each with its own hero banner + filtered product grid

### 5. Product Detail (`/shop/product/:slug`)
- Image gallery (thumbnail strip + large image, zoom on hover)
- Title, price ("Price starts from Rs. X"), "Handcrafted • One of a kind • Artisan made" badge
- Description
- Tabs/accordion: Product Description | Shipping & Return policy
- Prominent **"Enquire About This Piece"** CTA (this brand sells via enquiry/consultation, not just instant checkout — keep that model, but also support a normal Add-to-Cart flow if the user wants standard e-commerce checkout too — ask the builder to make this configurable per product via an `enquiryOnly: boolean` flag)
- Enquiry form: name, email, phone, message → submits to backend
- Related/Recently viewed products section

### 6. Book a Consultation (`/consultation`)
- Hero: "ART ADVISORY — Curate Your Legacy — Schedule a private consultation with our curators"
- "Art requires a conversation, not just a transaction" intro
- 3-step process: Discovery → Curation → Acquisition
- Booking widget (Calendly embed or equivalent placeholder)
- FAQ accordion (fee, customization, preparation)

### 7. Contact (`/contact`)
- Hero: "CONCIERGE — Connect With Us"
- Contact info block: address, email, phone (make these editable constants, not hardcoded across files)
- Contact form: name, email, phone (optional), message → submits to backend, shows success/error state
- FAQ accordion (custom commissions, authenticity certificates, lead times)

### 8. Supporting pages
- Cart page (`/cart`) — standard cart UI if instant-checkout is enabled for any products
- Wishlist page (`/wishlist`)
- Account / Login / Register (`/account`) — simple auth UI (can be stubbed for MVP)
- 404 page matching the brand style

---

## KEY CONTENT/DATA TO SEED (use as placeholder/starter data)

**Collections (9):** Pattachitra Painting, Warli Paintings, Brass and Bell Metal, Wall Hangings, Sand Stone Carvings, Vrindavan Carvings, Paper Mâché Masks, Palm Leaf Painting, Tussar Silk Painting

**Sample products** (name, craft type, approx price in INR): Ananda Tandava Nataraja brass sculpture (₹40,000), Auspicious Water Fountain (₹25,000), Bird Finial Brass Hanging Deepa (₹12,000), Circle of Life Warli Fish Motif Painting (₹6,000), Classic Stone Pedestal Bird Feeder (₹15,000), Devi Shakti Heritage Mask paper mâché (₹4,500), Divine Radha Krishna Palm Leaf Art (₹8,000), Divine Wisdom Saraswati sandstone sculpture (₹30,000), Eternal Bhakti Tussar Silk painting, Ethnic Folk Art Pattachitra Painting (₹75,000)

**Sample artisans:** Raghunath Moharana (Pattachitra, Odisha/Raghurajpur), Shri Lakshman Soren (lost-wax metal casting, Eastern India), Ananta Maharana (Pattachitra, Chitrakara community), Shri Govind Das (stone carving, Vrindavan), Shree Banamali Mohapatra (Pattachitra, Lifetime Achievement 2018), Shree Dr. Jagannath Mahapatra (Shilp Guru, Raghurajpur), Shree Raghunath Sahoo (wood sculptor, Konark)

**Testimonials:** Priya S. (Mumbai), Kamiya (New York), Rajendra (Madhya Pradesh) — praising craftsmanship, authenticity certificates, curation guidance

**Contact details:** Gadson House, Sector 19, New Panvel East, Panvel, Maharashtra 410206 | team@kalasutraa.com | +91 8104367313
Social: Instagram @kalasutraa_, YouTube channel

---

## FUNCTIONAL REQUIREMENTS

1. Fully responsive: mobile, tablet, desktop — test nav collapses to a hamburger/drawer menu on mobile
2. Sticky header with logo, nav (Home, Collections dropdown, Our Story, Meet the Artisans, Book a Consultation, Contact), search icon, wishlist icon, cart icon
3. Collections dropdown must correctly map every label to its matching collection page — no mismatched links
4. Working contact form, product enquiry form, and newsletter signup, all posting to a lightweight backend endpoint with validation (required fields, email format) and clear success/error UI feedback
5. FAQ accordions on Contact and Consultation pages
6. Product filtering, sorting, and grid density toggle on shop pages
7. SEO basics: proper page titles, meta descriptions, OpenGraph tags per page (reuse the good pattern from the old site, but populate them accurately per page instead of using generic "Kalasutraa" for every page)
8. Performance: lazy-load images, optimize image sizes, avoid layout shift
9. Accessibility: alt text on all images, sufficient color contrast, focus states on interactive elements, semantic headings hierarchy

---

## THINGS TO IMPROVE VS. THE OLD SITE

- Give every page a distinct, accurate page title/meta description (old site reused generic "Kalasutraa" metadata everywhere)
- Fix mismatched navigation links (collection names pointing to the wrong slugs)
- Replace placeholder `#` links with real working pages
- Add a real, consistent design system (typography scale, spacing scale, color tokens) instead of ad hoc styling
- Make the "Handcrafted • One of a kind" and "Enquire" messaging consistent across all product cards, not just some
- Ensure the site works well without requiring Shopify — clean custom React front end with a simple, swappable backend/data layer

---

Build this as a clean, well-organized project with reusable components (Header, Footer, Hero, ProductCard, ArtisanCard, CollectionCard, Accordion, TestimonialCard, ContactForm, EnquiryForm) and a `/src/data` folder holding the products, collections, artisans, and testimonials as structured JSON/TS so content can be updated without touching component code.
