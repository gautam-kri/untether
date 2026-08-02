# UNTETHER — Visual Design System

A reference for building on-brand decks, docs, and slides. Dark, editorial,
engineering-blueprint aesthetic: near-black field, off-white type, one red
accent, muted teal for technical labels. Uppercase, monospaced, precise —
reads like an instrument panel or a spec sheet, not a consumer app.

---

## 1. Design character (the vibe)

- **Near-black background, off-white type.** Never pure black, never pure white.
- **One red accent, used like a scalpel.** CTAs, the period in a headline, active states — that's it.
- **Muted teal for everything secondary:** labels, captions, annotations, technical body copy.
- **Uppercase + monospace + condensed-black.** Everything reads technical and deliberate.
- **Sharp, thin, geometric.** Max 2px corner radius, 1px hairline borders, no gradients, no drop shadows, no soft rounded friendliness.
- **Negative space is the luxury.** Lots of black, thin rules, tight geometry.
- **Hand-drawn line-art diagrams** in white 1px stroke, blueprint style.

---

## 2. Color palette

| Role | Name | Hex / value | Where it's used |
|---|---|---|---|
| Background | Ink black | `#060606` | Every background. Near-black, warm. |
| Primary text | Body white | `#F2F1EC` | Body copy + headings. Warm off-white — **never** `#FFFFFF`. |
| Diagram stroke | Line white | `#FFFFFF` | Illustration/diagram lines only. |
| Accent | Accent red | `#D93B3C` | CTAs, headline period, active/selected, key highlights. Sparingly. |
| Secondary text | Teal text | `#81ADAA` | Labels, kickers, captions, annotations, secondary body. |
| Deep accent | Blend teal | `#435C59` | Recessed accents, "passed/done" states. |
| Borders | Hairline | `rgba(129,173,170,0.25)` | All 1px dividers, tile borders, form underlines. Faint teal — **never gray**. |
| Overlay panel | Shutter fill | `#101312` | Transition panels / overlays. |

**Selection highlight:** red background, black text.
**Focus ring:** 2px solid `#D93B3C`, 2px offset.

### Quick copy block
```
Ink black      #060606   background
Body white     #F2F1EC   primary text
Line white     #FFFFFF   diagram strokes
Accent red     #D93B3C   the one accent
Teal text      #81ADAA   labels / secondary
Blend teal     #435C59   deep / recessed
Hairline       rgba(129,173,170,0.25)  borders
Shutter fill   #101312   overlays
```

---

## 3. Typography

Two typefaces, both deliberately unusual. **Display = condensed black sans.
Body = typewriter monospace.**

### 3.1 Display face — condensed heavy sans
- **Original:** `URW DIN Arabic Condensed Black`
- **Fallback stack:** `Bahnschrift, "Arial Narrow", system-ui, sans-serif`
- **Free substitutes for a deck:** **Bahnschrift** (ships with Windows), **Anton**, **Oswald** (700+), **Archivo Narrow / Archivo Expanded Black**.
- **Settings:** weight `900`, `font-stretch: 75%` (very condensed), `UPPERCASE`, letter-spacing `0.02em`, line-height `1.02`.
- **Used for:** the UNTETHER wordmark, all headings, tile/card titles, big stat numbers.

**Sizes**
| Token | Size | Notes |
|---|---|---|
| Hero wordmark | `clamp(2.5rem, 10.5vw, 9rem)` | Massive, single line. |
| Section heading | `clamp(2.25rem, 5vw, 4rem)` | Slide titles. |
| Tile / card title | `1.25rem` | Small headers. |
| Stat number | `2.5rem` | KPI figures. |

### 3.2 Body face — typewriter monospace
- **Original:** `TT2020 Base` (a clean modern typewriter face)
- **Fallback stack:** `ui-monospace, monospace`
- **Free substitutes:** **JetBrains Mono**, **IBM Plex Mono**, **Courier Prime**.
- **Settings:** weight `400`, line-height `1.7`, max line length `62ch`.
- **Used for:** all body copy, form fields, and the signature label style below.

### 3.3 The signature label ("annotation")
The tiny tracked-out uppercase mono label is a core texture — use it for
kickers, chips, captions, footnotes, axis labels.
- Font: monospace, `UPPERCASE`
- Size: `0.6875rem` (11px)
- Letter-spacing: `0.2em`
- Color: `#81ADAA` (teal) — or `#D93B3C` (red) when it's a live/emphasis label

### 3.4 The core heading unit (use this everywhere)
```
▬ TINY RED/TEAL UPPERCASE KICKER     ← 24px red rule + 11px tracked label
Big Condensed-Black Headline.        ← display face, the period often red
Monospace body copy in warm off-      ← body face, ~62ch wide
white, one calm paragraph.
```

---

## 4. Components & motifs

### Kicker
A 24px-wide, 1px **red** horizontal rule, followed by a tiny uppercase tracked
label (red or teal). Sits directly above every heading. This is the brand's
most repeated signature.

### Chip / tag
Tiny uppercase teal label inside a 1px **teal-hairline** box, 2px radius,
`4px 10px` padding.

