#!/usr/bin/env node
/**
 * APG Media — Corporate Proposal PPTX Scaffold
 *
 * Generates a client-facing presentation using the APG Media CORPORATE
 * design system: Economist-inspired editorial authority, Source Sans Pro,
 * red (#EA3E2B) as surgical accent only, 8px border-radius.
 *
 * Key differences from standard APG scaffold:
 * - Source Sans Pro (not Open Sans)
 * - Only 1 red background slide (title)
 * - H2 headings SemiBold + Black (not Bold + Red)
 * - Red accent separator lines under H2s
 * - Section dividers on Surface/White (not Red)
 * - Quotes: Light Italic, no decorative marks
 * - 8px border-radius, larger margins, outline icons
 *
 * Usage:
 *   1. Replace DATA object with client-specific content
 *   2. Run: node apg_corporate_scaffold.js
 *   3. Output: APG_Media_Corporate_Proposal.pptx
 *
 * Dependencies: npm install pptxgenjs
 */

const PptxGenJS = require("pptxgenjs");
const path = require("path");
const pptx = new PptxGenJS();

// Resolve asset paths relative to this script's directory
const SKILL_DIR = path.resolve(__dirname, "..");

// ─────────────────────────────────────────────────────────────
// 1. CORPORATE BRAND CONSTANTS
// ─────────────────────────────────────────────────────────────

const C = {
  red:         "EA3E2B",  // Surgical accent ONLY — lines, key stats, CTA
  black:       "1A1A1A",  // Primary text, dark backgrounds (deeper than standard)
  white:       "FFFFFF",  // Dominant background (75%+)
  gray:        "6B7280",  // Secondary text, icons, captions
  grayDark:    "374151",  // Stronger secondary text, stat labels
  teal:        "325058",  // Data visualization contrast
  tealDark:    "1E3A44",  // Dark data contrast
  tealLight:   "D1E0E4",  // Light data backgrounds
  warmSurface: "F5F0EB",  // Economist paper — quotes, section dividers
  coolSurface: "F3F4F6",  // Data cards, analytics, alternating rows
  border:      "E5E7EB",  // Card borders, dividers, table rules
  redSubtle:   "FEF2F2",  // Very subtle red highlight (badges)
  redSoft:     "F6A098",  // Chart segments, muted accents
  red60:       "F19B91",  // Secondary chart elements
};

const F = {
  heading: "Source Sans Pro",
  body:    "Source Sans Pro",
  caption: "Source Sans Pro",
  label:   "Source Sans Pro",
  quote:   "Source Sans Pro",
};

// Margins — larger than standard for more breathing room
const M = { l: 0.7, r: 0.7, t: 0.7, b: 0.8 };
const CONTENT_W = 10 - M.l - M.r;  // 8.6"
const CONTENT_H = 5.625 - M.t - M.b; // 4.125"

// Logo paths — SVG files in assets/ folder (resolved relative to skill root)
const LOGO_LIGHT = path.join(SKILL_DIR, "assets/apgmedia_horiz.svg");
const LOGO_DARK  = path.join(SKILL_DIR, "assets/apgmedia_horiz_balt_color.svg");

// Logo dimensions (different aspect ratios per variant)
const LOGO = {
  x: 8.3, y: 0.25, w: 1.2,
  light: { h: 0.71 },  // w × (290.7 / 493.3)
  dark:  { h: 0.68 },  // w × (367.0 / 650.4)
};

// ─────────────────────────────────────────────────────────────
// 2. CLIENT DATA (REPLACE WITH REAL DATA)
// ─────────────────────────────────────────────────────────────

