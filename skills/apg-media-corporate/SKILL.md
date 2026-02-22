---
name: apg-media-corporate
description: "Use this skill to create APG Media **corporate** branded PPTX presentations with an Economist-inspired editorial design. Triggers when: creating corporate APG presentations; user mentions 'APG corporate', 'APG corporate slides', 'APG corporate proposal', 'corporate presentation', or 'korporatyvinis pristatymas'; building executive-level client proposals, investor pitch decks, or strategic presentations. Distinct from the standard APG Media skill — this uses Source Sans Pro (not Open Sans), restrained red (#EA3E2B) as surgical accent only, 8px border-radius, warm surface (#F5F0EB) backgrounds, red accent separator lines, and an authoritative editorial tone. Only 1 red background slide (title) per presentation; 80%+ slides on white/surface."
---

# APG Media Corporate Presentation Skill

## Overview

APG Media corporate presentations follow an **Economist-inspired editorial** design — authoritative, data-driven, restrained. Red is a surgical accent, not a dominant color.

**Key differences from standard APG style:**

| Element | Standard APG | Corporate APG |
|---------|-------------|---------------|
| Font | Open Sans | **Source Sans Pro** |
| Red usage | 10% (bold) | **5-7%** (surgical) |
| Red bg slides | 2-3 per deck | **1 only** (title) |
| H2 headings | Bold, Red | **SemiBold, Black** |
| Signature element | Red background | **Red accent line (2px)** |
| Border-radius | 12px | **8px** |
| Icons | Solid, Red | **Outline, Gray (#6B7280)** |
| Surface color | #F7E6E4 (pink) | **#F5F0EB (warm)** / #F3F4F6 (cool) |
| Black | #262626 | **#1A1A1A** (deeper) |
| Margins | 0.6" | **0.7" sides, 0.8" bottom** |
| Closing slide | Red or Dark | **Dark only** |
| Quotes | Decorative marks | **Light Italic + red line** |
| Body max words | 40 | **30** |
| Max bullets | 5 | **4** |

### Presentation Types

| Type | Slides | Duration | Use Case |
|------|--------|----------|----------|
| Corporate Proposal | 12-18 | 25-35 min | Executive client pitches |
| Performance Report | 10-14 | 20-25 min | Campaign results with analytics |
| Strategy Deck (CARE) | 25-35 | 45-60 min | Full strategic presentations |
| Elevator Pitch | 3-5 | 5-8 min | Quick intro with key stats |

---

## Workflow

### Step 1: Gather Inputs

Read these files before generating:

1. **Corporate style guide** — `apg-media-stilius-corporate.md` (in project root)
2. **Service catalog** — `apg_media_template.json` (pricing, packages)
3. **Client data** — strategy docs, analytics, APG answers
4. **SVG logos** — located in this skill's `assets/` folder:
   - `assets/apgmedia_horiz.svg` — for light/white/surface backgrounds
   - `assets/apgmedia_horiz_balt_color.svg` — for dark/red/teal backgrounds

### Step 2: Map Content to Slides

Read [references/slide-types-corporate.md](references/slide-types-corporate.md) for the complete corporate slide type catalog with layout specifications and pptxgenjs code.

Read [references/service-mapping.md](../apg-media/references/service-mapping.md) for service-to-slide mapping (shared with standard APG skill).

### Step 3: Generate PPTX

Use pptxgenjs (see pptx skill's [pptxgenjs.md](../pptx/pptxgenjs.md) for API reference).

Read [templates/apg_corporate_scaffold.js](templates/apg_corporate_scaffold.js) for the corporate scaffold with:
- Corporate color/font configuration (Source Sans Pro, #1A1A1A text, #F5F0EB surface)
- Red accent line helper (signature element)
- Logo placement with correct SVG variants per background
- Slide factory helpers adapted for corporate constraints

**Critical corporate rules when generating:**
1. Only 1 red background slide (title) — all section dividers use Surface (#F5F0EB) or White
2. H2 headings are SemiBold (600), Black (#1A1A1A) — NOT Bold Red
3. Red accent separator line (40-60px wide, 2px thick) under every H2
4. Quotes use Light (300) Italic — no decorative quote marks
5. Max 30 words body text per slide, max 4 bullet points
6. Border-radius 8px everywhere (not 12px)
7. Icons outline style, Gray (#6B7280) — never solid red
8. Closing slide MUST be dark (#1A1A1A), never red

### Step 4: SVG Logo Placement

```javascript
// LIGHT backgrounds (#FFFFFF, #F5F0EB, #F3F4F6)
slide.addImage({
  path: 'assets/apgmedia_horiz.svg',
  x: 8.3, y: 0.25, w: 1.2, h: 0.71   // h = w × 0.5893
});

// DARK/RED/TEAL backgrounds (#1A1A1A, #EA3E2B, #325058)
slide.addImage({
  path: 'assets/apgmedia_horiz_balt_color.svg',
  x: 8.3, y: 0.25, w: 1.2, h: 0.68   // h = w × 0.5642
});
```

Logo aspect ratios differ between variants — never use same `h` for both.

### Step 5: QA

Follow the pptx skill's QA workflow, plus corporate-specific checks:

1. Run programmatic QA (backgrounds, fonts, content completeness)
2. **Corporate QA checklist:**
   - Only 1 red background slide?
   - Font is Source Sans Pro throughout?
   - H2 headings SemiBold (not Bold), Black (not Red)?
   - Red accent line present under H2s?
   - Quotes use Light Italic?
   - Border-radius = 8px (not 12px)?
   - Icons outline, gray (not solid red)?
   - Closing slide dark (not red)?
   - Body text ≤30 words per slide?
   - Bullets ≤4 per slide?
   - Correct logo variant per background?
   - No hype language ("revoliucionierius", "game-changer")?
   - No exclamation marks?
3. Convert to images if `soffice` + `pdftoppm` available, otherwise structural QA
4. Fix issues, regenerate, re-verify
5. At least one fix-and-verify cycle required

---

## Design System Quick Reference

### Colors (pptxgenjs hex — no # prefix)

```javascript
const C = {
  red:         "EA3E2B",  // Surgical accent ONLY — lines, stats, CTA
  black:       "1A1A1A",  // Primary text, dark backgrounds (deeper than standard)
  white:       "FFFFFF",  // Dominant background (75% of presentation)
  gray:        "6B7280",  // Secondary text, icons
  grayDark:    "374151",  // Stronger secondary text
  teal:        "325058",  // Data visualization contrast
  tealDark:    "1E3A44",  // Dark data contrast
  tealLight:   "D1E0E4",  // Light data background
  warmSurface: "F5F0EB",  // Economist paper — quotes, section pauses
  coolSurface: "F3F4F6",  // Data cards, analytics
  border:      "E5E7EB",  // Card borders, dividers
  redSubtle:   "FEF2F2",  // Very subtle red highlight
  redSoft:     "F6A098",  // Chart segments
  red60:       "F19B91",  // Secondary chart
};
```

### Fonts

```javascript
const F = {
  heading: "Source Sans Pro",  // Bold 700 for H1, SemiBold 600 for H2
  body:    "Source Sans Pro",  // Regular 400
  caption: "Source Sans Pro",  // Regular 400, smaller size
  label:   "Source Sans Pro",  // SemiBold 600, UPPERCASE
  quote:   "Source Sans Pro",  // Light 300, Italic
};
```

### Typography Rules

| Element | Weight | Size | Transform | Color |
|---------|--------|------|-----------|-------|
| Title slide H1 | Bold 700 | 32-38pt | UPPERCASE +2pt spacing | White |
| Section divider | Bold 700 | 24-28pt | UPPERCASE | Black #1A1A1A |
| Slide heading H2 | SemiBold 600 | 18-20pt | Sentence case | Black #1A1A1A |
| Subtitle H3 | Regular 400 | 11-12pt | Normal | Gray #6B7280 |
| Body text | Regular 400 | 10-12pt | Normal, 1.5 line-height | Black #1A1A1A |
| Caption / Source | Regular 400 | 8-9pt | Normal | Gray #6B7280 |
| Key stat number | Bold 700 | 28-36pt | None | Red #EA3E2B |
| Stat label | SemiBold 600 | 9-10pt | UPPERCASE | Dark gray #374151 |
| Quote text | Light 300 | 16-20pt | Italic | Black #1A1A1A |
| Quote author | SemiBold 600 | 10-11pt | Normal | Red #EA3E2B |
| Price number | Bold 700 | 24-28pt | None | Black or Red |
| Badge | SemiBold 600 | 8-9pt | UPPERCASE | Red on #FEF2F2 |

### Narrative Arc

```
Red      → Title slide (the ONLY red slide — like The Economist cover)
White    → Content slides (dominant — clarity and focus)
Surface  → Insight / quote slides (warm Economist paper)
White    → Content slides
Dark     → Key stat / WOW moment (max 1-2 per presentation)
White    → Content slides
Dark     → Closing / CTA slide
```

Rule: Max 2 dark slides in a row. 80%+ on light backgrounds.

### Red Accent Separator Line (Signature Element)

```javascript
// Place after H2 heading on content slides
slide.addShape(pptx.ShapeType.rect, {
  x: 0.7, y: heading_y + heading_h + 0.05,
  w: 0.6, h: 0.03,
  fill: { color: 'EA3E2B' },
  line: { color: 'EA3E2B', width: 0 }
});
```

Where to use: Content slide H2 headings, section dividers, before quotes.
Where NOT to use: Stat grids, inside cards, closing slide.

### Layout

```
Format: 16:9 (10" × 5.625")
Margins: 0.7" sides, 0.8" bottom (more breathing room than standard)
Content zone: 8.6" × 4.025"
Grid: 12-column, 0.3" gutter
Base unit: 8px
```

---

## Dependencies

- `npm install pptxgenjs` — PPTX generation
- `pip install python-pptx` — Structural QA
- SVG logos in `assets/` folder (bundled with this skill)
- Corporate style guide: `apg-media-stilius-corporate.md`
- Service catalog: `apg_media_template.json`
