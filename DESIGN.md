---
name: APK Infotech
description: Clear blue and white learning experiences, grounded in real photography.
colors:
  blue: "#0752d7"
  navy: "#142747"
  muted: "#556278"
  pale: "#f0f5ff"
  line: "#dce3ed"
  white: "#fff"
  blue-hover: "#003ca4"
  white-hover: "#e9f0ff"
  selection: "#bcd4ff"
  focus: "#d36b00"
  scrollbar: "#9eadc2"
  announcement-bg: "#edf3ff"
  announcement-text: "#24426f"
  announcement-link: "#064ac5"
  header-line: "#e8edf4"
  check-bg: "#e3f1ed"
  check-text: "#197158"
  photo-bg: "#e8eef7"
  strip-bg: "#f7f9fc"
  strip-line: "#e9edf3"
  strip-text: "#46566f"
  filter-text: "#4c5a70"
  search-muted: "#64738a"
  badge-text: "#32455f"
  tag-text: "#506787"
  details-line: "#edf0f5"
  story-text: "#4a5d7b"
  location-caption: "#53678b"
  closing-text: "#e2ecff"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 4.15vw, 60px)"
    fontWeight: 800
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.23
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
rounded:
  badge: "3px"
  control: "5px"
  button: "6px"
  symbol: "9px"
  floating-label: "10px"
  card: "12px"
  hero-photo: "16px"
  circle: "50%"
spacing:
  compact: "10px"
  control-gap: "14px"
  mobile-grid: "14px"
  card-gap: "20px"
  heading-gap: "24px"
  section-mobile: "52px"
  section-desktop: "88px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    rounded: "{rounded.button}"
    padding: "13px 22px"
  button-outline-hover:
    backgroundColor: "{colors.pale}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    rounded: "{rounded.button}"
    padding: "13px 22px"
  button-white-hover:
    backgroundColor: "{colors.white-hover}"
  category-filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.filter-text}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  category-filter-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  search:
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0 11px"
    height: "42px"
    width: "225px"
  main-navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
  activity-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
  past-activity-badge:
    backgroundColor: "{colors.white}"
    textColor: "{colors.badge-text}"
    rounded: "{rounded.badge}"
    padding: "3px 8px"
---

# Design System: APK Infotech

## Overview

**Creative North Star: "Learning in good company"**

The approved Coursera-inspired direction uses confident blue actions, navy typography, spacious white surfaces, and real photographs from APK’s supplied activity archive. Manrope keeps headings, navigation, and compact card metadata in one coherent voice.

Photographs provide the human character; restrained borders and pale blue sections organize the experience. The current implementation documents past workshops, internships, project reviews, and college engagement. Preserve that evidence boundary when extending its visual language.

**Key Characteristics:**
- Blue calls to action and clear navy headings.
- Real activity photography with meaningful captions.
- Rounded, bordered controls and cards with restrained depth.
- Responsive grids, native disclosure, and visible keyboard focus.

## Colors

The primary accent is a clear, saturated blue against white and cool neutrals. Frontmatter preserves the exact source values, including supporting colors already used in the page.

### Primary
- **Learning Blue** (`blue`): primary buttons, selected categories, heading emphasis, icons, text links, and the closing banner.
- **Deep Action Blue** (`blue-hover`): primary action hover state.
- **Pale Learning Blue** (`pale`): story section, empty results, and secondary-control hover.

### Neutral
- **Ink Navy** (`navy`): body text and headings.
- **Slate Copy** (`muted`): supporting paragraphs, notes, and metadata.
- **White** (`white`): page, header, cards, controls, and text over blue.
- **Cool Divider** (`line`): cards, filters, search, footer, and archive label borders.
- The remaining frontmatter colors are observed local treatments for announcement, photo fallback, captions, small check icon, selection, and focus. They are supporting treatments rather than additional brand accents.

**The Evidence Rule.** Photography and labels must describe the supplied past activities without implying a current offer or verified current venue.

## Typography

**Display and Body Font:** Manrope, Arial, sans-serif. Manrope is self-hosted in WOFF2 files at weights 400, 500, 600, 700, and 800, with `font-display: swap`.

The single geometric sans family combines bold, tightly tracked headings with small, calm labels. The implementation uses contextual sizes rather than a uniform mathematical type scale.

- **Display:** frontmatter `display`; hero heading, capped at 610px. CSS overrides to 47px at ≤1100px, 43px at ≤760px, and 38px at ≤420px.
- **Headline:** frontmatter `headline`; section headings. Story uses 37px and closing 33px; at ≤760px standard headings and closing use 29px, story uses 30px.
- **Title:** frontmatter `title`; activity-card heading. At ≤760px it uses 15px; at ≤420px it uses 19px.
- **Body:** frontmatter `body`; global default. Hero copy uses 16px/1.85 with a 480px maximum width, then 14px/1.9 on mobile. Supporting copy commonly uses 12–14px.
- **Label:** frontmatter `label`; category controls. Tags and image badges use 9px; disclosure uses 11px/700. Main navigation uses 13px/600. Preserve each component's context rather than enlarging all labels to body size.

## Layout

The desktop container is `min(1232px, calc(100% - 96px))`. At ≤1100px it becomes `calc(100% - 64px)`; at ≤760px it becomes `calc(100% - 40px)`. Standard section padding is 88px vertically, reduced to 52px on mobile. The sticky header is 86px high on desktop and 72px on mobile. Anchor scrolling reserves 95px above targets.