const DATA = {
  client: {
    name: "{{KLIENTO PAVADINIMAS}}",
    industry: "{{INDUSTRIJA}}",
    website: "{{SVETAINĖ}}",
    markets: ["Lietuva"],
  },

  title: {
    main: "SKAITMENINĖS RINKODAROS\nPASIŪLYMAS",
    subtitle: "APG Media | 2026",
  },

  about: {
    heading: "Apie APG Media",
    description: "Skaitmeninės rinkodaros agentūra, fokusuojasi į rezultatus: Google Ads, Meta reklama, SEO, LinkedIn automatizacija.",
    stats: [
      { value: "50+", label: "KLIENTŲ" },
      { value: "5.2x", label: "VID. ROAS" },
      { value: "€2.10", label: "VID. CPA" },
    ],
  },

  analysis: {
    heading: "Jūsų situacijos analizė",
    points: [
      "Dabartinis skaitmeninis buvimas reikalauja optimizacijos",
      "Konkurentai aktyviai investuoja į online kanalus",
      "Retargeting ir remarketing galimybės neišnaudotos",
      "Didelė galimybė pasiekti tikslinių auditoriją",
    ],
  },

  sectionServices: {
    number: "02",
    title: "PASLAUGOS IR\nSPRENDIMAI",
    description: "Integruotas skaitmeninių kanalų rinkinys jūsų augimui",
  },

  services: [
    {
      id: "facebook_group_ads",
      title: "Facebook Group Ads",
      description: "Tikslinė reklama Facebook grupių nariams naudojant custom ir look-a-like auditorijas.",
      capability: "Galime pasirinkti tikslinių Facebook grupių narius. Pagal pasirinktų grupių dalyvius sukuriamos custom ir Look-a-like auditorijos.",
      funnelStage: "Žinomumo didinimo fazė",
      budget: "€2,000/mėn",
      mgmt: "€1,000/mėn",
    },
    {
      id: "google_display_ads",
      title: "Google Display Ads",
      description: "Display reklamos rodymas auditorijoms pagal tikslines svetaines ir paieškos frazes.",
      capability: "Galime rodyti reklamą pagal konkurentų svetaines ir paieškos ketinimus.",
      funnelStage: "Svarstymo ir apsisprendimo fazė",
      budget: "€1,000/mėn",
      mgmt: "€900/mėn",
    },
  ],

  budgetSummary: {
    heading: "Biudžeto suvestinė",
    rows: [
      ["Facebook Group Ads", "€2,000", "€1,000", "—"],
      ["Google Display Ads", "€1,000", "€900", "—"],
      ["Retargeting", "€1,000", "€0*", "—"],
    ],
    totals: ["VISO", "€4,000", "€1,900", "—"],
    footnote: "* Administravimas nemokamas užsakant kartu su Google kampanijomis.",
  },

  timeline: {
    heading: "Kampanijos planas",
    phases: [
      { num: "1", label: "SETUP", period: "1–2 sav." },
      { num: "2", label: "LAUNCH", period: "3–4 sav." },
      { num: "3", label: "OPTIMIZE", period: "5–8 sav." },
      { num: "4", label: "SCALE", period: "3+ mėn." },
    ],
  },

  testimonial: {
    quote: "Per 3 mėnesius su APG Media mūsų pardavimai išaugo 340%. Tai geriausias sprendimas, kurį priėmėme.",
    author: "Jonas Jonaitis",
    role: "CEO, Pavyzdinė Įmonė",
  },

  closing: {
    thanks: "AČIŪ.",
    cta: "Pasiruošę augti?",
    email: "info@apgmedia.lt",
    website: "apgmedia.lt",
  },
};

// ─────────────────────────────────────────────────────────────
// 3. HELPER FUNCTIONS (Corporate Adapted)
// ─────────────────────────────────────────────────────────────

/** Micro shadow — barely visible (corporate restraint) */
function microShadow() {
  return { type: "outer", blur: 2, offset: 1, color: "000000", opacity: 0.06 };
}

/** Standard border */
function cardBorder(color = C.border, pt = 0.5) {
  return [{ color, pt }];
}

/** Red accent separator line — SIGNATURE ELEMENT */
function addAccentLine(slide, x, y, w = 0.6) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h: 0.03,
    fill: { color: C.red },
    line: { color: C.red, width: 0 },
    rectRadius: 0.01,
  });
}

/** Add logo — correct variant per background */
function addLogo(slide, bgType = "light") {
  const path = bgType === "light" ? LOGO_LIGHT : LOGO_DARK;
  const h = bgType === "light" ? LOGO.light.h : LOGO.dark.h;
  slide.addImage({ path, x: LOGO.x, y: LOGO.y, w: LOGO.w, h });
}

/** White background slide with logo */
function whiteSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addLogo(s, "light");
  return s;
}

/** Surface background slide with logo */
function warmSurfaceSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.warmSurface };
  addLogo(s, "light");
  return s;
}

/** Dark background slide with logo */
function darkSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.black };
  addLogo(s, "dark");
  return s;
}

