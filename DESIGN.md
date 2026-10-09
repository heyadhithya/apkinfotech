---
name: APK Infotech
description: A photographic programme prospectus in official navy and gold on warm white.
colors:
  navy: "#081d37"
  blue: "#173f75"
  muted: "#536078"
  gold: "#956811"
  paper: "#fbfaf7"
  line: "#dce1e5"
  white: "white"
  selection: "#e8d6aa"
  scrollbar: "#9aa8b9"
  outline-hover: "#edf1f5"
  white-hover: "#eee7d9"
  image-placeholder: "#e9e8e1"
  search-border: "#a3acb7"
  empty-bg: "#eeeae1"
  archive-bg: "#f0eee8"
  archive-line: "#e1ddd4"
  archive-details-line: "#d2cdc2"
  contact-muted: "#c9d4e1"
  contact-link: "#eed39a"
  contact-line: "#36506b"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 4.3vw, 62px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  course-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  archive-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  hero-copy:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  wordmark:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  wordmark-caption:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 600
    letterSpacing: "0.12em"
  wordmark-caption-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "8px"
    fontWeight: 600
    letterSpacing: "0.12em"
  caption:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  filter-label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  support-copy:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  archive-title-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  course-title-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  headline-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  display-narrow:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  contact-headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "42px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  display-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  display-compact:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "46px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
rounded:
  badge: "2px"
  logo: "3px"
  control: "4px"
  course-card: "12px"
spacing:
  compact: "12px"
  control-gap: "14px"
  mobile-card-gap: "20px"
  layout-gap: "24px"
  course-grid-gap: "28px"
  section-mobile: "48px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.navy}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "{colors.outline-hover}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-white-hover:
    backgroundColor: "{colors.white-hover}"
  category-filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  category-filter-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    width: "285px"
  course-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.course-card}"
  archive-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.badge}"
    padding: "2px 8px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
---

# Design System: APK Infotech

## Overview

**Creative North Star: "Programme prospectus"**

The approved programme prospectus uses the intact official APK logo, warm white paper, navy text and actions, and restrained gold emphasis. Self-hosted Manrope and readable supporting copy let programme names, practical content, and documentary photography lead.

Use archive photographs as evidence of past APK activities, with explicit captions. Programme names, registration, and contact information come from the official website recorded in `docs/official-site-sources.json`; photographs do not establish individual current course sessions. The current page keeps one programme directory, one archive, and compact FAQ/contact content.

**Key Characteristics:**
- Official navy/gold identity on warm white.
- Readable Manrope with restrained heading weights.
- Two-column photographic programme cards.
- Flat surfaces, native disclosures, and bounded motion.

## Colors

Official navy and gold sit on warm white. Frontmatter contains the exact source colors; local neutrals support photographs, borders, empty results, and the dark contact section.

- **Navy** (`navy`): headings, selected category controls, and contact background.
- **Action Blue** (`blue`): primary actions, links, and registration rows; primary hover deepens to navy.
- **Gold** (`gold`): hero emphasis, course categories, and focus outlines.
- **Paper** (`paper`): page and sticky header. White is reserved for programme cards, search, and the dark-section action.
- **Muted** (`muted`): supporting copy and archive captions. Fine cool dividers organize white content; warmer dividers organize the archive.

**The Evidence Rule.** Archive images describe past APK activity; they do not verify current course sessions or the current office.

## Typography

Manrope is self-hosted with WOFF2 weights 400, 500, 600, 700, and 800 and `font-display: swap`; Arial and sans-serif are fallbacks. Frontmatter records actual roles and responsive sizes rather than an invented mathematical scale.

- Hero: `display`, weight 600; 46px at ≤1100px, 44px at ≤760px, and 38px at ≤480px. Supporting copy is 17px/1.75, becoming 16px on mobile; maximum width is 470px.
- Section heading: 36px/700, becoming 30px at ≤760px. Contact heading is 42px/600, becoming 36px on mobile.
- Programme heading: 24px/700, becoming 22px on mobile. Archive heading: 20px/700, becoming 19px on mobile.
- Body: 16px/400 with 1.65 line height. Programme summaries and FAQ questions use 15px; disclosure copy and actions use 14px; filter/status/category labels use 13px; photograph captions use 12px.
- Official wordmark: 18px/800 with a 9px/600 tracked caption; mobile uses 16px and 8px. Preserve these logo-specific roles separately from reading text.

## Layout

The main container is `min(1200px, calc(100% - 112px))`; at ≤1100px its width is `calc(100% - 64px)` and at ≤760px `calc(100% - 48px)`. Section spacing is 72px vertically, becoming 48px on mobile. The sticky header is 88px tall, becoming 76px on mobile; anchor offsets are 105px and 90px respectively.

Hero columns are `1.1fr 1fr` with a 64px gap, reduced to 36px at ≤1100px. At ≤760px they stack with a 30px gap. Hero image ratios are 1.38 desktop, 1.8 mobile, and 1.55 at ≤480px. Mobile actions stack at ≤480px.

The initial four programmes form a 2×2 grid with a 28px gap; all seven retain two columns. At ≤760px the gap becomes 20px; at ≤680px the directory becomes one column. Programme photos use a 2.2 aspect ratio. The archive uses four columns with a 22px gap, two at ≤1100px, and one at ≤480px. Archive images use a 1.45 ratio, becoming 1.7 at ≤480px. Archive title/summary minimum heights are removed at ≤1100px.