### Tile / card
- Transparent fill, 1px hairline border, 2px radius, `32px` padding.
- **Hover:** border → red, lift `translateY(-4px)`.
- **Flagship/featured card:** red border instead of hairline.

### Dividers & ledger grid
1px hairline rules separate every list item, stat, and section — content sits
in a grid of thin lines, like an engineering ledger. Prefer top-borders on
stacked items over full boxes.

### Stat block
Big condensed-black number (`2.5rem`) over a tiny teal uppercase label, each
sitting under a 1px hairline top rule. Great for KPI rows.

### Line-art diagram (blueprint style)
- Strokes: `#FFFFFF`, `stroke-width 1.25`, round caps/joins, `non-scaling-stroke`, ~0.9 opacity.
- Leader lines & callout dots: `#81ADAA` (teal), thinner, ~0.7 opacity.
- Labels: teal, 11px, uppercase, `0.2em` tracking.
- Nodes = thin circles or rounded rects; connectors = thin arrowed lines.
- The red accent appears as **one** highlighted edge/element, not everywhere.
- Optional 45° hatching at 35% opacity for "filled" regions.
- Boxes-and-arrows pipelines read left→right.

### Forms
No boxes. Inputs are just a bottom **hairline** that turns **red** on focus.
Transparent fill, off-white text, mono font.

### Buttons
- **Primary:** solid red fill, black text, 44px tall, uppercase, `0.2em` tracking, 11px, weight 700, 2px radius. Hover → inverts (border/edge to off-white).
- **Secondary:** transparent, red 1.5px border, red text; hover fills red with black text.

### Custom cursor (web only, for reference)
A red reticle dot that expands into four corner brackets over interactive
elements — a camera-viewfinder feel. (Skip in a deck, but it's the spirit.)

---

## 5. Layout

- Max content width ~`1280px`; side padding `24–40px`.
- Fixed thin **banner** (34px) above a fixed **96px navbar** with an 85%-black
  blurred backdrop; both underlined by a hairline.
- Content lives in a tall dark field with generous negative space.
- Optional thin **red progress rail** on the right edge (section dots).
- Two-column splits favor `~55% / 45%`.

---

## 6. Motion (for animated slides / video)

- **Signature easing:** `cubic-bezier(0.76, 0, 0.24, 1)` — a mechanical ease-in-out.
- **UI transitions:** ~`200ms`.
- **Page transitions ("shutter wipe"):** opaque `#101312` panels sweep
  horizontally with a thin teal leading edge — like a camera shutter or a
  sliding blast door. ~`600–780ms`.
- **Headlines:** letters rise up from behind a mask.
- **Diagrams:** strokes trace on when they enter view (~1200ms draw).
- All motion respects `prefers-reduced-motion` (disabled).

---

## 7. Do / Don't

**Do**
- Keep red rare and intentional.
- Set labels in tiny tracked-out uppercase mono.
- Use hairline rules instead of boxes and shadows.
- Let black space breathe.
- Keep headings condensed-black and uppercase.

**Don't**
- Use pure white text or pure black background.
- Add gradients, drop shadows, or rounded "friendly" corners (>2px radius).
- Use gray borders (borders are faint teal).
- Introduce a second accent color.
- Mix in a rounded humanist sans — the tension is condensed-black × typewriter-mono.

---

## 8. One-line brief for a design tool

> Dark engineering-blueprint aesthetic: `#060606` near-black background,
> `#F2F1EC` off-white type, one red accent `#D93B3C`, muted teal `#81ADAA`
> for labels. Condensed-black uppercase sans (Bahnschrift/Anton) for headings,
> typewriter monospace (JetBrains Mono) for body plus tiny tracked-out teal
> uppercase labels. 1px teal-hairline dividers and 2px-radius tiles, hand-drawn
> white line-art diagrams, no gradients or shadows. Precise, editorial,
> instrument-panel restraint.

---

## 9. Design tokens (copy-paste)

```css
:root {
  /* Color */
  --ink-black:   #060606;  /* background */
  --body-white:  #F2F1EC;  /* primary text */
  --line-white:  #FFFFFF;  /* diagram strokes */
  --accent-red:  #D93B3C;  /* the one accent */
  --teal-text:   #81ADAA;  /* labels / secondary text */
  --blend-teal:  #435C59;  /* deep / recessed accent */
  --hairline:    rgba(129,173,170,0.25); /* borders */
  --shutter-fill:#101312;  /* overlays */

  /* Type */
  --font-display: "URW DIN Arabic Condensed Black", Bahnschrift, "Arial Narrow", sans-serif;
  --font-body:    "TT2020 Base", "JetBrains Mono", ui-monospace, monospace;

  /* Motion */
  --ease-mech: cubic-bezier(0.76, 0, 0.24, 1);
  --dur-ui: 200ms;
  --radius: 2px;
}

/* Heading */
.display {
  font-family: var(--font-display);
  font-weight: 900;
  font-stretch: 75%;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.02;
  color: var(--body-white);
}

/* Body */
.body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.7;
  color: var(--body-white);
  max-width: 62ch;
}

/* Signature label */
.label {
  font-family: var(--font-body);
  text-transform: uppercase;
  font-size: 0.6875rem;   /* 11px */
  letter-spacing: 0.2em;
  color: var(--teal-text);
}
```