/** Add corporate H2 heading with accent line */
function addHeading(slide, text, opts = {}) {
  const y = opts.y || M.t;
  const h = opts.h || 0.45;

  // H2 — SemiBold, Black (NOT Bold Red)
  slide.addText(text, {
    x: M.l, y, w: CONTENT_W - 2.0, h,
    fontSize: opts.fontSize || 19,
    fontFace: F.heading,
    bold: false, // SemiBold — not bold
    color: opts.color || C.black,
    shrinkText: true,
  });

  // Red accent line underneath
  if (opts.noAccent !== true) {
    addAccentLine(slide, M.l, y + h + 0.05, opts.lineW || 0.5);
  }
}

/** Add stat cards row — corporate minimal style */
function addStatCards(slide, stats, opts = {}) {
  const startY = opts.y || 1.8;
  const count = stats.length;
  const cardW = (CONTENT_W - 0.3 * (count - 1)) / count;

  stats.forEach((st, i) => {
    const x = M.l + i * (cardW + 0.3);

    // Stat number — Bold, Red (the only red element)
    slide.addText(st.value, {
      x, y: startY, w: cardW, h: 0.55,
      fontSize: 28, fontFace: F.heading, bold: true,
      color: C.red, align: "center", shrinkText: true,
    });

    // Mini red separator
    addAccentLine(slide, x + cardW / 2 - 0.125, startY + 0.6, 0.25);

    // Label — SemiBold, Dark Gray, UPPERCASE
    slide.addText(st.label.toUpperCase(), {
      x, y: startY + 0.75, w: cardW, h: 0.25,
      fontSize: 9, fontFace: F.label,
      color: C.grayDark, align: "center", charSpacing: 1,
      shrinkText: true,
    });
  });
}

/** Add a table with corporate styling */
function addTable(slide, headers, rows, opts = {}) {
  const tableData = [];

  // Header row — SemiBold, no red bg (corporate: subtle header)
  tableData.push(headers.map(h => ({
    text: h.toUpperCase(),
    options: {
      bold: true, fontSize: 10, fontFace: F.heading,
      color: C.black, fill: { color: C.coolSurface },
      align: "left", valign: "middle",
      border: [
        { color: C.border, pt: 0.5 },
        { color: C.border, pt: 0.5 },
        { color: C.red, pt: 1.5 },    // Red bottom border
        { color: C.border, pt: 0.5 },
      ],
    },
  })));

  // Data rows — alternating white/cool surface
  rows.forEach((row, ri) => {
    tableData.push(row.map(cell => ({
      text: String(cell),
      options: {
        fontSize: 10, fontFace: F.body, color: C.black,
        fill: { color: ri % 2 === 0 ? C.white : C.coolSurface },
        align: "left", valign: "middle",
      },
    })));
  });

  slide.addTable(tableData, {
    x: opts.x || M.l, y: opts.y || 1.3,
    w: opts.w || CONTENT_W,
    colW: opts.colW,
    border: { color: C.border, pt: 0.5 },
    margin: [5, 8, 5, 8],
  });
}

// ─────────────────────────────────────────────────────────────
// 4. PRESENTATION SETUP
// ─────────────────────────────────────────────────────────────

pptx.layout = "LAYOUT_16x9";
pptx.author = "APG Media";
pptx.company = "APG Media";
pptx.subject = "Korporatyvinis pasiūlymas";

// ─────────────────────────────────────────────────────────────
// 5. SLIDE GENERATION
// ─────────────────────────────────────────────────────────────

// ── SLIDE 1: Title (THE ONLY RED SLIDE) ──────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: C.red };
  addLogo(s, "dark");

  // Main title
  s.addText(DATA.title.main, {
    x: M.l, y: 1.3, w: CONTENT_W, h: 1.5,
    fontSize: 36, fontFace: F.heading, bold: true,
    color: C.white, charSpacing: 2, shrinkText: true,
    lineSpacingMultiple: 1.1,
  });

  // White separator line
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: M.l, y: 3.0, w: 0.6, h: 0.015,
    fill: { color: C.white },
    line: { width: 0 },
  });

  // Subtitle
  s.addText(DATA.title.subtitle, {
    x: M.l, y: 3.15, w: CONTENT_W, h: 0.4,
    fontSize: 14, fontFace: F.body, color: C.white,
    transparency: 20, shrinkText: true,
  });

  // Client name
  s.addText(DATA.client.name, {
    x: M.l, y: 4.2, w: CONTENT_W, h: 0.3,
    fontSize: 13, fontFace: F.body, color: C.white,
    transparency: 35, shrinkText: true,
  });
}