The hero uses `1.04fr 1fr` columns with a 62px gap, reduced to 35px at ≤1100px, then a single column at ≤760px. Story and location use equal columns with 83px and 95px gaps; both reduce to 45px at ≤1100px and stack at ≤760px. Section headings and the closing action row also stack on mobile.

Activity cards form four columns with a 20px gap, two at ≤1100px, and one at ≤420px. The mobile two-column grid uses a 14px gap. Card photos are 174px high initially, 220px at ≤1100px, 160px at ≤760px, and 210px at ≤420px. Desktop card title/summary minimum heights keep disclosure rows aligned; these minimums are removed at ≤1100px.

Category buttons wrap. Search stays beside filters on desktop (225px wide, then 185px at ≤1100px), and moves below them at ≤760px (full width, 45px high). The gallery uses `1.36fr 1fr` columns and two 260px rows, with its large photo spanning both rows; on mobile it becomes three rows of 330px, 250px, and 250px. Footer content also stacks on mobile.

## Elevation & Depth

Depth comes primarily from white surfaces, cool borders, pale-blue section backgrounds, and readable photo captions. The hero's floating caption has a persistent soft shadow; activity cards lift only on hover. Mobile navigation gains a light shadow when open.

- **Floating label:** `0 8px 35px #1228491f`.
- **Card hover:** `0 8px 24px #14274712`.
- **Mobile navigation:** `0 12px 20px #1427470e`.

Gallery captions use `linear-gradient(transparent, rgba(8, 20, 35, 0.92))`; the story caption uses `#142747e8`. Keep white caption text readable against photographs.

At widths ≥1000px the hero photo arrives over 0.75s with `cubic-bezier(0.16, 1, 0.3, 1)`, changing clipping and saturation. Links, buttons, and summaries transition color, background, and shadow over 0.18s; activity-card shadow transitions over 0.2s. Reduced-motion preference disables animations/transitions and smooth scrolling.

## Shapes

Use compact rounded rectangles: controls have 5px corners, buttons 6px, cards and gallery/location/story photo frames 12px, and the main hero photo 16px. The floating hero label uses 10px; the brand symbol and learning icon use 9px. Badges use 3px corners. Small checks and story-list dots are circular. Photograph frames clip their contents; cards use a fine border rather than a heavy stroke.

## Components

### Buttons and text links

Confident, compact actions pair bold labels with simple inline arrow SVGs. Standard buttons use 13px 22px padding, a minimum 48px height, 14px icon gap, 700 weight, and 6px corners. Primary is blue/white with deep-blue hover; outline is white/blue with blue border and pale hover; white is white/blue with a subtly blue-tinted hover. Navigation and location actions use a 44px minimum. Text links are blue, weight 700, and underline on hover with a 5px offset.

Global keyboard focus uses a 3px solid orange outline with 5px offset. The search input intentionally uses its container's blue `:focus-within` border instead of this outline. There is no implemented disabled, error, or active-press style to reproduce.

### Category filters and search

Category controls are native buttons in an accessible group, with `aria-pressed` and `aria-controls`. Selected buttons use blue fill/border and white text; unselected ones use white, a cool border, and slate text; hover becomes pale blue with blue text. Desktop padding is 10px 14px with a minimum 42px height.

Search is a labeled native search input in a bordered 5px-radius container with an inline icon. Query matching trims whitespace and ignores case, searching title, tags, and summary. Category and query combine. A screen-reader status announces the resulting count. Zero results display a pale full-row container and a primary Clear filters action that resets both states.

### Activity cards and native disclosure

Cards use white fill, a cool 1px border, 12px corners, and 20px 18px 16px body padding. A white Past activity badge sits over each real photo. Blue-gray tags precede a bold title and muted summary. Cards themselves are not links.

A native `details`/`summary` row opens additional archive context inline. Its top divider is subtle, its summary is blue and keyboard focusable, and its arrow rotates 90 degrees when open. Preserve native disclosure semantics rather than replacing it with a modal or implied enrolment action.

### Navigation

The white header remains sticky above the content, with a fine bottom border and navy links. Link hover changes to blue. At ≤760px a 44px menu button exposes `aria-expanded`/`aria-controls` and swaps its icon from three lines to a cross. The dropdown appears directly below the header as a vertical white panel; choosing any link closes it. No route-active style or modal focus trap is implemented. The site includes a keyboard-visible skip link.

### Photograph frames and captions

Images use `object-fit: cover` with per-image crop positions specified in CSS. Preserve subjects when changing frames. Gallery and story captions sit over dark overlays; the hero caption floats on white; the location caption sits on pale blue. Alt text describes the actual activity. External existing-site and map links open a new tab with `rel="noreferrer"`.

## Do's and Don'ts

### Do:
- **Do** use blue for primary actions, selected filters, and key text accents.
- **Do** preserve supplied photography, useful alt text, and explicit past-activity labels.
- **Do** keep the native disclosure, filter announcements, mobile menu semantics, and reduced-motion behavior.
- **Do** ground new factual content in client-approved evidence.

### Don't:
- **Don't** infer a current course catalogue, prices, placement outcomes, accreditation, or testimonials from archive photos.
- **Don't** present the photographed venue as a verified current branch.
- **Don't** add accounts, payments, enrolment, or LMS screens solely because Coursera is a visual reference.
- **Don't** replace the self-hosted Manrope family or introduce unrelated decorative palettes without an approved design change.