Filter buttons wrap. Search is 285px wide and moves to full width at ≤1100px. FAQ columns are `0.8fr 1.2fr` with a 70px gap, stacking at ≤760px. Contact columns are `0.9fr 1.1fr` with a 96px gap (54px at ≤1100px), stacking at ≤760px. Phone/email columns are two on desktop, one at ≤1100px, two at ≤760px, and one at ≤480px. Footer groups stack on mobile.

## Elevation & Depth

The system is flat: no box shadows are implemented. Depth comes from warm page/archive layers, white programme cards, fine borders, framed photographs, and a solid navy contact section.

One hero frame reveal uses `archive-frame` for 600ms, clipping from `inset(0 7% 0 0)` to `inset(0)`; its image settles from scale 1.035 to 1 over 850ms. Both use `cubic-bezier(0.16, 1, 0.3, 1)`. Fine-pointer hover scales programme images to 1.025 over 240ms. Arrow and disclosure transforms use 180ms with that easing; interactive colors/borders use 160ms with default easing. Reduced-motion disables transitions, animations, spatial hover transforms, and smooth scrolling while retaining content and disclosure states.

## Shapes

Controls, hero/archive image frames, and inner programme photo frames use restrained 4px corners. White programme containers use 12px corners; the official logo uses 3px and archive badges 2px. Programme photographs are inset 12px inside cards. Borders remain thin; no pills or ornamental subject tiles are implemented.

## Components

### Buttons and links

Actions use 14px/600 labels, 12px 20px padding, 48px minimum height, 14px icon gap, and 4px corners. Primary is action-blue/white; outline is transparent with blue text/border and cool hover; white is white/navy with warm hover. Text links are blue and underline on hover. Button/link arrows translate 3px on hover or keyboard focus. Global focus is a 3px gold outline with 5px offset.

### Filters and search

Native category buttons use `aria-pressed` in an accessible group and reference their results container. They have 44px minimum height and 13px text; selected controls are navy/white, while unselected ones are transparent/muted with a thin border. Hover changes text/border to navy.

Native labeled search fields have white fill, 4px corners, 44px minimum height, and a 13px input. The containing field gets a 2px gold focus outline with 3px offset. Case-insensitive trimmed query and category filters intersect. Course search matches title, category, description, and topics; archive search matches title, tags, and summary. Result counts are announced.

### Programme directory

Photographic white cards use a cool 1px border and 12px outer corners. Body padding is 18px 26px 23px, becoming 16px 20px 20px on mobile. An archive caption sits below every photo; gold category text precedes the programme heading. There are no subject icons or topic chips.

Four featured programmes appear initially. The expand button toggles all seven with `aria-expanded` and `aria-controls`. Active query/category filtering shows all matches regardless of featured state. Clear course filters resets to the four featured programmes; the empty-state Show all courses action clears filters and expands all seven. Native Programme overview disclosure rotates its chevron 180 degrees. Register interest opens the official registration form in a new tab with a course-specific accessible label.

Programme photos default to `object-position: center 46%`. Workshop-presentation, classroom-discussion, and internship-classroom frames use `center top` to keep embedded GPS labels outside the visible crop. Preserve those frame-specific crops and original photo provenance; do not treat them as images of the named current course.

### Activity archive

Archive cards remain unboxed on the warm archive section. A paper badge labels each image Past activity. Title, summary, and native View activity disclosure sit beneath. The disclosure arrow rotates 90 degrees when open. Empty results use a warm flat panel with a reset action. The archive is the single photographic activity collection rather than several duplicated story/gallery surfaces.

### Navigation and official identity

Header/footer retain the full official logo image and separate wordmark. The image is contained at 65px × 52px, becoming 55px × 44px at ≤760px. Navigation links cover Courses, Activities, and Contact plus official registration. At ≤760px a 44px menu button toggles a vertical paper panel directly below the sticky header, with `aria-expanded`/`aria-controls`; selecting a link closes it. Preserve the keyboard-visible skip link. No active-route, disabled, error, or modal state is implemented.

### FAQ and contact

FAQ uses native details with browser disclosure markers, thin dividers, 20px summary padding, and 14px answer text. Contact consolidates the official office, map link, phones, email, and WhatsApp on navy; supporting text is pale, links are gold-tinted, and its action is white. Call-ahead guidance remains visible. External links use `target="_blank"` and `rel="noreferrer"`; phone and email actions use native URLs.

## Do's and Don'ts

### Do:
- **Do** preserve the full official logo without redrawing, recoloring, or cropping it.
- **Do** label archive photography as past activity and preserve meaningful alt text.
- **Do** use navy actions, gold emphasis, warm white space, and the observed readable type roles.
- **Do** retain keyboard focus, native disclosure, filter announcements, and reduced-motion behavior.

### Don't:
- **Don't** imply photographs show a specific current course session or the current office.
- **Don't** invent fees, batches, durations, placement guarantees, ratings, or accreditation.
- **Don't** restore decorative subject icons, pastel course panels, or duplicate story/gallery sections.
- **Don't** introduce looping motion, repeated scroll reveals, or card hover shadows.