// ── SLIDE 2: About APG Media ─────────────────────────────────
{
  const s = whiteSlide();
  addHeading(s, DATA.about.heading);

  s.addText(DATA.about.description, {
    x: M.l, y: 1.3, w: CONTENT_W, h: 0.4,
    fontSize: 11, fontFace: F.body, color: C.black,
    lineSpacingMultiple: 1.5, shrinkText: true,
  });

  addStatCards(s, DATA.about.stats, { y: 2.0 });

  // Services list
  s.addText("Google Ads  •  Meta Ads  •  SEO / PR  •  YouTube  •  LinkedIn  •  Retargeting", {
    x: M.l, y: 4.0, w: CONTENT_W, h: 0.25,
    fontSize: 9, fontFace: F.caption, color: C.gray,
    align: "center", shrinkText: true,
  });
}

// ── SLIDE 3: Situation Analysis ──────────────────────────────
{
  const s = whiteSlide();
  addHeading(s, DATA.analysis.heading);

  // Bullet points (max 4, gray bullets)
  const bullets = DATA.analysis.points.slice(0, 4).map(p => ({
    text: p,
    options: { bullet: { code: "2022", color: C.grayDark }, indentLevel: 0 },
  }));

  s.addText(bullets, {
    x: M.l, y: 1.4, w: CONTENT_W * 0.55, h: 2.8,
    fontSize: 11, fontFace: F.body, color: C.black,
    lineSpacingMultiple: 1.5, paraSpaceAfter: 8, shrinkText: true,
  });

  // Visual placeholder (right side)
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: M.l + CONTENT_W * 0.58, y: 1.4,
    w: CONTENT_W * 0.42, h: 2.8,
    fill: { color: C.coolSurface },
    line: { color: C.border, width: 0.5 },
    rectRadius: 0.067, // ~8px
  });
  s.addText("ANALIZĖS\nVIZUALIZACIJA", {
    x: M.l + CONTENT_W * 0.58, y: 2.4,
    w: CONTENT_W * 0.42, h: 0.6,
    fontSize: 11, fontFace: F.heading, bold: true,
    color: C.gray, align: "center", shrinkText: true,
  });
}

// ── SLIDE 4: Section Divider — Services (Surface, NOT Red) ──
{
  const s = warmSurfaceSlide();

  // Section number
  s.addText(DATA.sectionServices.number, {
    x: M.l, y: 1.5, w: 1.0, h: 0.3,
    fontSize: 11, fontFace: F.body, color: C.gray,
  });

  // Section title — Bold, UPPERCASE
  s.addText(DATA.sectionServices.title, {
    x: M.l, y: 1.9, w: CONTENT_W * 0.7, h: 1.0,
    fontSize: 26, fontFace: F.heading, bold: true,
    color: C.black, charSpacing: 1.5, shrinkText: true,
    lineSpacingMultiple: 1.1,
  });

  // Red accent line
  addAccentLine(s, M.l, 3.05, 0.6);

  // Description
  s.addText(DATA.sectionServices.description, {
    x: M.l, y: 3.2, w: CONTENT_W * 0.6, h: 0.4,
    fontSize: 12, fontFace: F.body, color: C.gray, shrinkText: true,
  });
}

