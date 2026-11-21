# Vagabode — DESIGN.md

The design system for the Vagabode website concept by Beyond Branding. It follows the open-source DESIGN.md format popularised by `VoltAgent/awesome-design-md`. Commerce rules are adapted from Nike's file there. The visual restraint comes from Banjaaran Studio and A Kind of Guise.

## 1. Principle

**The garment carries the colour. The interface stays quiet.** Every Vagabode print is a painting, a film or a place. The chrome is ivory, ink and olive, so the shirts do the talking. Story-led layouts take their cue from Story mfg.; product presentation follows A Kind of Guise's restraint.

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F1EADF` | Page background (Gallery Ivory) |
| `ink` | `#292821` | Text, primary buttons, logo |
| `olive` | `#77745E` | Eyebrows, secondary text accents (Museum Olive) |
| `terra` | `#A84C35` | Compass needle, logo sparkles, sale price, selected markers. Use sparingly. |
| `earth` | `#8B7465` | Rare supporting tone |
| `stone` | `#D8CCB9` | Image wells, mockup backgrounds (Warm Stone) |
| `stone2` | `#E6DCCC` | Product card image background, Print Lab band |
| `night` | `#1C1B16` | Footer |

Rules: no gradients, no glass, no floating shadows on cards. Terracotta never fills a large area. The one exception is the styling banner's single CTA.

## 3. Type

- **Wordmark:** the Vagabode logo, traced from the master artwork into SVG (letters, three sparkles, eight dial ticks, compass star). Never retype it.
- **Everything else:** **Jost** (300/400/500). It is a clean geometric sans in the Futura family, as used by Banjaaran Studio.
- Eyebrows and buttons: Jost 500, 11.5–12.5px, UPPERCASE, letter-spacing 0.16–0.2em.
- Headlines: Jost 400, 32–52px, line-height 1.08, letter-spacing −0.012em. A second clause may shift to `olive`, with no italics.
- Body: Jost 300, 16–17.5px, line-height 1.65.
- Product names: Jost 400, 17px. Prices: Jost 500.

## 4. Components

- **Buttons:** 2px radius (near-square), 50px tall, uppercase tracked label. One primary (`ink`) per surface. The secondary is a 1px ink outline. No pills.
- **Text link CTA (`.more`):** uppercase tracked label with a 1px underline.
- **Collection tabs:** text tabs with a 2px underline for the active state, on a hairline rule. They replace pill filters.
- **Product card:** the photograph is the card. Zero radius, zero shadow, a 4:5 image on `stone2`. A collection label sits as an ivory chip at the bottom left, with a square wishlist button at the top right. Below: name, artist line, an optional one-line story, then price. The original price is struck through, and the discount appears as **terracotta text, not a badge**.
- **Hover:** the photo swaps to the Print Lab mockup where one exists.
- **Size picker:** 2px-radius squares with a hairline border. The selected size is filled in ink.
- **Satchel:** a right-hand drawer. Checkout sends one prefilled WhatsApp message.

## 5. Motion

- Lenis smooth scroll (lerp 0.09). Touch scrolling stays native.
- **Logo:** letters are drawn in ink strokes, then fill. Dial ticks pop in clockwise. Sparkles spin in, then twinkle every few seconds. The compass star is spring-damped: it settles on north and follows the cursor.
- **Print Lab:** WebGL ink-bleed transition between prints on a single studio shirt mockup, with a slight cloth breathing motion.
- Reveals: fade up 22px over 1s. Respects `prefers-reduced-motion`.

## 6. Layout

- Max content width 1360px. Side padding `max(4vw, 18px)`.
- Product grid: 3 per row on the home page, 3–4 in the shop, 2 on phones.
- Section rhythm: 64–120px vertical.

## 7. Voice

Taken from Vagabode's own captions: witty, art-literate and warm. For example: "art history, but made it wearable", "main character energy", "Come for the clothes, stay for the styling." The brand is gender-neutral and serves every body, with custom sizes up to 4XL.
