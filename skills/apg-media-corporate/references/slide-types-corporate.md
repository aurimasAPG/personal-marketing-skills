# APG Media Corporate — Slide Type Specifications

Each slide type defines: purpose, required content, layout, visual treatment, and pptxgenjs implementation.

**Corporate rules applied to ALL slides:**
- Font: Source Sans Pro (ONLY)
- H2: SemiBold 600, Black (#1A1A1A) — NOT Bold Red
- Red accent line (40-60px, 2px) under H2 headings
- Border-radius: 8px (not 12px)
- Margins: 0.7" sides, 0.8" bottom
- Logo: correct variant per background (see assets/)
- Max 30 words body text, max 4 bullets
- `shrinkText: true` on all text boxes

---

## Common Constants

```javascript
const C = {
  red: "EA3E2B", black: "1A1A1A", white: "FFFFFF",
  gray: "6B7280", grayDark: "374151", teal: "325058",
  warmSurface: "F5F0EB", coolSurface: "F3F4F6",
  border: "E5E7EB", redSubtle: "FEF2F2", redSoft: "F6A098",
};
const F = { all: "Source Sans Pro" };
const M = { l: 0.7, r: 0.7, t: 0.7, b: 0.8 };
const CONTENT_W = 10 - M.l - M.r; // 8.6"
```

---

## Type 1 — Title Slide (Red Background)

**Purpose**: First impression. The ONLY red-background slide in the entire presentation.

```
Background: #EA3E2B (full)
┌──────────────────────────────────────────┐
│                    [LOGO inversinis]     │
│                    apgmedia_horiz_balt   │
│                    _color.svg            │
│                                          │
│   PREZENTACIJOS                          │
│   PAVADINIMAS                            │
│   Bold 32-38pt, White, UPPERCASE         │
│   +2pt letter-spacing                    │
│                                          │
│   ────── (balta linija, 60px, 1px)       │
│                                          │
│   Paantraštė | Kliento vardas | Data     │
│   Regular 14pt, White (80%)              │
│                                          │
└──────────────────────────────────────────┘
```

```javascript
const s = pptx.addSlide();
s.background = { color: C.red };

// Logo (inverse for red bg)
s.addImage({
  path: 'assets/apgmedia_horiz_balt_color.svg',
  x: 8.3, y: 0.25, w: 1.2, h: 0.68
});

// Title
s.addText(title.toUpperCase(), {
  x: M.l, y: 1.4, w: CONTENT_W, h: 1.4,
  fontSize: 36, fontFace: F.all, bold: true,
  color: C.white, charSpacing: 2, shrinkText: true,
  lineSpacingMultiple: 1.1,
});

// White separator
s.addShape(pptx.ShapeType.rect, {
  x: M.l, y: 3.0, w: 0.6, h: 0.015,
  fill: { color: C.white },
});

// Subtitle
s.addText(subtitle, {
  x: M.l, y: 3.15, w: CONTENT_W, h: 0.4,
  fontSize: 14, fontFace: F.all, color: C.white,
  transparency: 20, shrinkText: true,
});
```

---

## Type 2 — Section Divider (Surface or White)

**Purpose**: Visual pause between major sections. NOT red background in corporate style.

```
Background: #F5F0EB (Warm Surface) or #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO standard]       │
│                                          │
│     01                                   │
│     Regular 11pt, Gray (#6B7280)         │
│                                          │
│     SKYRELIO PAVADINIMAS                 │
│     Bold 24-28pt, Black (#1A1A1A)        │
│     UPPERCASE                            │
│                                          │
│     ────── (raudona linija, 60px, 2px)   │
│                                          │
│     Trumpas aprašymas viena eilute       │
│     Regular 12pt, Gray (#6B7280)         │
│                                          │
└──────────────────────────────────────────┘
```

```javascript
const s = pptx.addSlide();
s.background = { color: C.warmSurface };

// Logo (standard for light bg)
s.addImage({
  path: 'assets/apgmedia_horiz.svg',
  x: 8.3, y: 0.25, w: 1.2, h: 0.71
});

// Section number
s.addText("01", {
  x: M.l, y: 1.5, w: 1.0, h: 0.3,
  fontSize: 11, fontFace: F.all, color: C.gray,
});

// Section title
s.addText(sectionTitle.toUpperCase(), {
  x: M.l, y: 1.9, w: CONTENT_W * 0.7, h: 1.0,
  fontSize: 26, fontFace: F.all, bold: true,
  color: C.black, charSpacing: 1.5, shrinkText: true,
});

// Red accent line
s.addShape(pptx.ShapeType.rect, {
  x: M.l, y: 3.05, w: 0.6, h: 0.03,
  fill: { color: C.red },
});

// Description
s.addText(description, {
  x: M.l, y: 3.2, w: CONTENT_W * 0.6, h: 0.4,
  fontSize: 12, fontFace: F.all, color: C.gray, shrinkText: true,
});
```

---

## Type 3 — Content Slide (Text + Visual, 60/40)

**Purpose**: Present information with supporting visual.

```
Background: #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO standard]       │
│  Slide'o antraštė                        │
│  SemiBold 18-20pt, Black (#1A1A1A)       │
│  ────── (raudona linija, 40px, 2px)      │
│                                          │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │   TEKSTAS    │  │    VIZUALAS      │   │
│  │   • Point 1  │  │    (nuotrauka,   │   │
│  │   • Point 2  │  │     grafikas)    │   │
│  │   • Point 3  │  │    8px radius    │   │
│  │   • Point 4  │  │                  │   │
│  └─────────────┘  └──────────────────┘   │
│  Šaltinis: Regular 8pt, Gray             │
└──────────────────────────────────────────┘
```

```javascript
const s = pptx.addSlide();
s.background = { color: C.white };

// Logo
s.addImage({
  path: 'assets/apgmedia_horiz.svg',
  x: 8.3, y: 0.25, w: 1.2, h: 0.71
});

// H2 heading — SemiBold, Black (NOT Bold Red)
s.addText(heading, {
  x: M.l, y: M.t, w: CONTENT_W - 2.0, h: 0.45,
  fontSize: 19, fontFace: F.all, bold: false,
  color: C.black, shrinkText: true,
  // Note: pptxgenjs doesn't have fontWeight — use bold:false for SemiBold effect
  // For true SemiBold, use fontFace: "Source Sans Pro SemiBold" if available
});

// Red accent line
s.addShape(pptx.ShapeType.rect, {
  x: M.l, y: M.t + 0.5, w: 0.5, h: 0.03,
  fill: { color: C.red },
});

// Bullet points (max 4) — gray bullets, not red
const bullets = points.slice(0, 4).map(p => ({
  text: p,
  options: { bullet: { code: "2022", color: C.grayDark }, indentLevel: 0 },
}));
s.addText(bullets, {
  x: M.l, y: 1.3, w: CONTENT_W * 0.55, h: 2.8,
  fontSize: 11, fontFace: F.all, color: C.black,
  lineSpacingMultiple: 1.5, paraSpaceAfter: 6, shrinkText: true,
});

// Visual placeholder (right side, 8px radius)
s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: M.l + CONTENT_W * 0.58, y: 1.3,
  w: CONTENT_W * 0.42, h: 2.8,
  fill: { color: C.coolSurface },
  line: { color: C.border, width: 0.5 },
  rectRadius: 0.067, // ~8px at 120dpi
});

// Source line
s.addText("Šaltinis: ...", {
  x: M.l, y: 4.3, w: CONTENT_W, h: 0.2,
  fontSize: 8, fontFace: F.all, color: C.gray, shrinkText: true,
});
```

---

## Type 4 — Stats Grid (3-4 Metrics)

**Purpose**: Present key metrics prominently.

```
Background: #FFFFFF or #F3F4F6 (Cool Surface)
┌──────────────────────────────────────────┐
│                    [LOGO]               │
│  Kampanijos rezultatai                   │
│  SemiBold 18pt, Black                    │
│  ────── (raudona linija)                 │
│                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐     │
│  │  +340% │  │  5.2x  │  │  €2.1  │     │
│  │  Bold  │  │  Bold  │  │  Bold  │     │
│  │  28pt  │  │  28pt  │  │  28pt  │     │
│  │Raudona │  │Raudona │  │Raudona │     │
│  │─(red)──│  │─(red)──│  │─(red)──│     │
│  │LABEL   │  │LABEL   │  │LABEL   │     │
│  │SemiBold│  │SemiBold│  │SemiBold│     │
│  │9pt,UPPER│ │9pt,UPPER│ │9pt,UPPER│    │
│  └────────┘  └────────┘  └────────┘     │
└──────────────────────────────────────────┘
```

**Corporate rules:**
- Stat numbers: Bold 28pt, Red (#EA3E2B) — the ONLY red element
- Mini red separator (20px, 2px) under each stat number
- Labels: SemiBold 9pt, Dark Gray (#374151), UPPERCASE
- Cards: NO border, NO shadow (Economist minimalism). Alternative: 1px #E5E7EB border, 8px radius
- Equal width, vertically centered

```javascript
stats.forEach((st, i) => {
  const cardW = (CONTENT_W - 0.3 * (count - 1)) / count;
  const x = M.l + i * (cardW + 0.3);

  // Stat number
  s.addText(st.value, {
    x, y: 1.8, w: cardW, h: 0.55,
    fontSize: 28, fontFace: F.all, bold: true,
    color: C.red, align: "center", shrinkText: true,
  });

  // Mini red separator
  s.addShape(pptx.ShapeType.rect, {
    x: x + cardW / 2 - 0.125, y: 2.4,
    w: 0.25, h: 0.03,
    fill: { color: C.red },
  });

  // Label
  s.addText(st.label.toUpperCase(), {
    x, y: 2.55, w: cardW, h: 0.25,
    fontSize: 9, fontFace: F.all, bold: false,
    color: C.grayDark, align: "center", charSpacing: 1,
    shrinkText: true,
  });
});
```

---

## Type 5 — Key Stat / Insight Moment

**Purpose**: Maximum impact, single metric. Use max 1-2 per presentation.

**On Dark (#1A1A1A):**
```
┌──────────────────────────────────────────┐
│                                          │
│           +340%                          │
│           Bold 36-48pt, WHITE            │
│           (NE raudona — per agresyvu)    │
│                                          │
│           ───── (raudona linija, 40px)    │
│                                          │
│           PARDAVIMŲ AUGIMAS              │
│           PER 6 MĖNESIUS                 │
│           SemiBold 12pt, White (60%)     │
│           UPPERCASE                      │
│                                          │
└──────────────────────────────────────────┘
```

**On Warm Surface (#F5F0EB):**
- Stat number: Bold, Red (#EA3E2B)
- Label: Black (#1A1A1A)

```javascript
// Dark variant
s.background = { color: C.black };
s.addText(statValue, {
  x: M.l, y: 1.5, w: CONTENT_W, h: 0.8,
  fontSize: 42, fontFace: F.all, bold: true,
  color: C.white, align: "center", shrinkText: true,
});
s.addShape(pptx.ShapeType.rect, {
  x: 10 / 2 - 0.2, y: 2.45, w: 0.4, h: 0.03,
  fill: { color: C.red },
});
s.addText(statLabel.toUpperCase(), {
  x: M.l, y: 2.6, w: CONTENT_W, h: 0.5,
  fontSize: 12, fontFace: F.all, bold: false,
  color: C.white, align: "center", transparency: 40,
  charSpacing: 1, shrinkText: true,
});
```

---

## Type 6 — Pricing / Service Cards

**Purpose**: Present service packages with pricing.

```
Background: #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO]               │
│  Paslaugų paketai                        │
│  SemiBold 18pt, Black                    │
│  ────── (raudona linija)                 │
│                                          │
│  ┌──────────────┐  ┌──────────────────┐  │
│  │ STANDARD     │  │ REKOMENDUOJAMAS  │  │
│  │ SemiBold 11pt│  │ +3px red border  │  │
│  │              │  │ viršuje          │  │
│  │  €500/mėn   │  │  €1,200/mėn     │  │
│  │  Bold 24pt  │  │  Bold 24pt RED   │  │
│  │              │  │                  │  │
│  │  • Feature 1│  │  • All Std +     │  │
│  │  • Feature 2│  │  • Feature 3     │  │
│  │              │  │                  │  │
│  │[SUSISIEKTI]  │  │[SUSISIEKTI]     │  │
│  │ Outline CTA │  │ Filled CTA      │  │
│  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────┘
```

**Corporate rules:**
- Cards: 1px border #E5E7EB, **8px radius**
- Recommended card: 3px red border-top
- Price: Bold 24pt — Black for standard, Red for recommended
- CTA Primary: #EA3E2B bg, white text, 8px radius
- CTA Secondary: white bg, 1px #EA3E2B border, red text
- Bullet points: gray dots (#6B7280), Regular 10pt, 1.5 line-height

---

## Type 7 — Comparison Table

```
Background: #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO]               │
│  Sprendimų palyginimas                  │
│  SemiBold 18pt, Black                    │
│  ────── (raudona linija)                 │
│                                          │
│  ┌─────────┬─────────┬─────────────────┐ │
│  │ CRITERIA│ KITI    │  APG MEDIA      │ │
│  │ SemiBold│ Regular │  Bold, 3px red  │ │
│  │ 10pt    │ Pilkas  │  border-top     │ │
│  ├─────────┼─────────┼─────────────────┤ │
│  │REACH    │ 5,000   │  50,000+ (Bold) │ │
│  │ROAS     │ 1.2x    │  5.2x (Bold)   │ │
│  │CPA      │ €8.50   │  €2.10 (Bold)  │ │
│  └─────────┴─────────┴─────────────────┘ │
└──────────────────────────────────────────┘
```

**Corporate rules:**
- APG column: 3px red border-top (not full red header)
- APG values: Bold for emphasis
- Competitor: Regular, Gray
- Check marks: Red (#EA3E2B)
- Alternating rows: white / Cool Surface (#F3F4F6)
- Headers: SemiBold 10pt, UPPERCASE — NO colored backgrounds

---

## Type 8 — Timeline / Process

```
Background: #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO]               │
│  Kampanijos planas                       │
│  SemiBold 18pt, Black                    │
│  ────── (raudona linija)                 │
│                                          │
│  ┌───┐ --- ┌───┐ --- ┌───┐ --- ┌───┐   │
│  │ 1 │     │ 2 │     │ 3 │     │ 4 │   │
│  │RED│     │GRY│     │GRY│     │GRY│   │
│  └───┘     └───┘     └───┘     └───┘   │
│ SETUP     LAUNCH   OPTIMIZE   SCALE     │
└──────────────────────────────────────────┘
```

**Corporate rules:**
- Circles: **0.35"** diameter (smaller than standard 0.5")
- Active: Red filled, future: 1px Gray outline
- Connecting line: **dashed**, 1px, Gray (#E5E7EB)
- Labels: SemiBold 10pt, UPPERCASE, Dark Gray
- Minimalist — no extra decorations

---

## Type 9 — Quote / Testimonial

**Purpose**: Social proof. Uses Warm Surface background — Economist paper feel.

```
Background: #F5F0EB (Warm Surface)
┌──────────────────────────────────────────┐
│                                          │
│   ────── (raudona linija, 40px, 2px)     │
│                                          │
│   Per 3 mėnesius su APG Media mūsų      │
│   pardavimai išaugo 340%.                │
│   Source Sans Pro Light 18-20pt          │
│   Italic, Black                          │
│                                          │
│   — Jonas Jonaitis                       │
│   CEO, Įmonė                            │
│   SemiBold 10pt, Red                     │
│                                          │
└──────────────────────────────────────────┘
```

**Corporate rules:**
- NO decorative quote marks ("„...") — use red accent line instead
- Quote text: **Light (300) Italic** — elegant contrast with body
- Author: SemiBold, Red
- Lots of whitespace around quote
- Center or left aligned

```javascript
s.background = { color: C.warmSurface };

// Red accent line
s.addShape(pptx.ShapeType.rect, {
  x: M.l, y: 1.5, w: 0.5, h: 0.03,
  fill: { color: C.red },
});

// Quote text — Light Italic
s.addText(quoteText, {
  x: M.l + 0.5, y: 1.8, w: CONTENT_W - 1.5, h: 1.8,
  fontSize: 19, fontFace: F.all, italic: true,
  color: C.black, lineSpacingMultiple: 1.6, shrinkText: true,
  // Light weight not directly supported — italic gives editorial feel
});

// Author
s.addText(`— ${author}, ${role}`, {
  x: M.l + 0.5, y: 3.8, w: CONTENT_W - 1.5, h: 0.3,
  fontSize: 10, fontFace: F.all, bold: false,
  color: C.red, shrinkText: true,
});
```

---

## Type 10 — Closing / CTA

**Purpose**: Strong finish. ALWAYS dark background in corporate style (never red).

```
Background: #1A1A1A (Dark)
┌──────────────────────────────────────────┐
│                                          │
│   AČIŪ.                                 │
│   Bold 32pt, White, UPPERCASE            │
│                                          │
│   ────── (raudona linija, 60px, 2px)     │
│                                          │
│   Pasiruošę augti?                       │
│   Regular 16pt, White (70%)              │
│                                          │
│   info@apgmedia.lt                       │
│   apgmedia.lt                            │
│   Regular 12pt, White (50%)              │
│                                          │
│   [LOGO inversinis]                      │
│   apgmedia_horiz_balt_color.svg          │
│                                          │
└──────────────────────────────────────────┘
```

```javascript
const s = pptx.addSlide();
s.background = { color: C.black };

s.addText("AČIŪ.", {
  x: M.l, y: 1.2, w: CONTENT_W, h: 0.6,
  fontSize: 32, fontFace: F.all, bold: true,
  color: C.white, align: "center", charSpacing: 3, shrinkText: true,
});

// Red accent line
s.addShape(pptx.ShapeType.rect, {
  x: 10 / 2 - 0.3, y: 2.0, w: 0.6, h: 0.03,
  fill: { color: C.red },
});

s.addText("Pasiruošę augti?", {
  x: M.l, y: 2.2, w: CONTENT_W, h: 0.4,
  fontSize: 16, fontFace: F.all, color: C.white,
  transparency: 30, align: "center", shrinkText: true,
});

s.addText("info@apgmedia.lt\napgmedia.lt", {
  x: M.l, y: 3.0, w: CONTENT_W, h: 0.6,
  fontSize: 12, fontFace: F.all, color: C.white,
  transparency: 50, align: "center", lineSpacingMultiple: 1.5,
  shrinkText: true,
});

// Logo (inverse for dark bg)
s.addImage({
  path: 'assets/apgmedia_horiz_balt_color.svg',
  x: 10 / 2 - 0.6, y: 4.2, w: 1.2, h: 0.68
});
```

---

## Type 11 — Data / Chart Slide (Full Width)

```
Background: #FFFFFF
┌──────────────────────────────────────────┐
│                    [LOGO]               │
│  Pardavimų dinamika Q1-Q4               │
│  SemiBold 18pt, Black                    │
│  ────── (raudona linija)                 │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │         [GRAFIKAS]               │    │
│  │         Full width, 3.0-3.5"     │    │
│  │         Economist flat style     │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Key insight: Vienas sakinys, Bold 11pt  │
│  Šaltinis: Regular 8pt, Gray             │
└──────────────────────────────────────────┘
```

**Chart color scheme:**
- Bar primary: #EA3E2B, comparison: #E5E7EB, contrast: #325058
- Pie: #EA3E2B, #325058, #1A1A1A, #6B7280, #F6A098, #D1E0E4
- Line primary: #EA3E2B (2px solid), secondary: #325058, trend: #6B7280 (dashed)
- Grid lines: #F3F4F6 (very subtle), axis: #E5E7EB
- Style: flat, no 3D, no gradients, no shadows

---

## Type 12 — Budget Summary Table

Same structure as standard APG but with corporate table styling:
- Header: SemiBold 10pt, UPPERCASE — **no red background** in header
- Instead: thin 2px red bottom-border on header row
- Alternating rows: white / Cool Surface (#F3F4F6)
- Totals row: Bold, with red accent
- All borders: 1px #E5E7EB
- Footnote: Regular 8pt, Gray

---

## Type 13 — Workflow / Process Steps

Same structure as standard APG but:
- Step number circles: Red filled, smaller (0.35")
- Step labels: SemiBold 10pt, UPPERCASE, Dark Gray
- Step descriptions: Regular 10pt, Black
- Connecting line: vertical, 1px, dashed, Gray (#E5E7EB)
- Minimalist — no decorations