// ── SLIDES 5-6: Service Detail Slides ────────────────────────
DATA.services.forEach((svc) => {
  const s = whiteSlide();
  addHeading(s, svc.title);

  // Funnel stage badge — subtle red bg
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: M.l, y: 1.25, w: 2.5, h: 0.28,
    fill: { color: C.redSubtle },
    line: { width: 0 },
    rectRadius: 0.033, // ~4px
  });
  s.addText(svc.funnelStage.toUpperCase(), {
    x: M.l + 0.1, y: 1.25, w: 2.3, h: 0.28,
    fontSize: 8, fontFace: F.label, bold: false,
    color: C.red, valign: "middle", charSpacing: 0.5,
    shrinkText: true,
  });

  // Description
  s.addText(svc.description, {
    x: M.l, y: 1.7, w: CONTENT_W * 0.55, h: 0.5,
    fontSize: 11, fontFace: F.body, color: C.black,
    lineSpacingMultiple: 1.5, shrinkText: true,
  });

  // Capability box — cool surface
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: M.l, y: 2.4, w: CONTENT_W * 0.55, h: 1.0,
    fill: { color: C.coolSurface },
    line: { width: 0 },
    rectRadius: 0.067,
  });
  s.addText("TECHNINĖ GALIMYBĖ", {
    x: M.l + 0.15, y: 2.45, w: CONTENT_W * 0.55 - 0.3, h: 0.22,
    fontSize: 8, fontFace: F.label, color: C.grayDark,
    charSpacing: 0.5, shrinkText: true,
  });
  s.addText(svc.capability, {
    x: M.l + 0.15, y: 2.7, w: CONTENT_W * 0.55 - 0.3, h: 0.6,
    fontSize: 10, fontFace: F.body, color: C.black,
    lineSpacingMultiple: 1.4, shrinkText: true,
  });

  // Pricing cards (right side)
  const px = M.l + CONTENT_W * 0.58;
  const pw = CONTENT_W * 0.42;

  // Budget card
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: px, y: 1.7, w: pw, h: 1.0,
    fill: { color: C.white },
    line: { color: C.border, width: 0.5 },
    rectRadius: 0.067,
    shadow: microShadow(),
  });
  s.addText("REKLAMOS BIUDŽETAS", {
    x: px + 0.15, y: 1.78, w: pw - 0.3, h: 0.2,
    fontSize: 8, fontFace: F.label, color: C.gray,
    charSpacing: 0.5, shrinkText: true,
  });
  s.addText(svc.budget, {
    x: px + 0.15, y: 2.0, w: pw - 0.3, h: 0.45,
    fontSize: 24, fontFace: F.heading, bold: true,
    color: C.red, shrinkText: true,
  });

  // Management card
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: px, y: 2.9, w: pw, h: 1.0,
    fill: { color: C.white },
    line: { color: C.border, width: 0.5 },
    rectRadius: 0.067,
    shadow: microShadow(),
  });
  s.addText("ADMINISTRAVIMAS", {
    x: px + 0.15, y: 2.98, w: pw - 0.3, h: 0.2,
    fontSize: 8, fontFace: F.label, color: C.gray,
    charSpacing: 0.5, shrinkText: true,
  });
  s.addText(svc.mgmt, {
    x: px + 0.15, y: 3.2, w: pw - 0.3, h: 0.45,
    fontSize: 24, fontFace: F.heading, bold: true,
    color: C.red, shrinkText: true,
  });
});

// ── SLIDE 7: Budget Summary ──────────────────────────────────
{
  const s = whiteSlide();
  addHeading(s, DATA.budgetSummary.heading);

  const headers = ["PASLAUGA", "REKLAMOS BIUDŽETAS", "ADMINISTRAVIMAS", "VIENKARTINIAI"];
  addTable(s, headers, DATA.budgetSummary.rows, {
    y: 1.4,
    colW: [3.0, 2.0, 2.0, 1.6],
  });

  // Totals row — subtle red accent
  const totY = 1.4 + 0.32 * (DATA.budgetSummary.rows.length + 1) + 0.1;
  const totals = DATA.budgetSummary.totals;

  addAccentLine(s, M.l, totY - 0.05, CONTENT_W);

  const colW = [3.0, 2.0, 2.0, 1.6];
  let colX = M.l;
  totals.forEach((val, i) => {
    s.addText(val, {
      x: colX + 0.08, y: totY, w: colW[i] - 0.16, h: 0.35,
      fontSize: 11, fontFace: F.heading, bold: true,
      color: i === 0 ? C.black : C.red, valign: "middle",
      shrinkText: true,
    });
    colX += colW[i];
  });

  // Footnote
  s.addText(DATA.budgetSummary.footnote, {
    x: M.l, y: totY + 0.5, w: CONTENT_W, h: 0.25,
    fontSize: 8, fontFace: F.body, color: C.gray,
    italic: true, shrinkText: true,
  });
}

