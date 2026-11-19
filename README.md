# Deckhand Removals (`next-moving-steady`)

A static Next.js website template for removalists and moving companies — built around a bold truck-orange and kraft-cardboard theme (**Steady removalist**). All business names, phone numbers, routes and prices in the shipped copy are fictitious sample data for the Jamstacks gallery.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview locally.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: loading-day hero, starting hourly rate, service cartons, truck guide teaser, 5-step move day, interstate route board, checklist teaser and `MovingCompany` JSON-LD |
| `/moves/` | Home truck rates (`#home`), office relocations (`#office`), interstate schedule (`#interstate`) and extras/fees docket |
| `/packing/` | Packing and unpacking crew rates, boxes & supplies depot shelf (with `inStock` tape flags) and 4-step packing tips |
| `/trucks/` | Interactive truck size picker with cargo-box volume fill, compliance spec plates, "What fits" chart and dispatcher tips |
| `/checklist/` | Printable, browser-saved moving checklist grouped by time before the move, plus the first-night box list |
| `/contact/` | Quote enquiry page: consignment note tips, hosted Jamstacks support form when configured (or visible email fallback), phone, office hours and service area |
| `/404.html` | "Lost in transit" static error page |

## Make it yours

Edit page-specific headings, introductions and calls to action directly in each route's `app/**/page.tsx` file. Edit structured collections and shared business details in `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, email, phone (`phone` & `phoneE164`), service area, `officeHours` (`Australia/Brisbane`), enquiry disclaimer and message tips |
| `content/trucks.ts` | Fleet (`id`, `name`, `tonnes`, `bodyLengthM`, `capacityM3`, `crew`, `hourlyRate`, `minimumHours`, `suits`, `inService`). The "from $X" rate on Home, Moves, metadata and JSON-LD derives from the cheapest `inService: true` truck |
| `content/home-sizes.ts` | Interactive truck picker options (`home` and `office`), estimated `volumeM3`, `truckId` reference and `trips` (`1` or `2`) |
| `content/fits.ts` | Approximate load counts (`sofas`, `beds`, `fridges`, `cartons`) per in-service truck |
| `content/routes.ts` | Weekly interstate runs (`to`, `state`, `distanceKm`, `transitDays`, `departs`, `sharedPerM3`, `minimumM3`, `running`) |
| `content/services.ts` | Move types (prices derived from `trucks.ts`, `routes.ts` and `packingServices`), packing crew rates and extras/fees |
| `content/supplies.ts` | Boxes and packing supplies (`size`, `price`, `unit`, `inStock`, `note`, `shelf`). Flip `inStock` to `false` to stamp `"OUT OF STOCK"` tape without removing the item |
| `content/checklist.ts` | Moving checklist groups, tasks and the `firstNightBox` list |
| `site.config.json` | Public site `name`, `description`, `domain`, `timeZone` (`Australia/Brisbane`) and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("Depot daylight") and dark ("Night run") palette tokens, textures, responsive tables, motion and print styles |
| `components/artwork/*` | Bespoke inline SVG illustrations (Loading day hero, scaled trucks, east-coast route map, supplies shelf, 404 scene and matching icons) |
| `lib/structured-data.ts` | `MovingCompany` JSON-LD derived from content and escaped via `jsonLd()` |
| `app/sitemap.ts` | Public routes included in `sitemap.xml` |

### Frequent owner edits

- **Update box stock or prices**: edit `inStock` or `price` in `content/supplies.ts` (for example setting `mattress-bag` to `inStock: true` or changing `tea-chest` `price` to `7.5`).
- **Update truck hourly rates or take a truck off the road**: edit `hourlyRate` or `inService` in `content/trucks.ts`. Taking `dinghy` out of service automatically updates the "from $159" rate across Home, Moves, metadata and schema.
- **Change interstate departure days**: edit `departs` or `running` in `content/routes.ts`.
- **Change office phone hours**: edit `officeHours` in `content/business.ts` (same-day intervals only; time zone lives in `site.config.json`).

## Fonts and visual system

Self-hosted via npm (all SIL Open Font License 1.1):
- **Anton** (`@fontsource/anton`) — uppercase display headings, truck signwriting and numerals
- **Hanken Grotesk** (`@fontsource-variable/hanken-grotesk`) — body copy and tabular-numeral tables
- **Permanent Marker** (`@fontsource/permanent-marker`) — carton labels, sublabels and handwritten notes

Light ("Depot daylight") and dark ("Night run") modes use CSS custom properties in `app/tailwind.input.css` wired to `jamstacks`' `ThemeProvider`, `ThemeScript` and `DarkModeToggle`. Print styles hide navigation, buttons and decorative chrome to print the moving checklist with empty checkboxes and the first-night box.

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never add private credentials or business content there.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID shows email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Only `/contact/` renders `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js` when a site ID is configured. `SiteLink` uses full-document navigation to and from `/contact/`. All copy frames quote requests as enquiries, never confirmed bookings or orders.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Gallery publishing assets

`jamstacks/` holds removable source-gallery metadata and captures (`jamstacks/config.json`, `home-light.jpg`, `home-dark.jpg`, `screenshots.json`). Normal builds, tests and GitHub Pages work without it. To validate gallery assets after a fresh normal build:

```sh
node --test jamstacks/config.test.mjs
```
