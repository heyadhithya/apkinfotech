# APK Infotech landing page design

## Goal
Create an attractive, responsive landing page in the existing Next.js starter. Use Coursera as an inspiration for clear learning discovery and a confident blue-and-white identity while retaining APK Infotech branding. Use the uploaded masterdata.zip for genuine photography. Do not reproduce Coursera branding or imply affiliation.

## Evidence and content limits
The supplied archive contains 80 JPEG photos and two MP4 videos grouped into DevOps/Docker workshop, college MOU event, project review/internship/certification, and summer internship collections. Folder titles describe supplied media, not proof of currently available courses or enrolment dates. One inspected photo contains a GPS overlay naming Mannivakkam, Tamil Nadu, with address 6/185a, Maneswarar Nagar, Mannivakkam, Tamil Nadu 600048 and coordinates 12.892882, 80.064307. Present this as a photographed training venue, not a verified official branch. No fees, course durations, placement guarantees, ratings, enrolment counts, testimonials, or phone/email details are supplied. The existing site could not be accessed because the environment proxy returned 403.

## Recommended design
Use a white navigation bar, deep blue primary actions, generous whitespace, dark navy text, and large editorial headings. The hero pairs a concise learning-oriented headline with genuine classroom photography. Avoid fake dashboards, stock learner portraits, invented outcome metrics, and decorative partner logos.

The page contains:
1. Header with APK Infotech wordmark and anchor navigation for learning areas, learning experience, gallery, and location.
2. Hero with Explore learning areas and See our workshops actions.
3. Learning-area discovery cards for the archive-supported topics: DevOps and Docker workshops, summer internships, and project reviews. Label them as learning activities; do not imply open enrolment. A search input filters these cards and shows an accessible empty state. Selecting a card reveals its evidence-based description and relevant photography.
4. Learning experience section explaining workshops and project activity without promises about outcomes.
5. A curated, responsive photo gallery showing the supplied events with accurate category captions. Preserve originals and avoid altering identities; optimize selected derivatives for the web.
6. Location section showing the photographed Mannivakkam venue, its provenance, and a Google Maps coordinate link. Do not invent further branches.
7. Closing action directing visitors to the existing APK Infotech website for current programme and contact information, accurately labelled as an external link. Do not add an enquiry form without a delivery destination.
8. Simple footer with section navigation and source website link.

## Architecture and behavior
Keep the existing Next.js App Router and TypeScript stack. Use a server-rendered page for main content and a small client component for learning-area filtering and detail expansion. Store selected media locally in public with clear filenames; retain the uploaded archive unchanged. No accounts, payments, database, external services, or new product dependencies are needed. Navigation and actions must work, and keyboard interactions must have visible focus. Respect reduced motion. Use responsive layouts from 360px through desktop, semantic headings, informative alt text, and adequate color contrast.

## Verification
Run npm run check and python3 scripts/check-setup.py. Start the app and verify the page responds successfully. Inspect desktop and mobile layouts where browser tools are available; verify search, no-results behavior, detail expansion, navigation, and map/external links. Report unavailable visual checks accurately. No deployment or publication is included.

## Review decision
Approve this design before implementation planning. A course catalogue, phone/email, or additional verified branches can be incorporated when supplied; missing details will not be invented.