// ── SLIDE 8: Timeline ────────────────────────────────────────
{
  const s = whiteSlide();
  addHeading(s, DATA.timeline.heading);

  const phases = DATA.timeline.phases;
  const phaseW = (CONTENT_W - 0.25 * (phases.length - 1)) / phases.length;

  phases.forEach((phase, i) => {
    const x = M.l + i * (phaseW + 0.25);
    const y = 1.8;
    const isActive = i === 0;

    // Phase circle — smaller (0.35" corporate)
    s.addShape(pptx.shapes.OVAL, {
      x: x + phaseW / 2 - 0.175, y, w: 0.35, h: 0.35,
      fill: isActive ? { color: C.red } : undefined,
      line: isActive ? { width: 0 } : { color: C.border, width: 1 },
    });
    s.addText(phase.num, {
      x: x + phaseW / 2 - 0.175, y, w: 0.35, h: 0.35,
      fontSize: 12, fontFace: F.heading, bold: true,
      color: isActive ? C.white : C.gray,
      align: "center", valign: "middle",
    });

    // Dashed connecting line
    if (i < phases.length - 1) {
      s.addShape(pptx.shapes.LINE, {
        x: x + phaseW / 2 + 0.175, y: y + 0.175,
        w: phaseW + 0.25 - 0.35, h: 0,
        line: { color: C.border, width: 1, dashType: "dash" },
      });
    }

    // Phase label — SemiBold, UPPERCASE
    s.addText(phase.label, {
      x, y: y + 0.45, w: phaseW, h: 0.3,
      fontSize: 10, fontFace: F.heading, bold: true,
      color: C.grayDark, align: "center", charSpacing: 1,
      shrinkText: true,
    });

    // Period
    s.addText(phase.period, {
      x, y: y + 0.7, w: phaseW, h: 0.2,
      fontSize: 9, fontFace: F.caption, color: C.gray,
      align: "center", shrinkText: true,
    });
  });
}

// ── SLIDE 9: Testimonial (Surface, Light Italic) ─────────────
{
  const s = warmSurfaceSlide();

  // Red accent line (no decorative quotes in corporate)
  addAccentLine(s, M.l + 0.5, 1.5, 0.5);

  // Quote — Light Italic
  s.addText(DATA.testimonial.quote, {
    x: M.l + 0.5, y: 1.8, w: CONTENT_W - 1.5, h: 1.8,
    fontSize: 19, fontFace: F.quote, italic: true,
    color: C.black, lineSpacingMultiple: 1.6,
    shrinkText: true,
  });

  // Author — SemiBold, Red
  s.addText(`— ${DATA.testimonial.author}, ${DATA.testimonial.role}`, {
    x: M.l + 0.5, y: 3.8, w: CONTENT_W - 1.5, h: 0.3,
    fontSize: 10, fontFace: F.caption,
    color: C.red, shrinkText: true,
  });
}

// ── SLIDE 10: Closing / CTA (Dark, NOT Red) ──────────────────
{
  const s = darkSlide();

  // AČIŪ
  s.addText(DATA.closing.thanks, {
    x: M.l, y: 1.2, w: CONTENT_W, h: 0.6,
    fontSize: 32, fontFace: F.heading, bold: true,
    color: C.white, align: "center", charSpacing: 3,
    shrinkText: true,
  });

  // Red accent line (centered)
  addAccentLine(s, 10 / 2 - 0.3, 2.0, 0.6);

  // CTA
  s.addText(DATA.closing.cta, {
    x: M.l, y: 2.2, w: CONTENT_W, h: 0.4,
    fontSize: 16, fontFace: F.body, color: C.white,
    transparency: 30, align: "center", shrinkText: true,
  });

  // Contact info — subtle
  s.addText(`${DATA.closing.email}\n${DATA.closing.website}`, {
    x: M.l, y: 3.0, w: CONTENT_W, h: 0.6,
    fontSize: 12, fontFace: F.body, color: C.white,
    transparency: 50, align: "center",
    lineSpacingMultiple: 1.5, shrinkText: true,
  });

  // Logo (inverse for dark bg) — bottom center
  s.addImage({
    path: LOGO_DARK,
    x: 10 / 2 - LOGO.w / 2, y: 4.2,
    w: LOGO.w, h: LOGO.dark.h,
  });
}

// ─────────────────────────────────────────────────────────────
// 6. EXPORT
// ─────────────────────────────────────────────────────────────

const OUTPUT = "APG_Media_Corporate_Proposal.pptx";
pptx.writeFile({ fileName: OUTPUT }).then(() => {
  console.log(`✅ Generated: ${OUTPUT}`);
  console.log(`   Slides: ${pptx.slides.length}`);
  console.log(`   Format: 16:9 (Corporate)`);
  console.log(`   Brand:  APG Media Corporate`);
  console.log(`   Font:   Source Sans Pro`);
  console.log(`   Red bg: 1 (title only)`);
  console.log(`   Logos:  SVG (${LOGO_LIGHT}, ${LOGO_DARK})`);
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
