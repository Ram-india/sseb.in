# SSEB React Frontend

React + Vite + Tailwind port of the PHP site at the repository root.

## Converted so far

The site chrome — header, navigation and footer — is converted from
`header/header.php` and `header/footer.php`:

| React file | PHP source |
|---|---|
| [src/components/Header.jsx](src/components/Header.jsx) | `header/header.php` — dark contact bar + logo row |
| [src/components/Navigation.jsx](src/components/Navigation.jsx) | `header/header.php` — Bootstrap navbar with dropdowns |
| [src/components/Footer.jsx](src/components/Footer.jsx) | `header/footer.php` — 4-column footer + subfooter |
| [src/components/Layout.jsx](src/components/Layout.jsx) | the `meta → header → content → footer` include contract |
| [src/components/ScrollToTop.jsx](src/components/ScrollToTop.jsx) | `.scrollToTop` circle from `template.js` |
| [src/data/site.js](src/data/site.js) | menu tree, contact details, company blurb |
| [src/components/Icons.jsx](src/components/Icons.jsx) | the handful of Font Awesome glyphs the chrome used |

Notes on the conversion:

- The nav tree lives in one place (`src/data/site.js`) and feeds both the header
  menu and the footer link columns, replacing the repeated `strpos($_SERVER['PHP_SELF'], …)`
  active-state checks — `NavLink` and the current route do that now.
- Icons are inline SVG, so no Font Awesome / Fontello webfont is loaded.
- Theme colours from `assets/css/custom.css` and `assets/css/style.css` are
  exposed as Tailwind colours: `navy` `#050c3f`, `accent` `#09afdf`, `teal` `#09bfbb`.
- Chrome assets are copied to `public/assets/` (`sseb_logo_1.png`, `sseb-logo.png`,
  `f_bg.jpg`). The PHP footer pointed at `assets/img/sseb_logo.png`, which does not
  exist in the repo; `sseb-logo.png` is used instead.
- The subfooter year is rendered from `new Date()` rather than the hard-coded 2020.

## Motion

Smooth scrolling is [Lenis](https://github.com/darkroomengineering/lenis), mounted once from
`Layout` via [SmoothScroll.jsx](src/components/SmoothScroll.jsx). It smooths the *native*
scroll rather than transforming the page, so `position: sticky`, the fixed header and every
scroll-linked animation keep working. Anything that jumps the page (route changes,
back-to-top) goes through `getLenis()` so the two never fight over scroll position.

Scroll effects, all disabled under `prefers-reduced-motion`:

| Component | Effect |
|---|---|
| [Reveal.jsx](src/components/Reveal.jsx) | Fade + lift on enter (Framer `whileInView`), staggered by `delay` |
| [ScrollDrift.jsx](src/components/ScrollDrift.jsx) | Scroll-linked drift; opposing `distance` values in a row give layered parallax |
| [ProjectShowcase.jsx](src/components/ProjectShowcase.jsx) | Pinned section, vertical scroll drives horizontal card travel |
| [StackedCards.jsx](src/components/StackedCards.jsx) | Sticky cards that overlap, shrink and dim as they're covered |
| [useParallax.js](src/hooks/useParallax.js) | Lightweight rAF parallax (chairman photo, footer texture) |
| [CountUp.jsx](src/components/CountUp.jsx) | Stat counters that count on entry |

The pinned and stacked effects hijack scroll, so both fall back to plain layouts below
1024px as well as under reduced motion.

## Design system

Type is **Plus Jakarta Sans** for headings and **Inter** for body/UI.
[src/index.css](src/index.css) holds the fluid type scale (`.display-1`, `.display-2`,
`.title-md`, `.lead`), the `.eyebrow` / `.prose-corporate` text styles, and the
`.btn-*` pill buttons — so every size and weight is defined once.

### Colour tokens and theming

Colours are CSS variables, not fixed Tailwind palette entries, which is what makes
light and dark one set of markup. `:root` defines light, `.dark` overrides it, and
`tailwind.config.js` maps each to a utility:

| Token | Role |
|---|---|
| `page` / `surface` / `subtle` | page background, cards, tinted bands |
| `line` | borders and rules |
| `ink` / `body` / `muted` | headings, paragraphs, secondary text |
| `accent` | brand action colour (azure) |
| `deep` / `deep-ink` | bands that stay dark in both themes (hero, CTA) |

So `bg-surface text-body border-line` works in either theme with no `dark:` variants.
Use these rather than `slate-*` or literal hex.

**Dark mode** is class-based. An inline script in `index.html` resolves the theme
before first paint (stored choice → OS preference) so there's no flash;
[ThemeToggle.jsx](src/components/ThemeToggle.jsx) in the header flips and persists it,
and follows the OS until the user chooses explicitly.

## SEO

`header/meta.php` was a 100-line `strpos($_SERVER['PHP_SELF'], …)` chain choosing a
title/description/keywords per page. That map now lives in [src/lib/seo.js](src/lib/seo.js),
keyed by route, and [src/components/Seo.jsx](src/components/Seo.jsx) (rendered once
from `Layout`) applies it on every navigation — title, description, keywords, plus a
canonical link and Open Graph tags the PHP site did not have. The site-wide
`Language` / `Distribution` / `author` tags sit in `index.html`.

Two things to know before this goes live:

- **URLs lose the `.php` suffix.** [public/.htaccess](public/.htaccess) 301-redirects
  every old URL to its React route so existing rankings carry over, and provides the
  SPA fallback. It ships in `dist/` automatically.
- **Meta tags are applied client-side.** Googlebot renders JS and will see them, but
  other crawlers and link unfurlers read the raw HTML and get the `index.html`
  defaults. If that matters, the fix is to prerender the routes at build time.

## Converted pages

| Page | PHP source |
|---|---|
| [src/pages/Home.jsx](src/pages/Home.jsx) | `index.php` |

The hero is [src/components/HeroSlider.jsx](src/components/HeroSlider.jsx), replacing
Revolution Slider with the same 11 slides and captions. It autoplays with a progress
bar, pauses on hover / keyboard focus / hidden tab, and supports arrows, dots, swipe,
arrow keys and an explicit play-pause. Only three images mount on first paint (current
plus neighbours); the rest load as you advance. `prefers-reduced-motion` disables
autoplay and the Ken Burns push-in.

Everything else is still a placeholder — pages are being converted one at a time.

## Available pages
- `/`
- `/contact`
- `/about/company-profile`
- `/about/director-profile`
- `/about/educational-trust`
- `/about/quality-policy`
- `/about/vision-mission`
- `/careers/apply-online`
- `/careers/careers-in-sseb`
- `/careers/employment`
- `/projects/completed-projects-list`
- `/projects/completed-projects`
- `/projects/on-going-projects`
- `/projects/completed-projects/:slug`
- `/work-with-us/how-we-work`
- `/work-with-us/safety`

## Run locally

1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Build

`npm run build`
