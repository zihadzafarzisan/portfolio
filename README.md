# ZISAN — Personal portfolio

A dark editorial portfolio for **Zihad Zafar Zisan**, a CSE undergraduate at BRAC University. Built with Next.js 16, React 19, TypeScript, vanilla CSS, Lucide, and Framer Motion. Fonts are self-hosted: Anton, Manrope, and Caveat (licenses in `public/fonts/`).

## Run locally

Use Node.js **22.18 or newer**. The repository uses pnpm; npm commands work after dependencies are installed.

```powershell
npx.cmd --yes pnpm@11.20.0 install --frozen-lockfile
npm.cmd run dev
```

Open http://localhost:3000. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`. Other shells can use `npm`.

```sh
npm run check
npm test
npm run build
npm start
```

`npm run build` generates a standalone **out/** directory. `npm start` serves that export locally; no application backend is required. Deploy the contents of `out/` to any static host that supports directory index files and `404.html`. Nothing has been published or pushed automatically.

The build also normalizes Next.js segment prefetch filenames on Windows so page links work on ordinary static hosts.

## Edit content

- **config/site.ts**: name, bio, technical skill groups, education label, email, phone, WhatsApp, copy, brand colors, production domain, and optional resume.
- **public/assets/avatar.png**: the supplied transparent illustrated avatar, displayed in the hero. Its path and alt text are configured in `site.avatar`.
- **public/assets/projects/friday-reminder/**: all eight supplied FRIDAY screenshots. The web dashboard is the cover; the remaining seven appear with captions in project details. The live project link points to `https://friday.alwaysdata.net`.
- **public/assets/projects/friday-trading/**: all five supplied trading bot screenshots. The testnet terminal is the cover; Discord notifications and the bot workspace appear in the gallery with full-size links.
- **data/projects.ts**: four projects transcribed from the supplied CV, including their descriptions and embedded links. Student OS retains its concept/exploration status. Add screenshots, dates, and galleries when available; the current covers use typography.
- **data/experience.ts**: education and future experience entries. No dates, employers, awards, or metrics have been invented.
- **app/globals.css**: responsive layout and presentation. Fonts load locally through `next/font/local` in the root layout.
- **public/assets/**: add your own project screenshots and optional portrait/resume. No portrait is required by this design.

Add a real production URL to `site.url` before deployment. Canonical URLs and sitemap entries are omitted while it is empty. Brand icons and social preview artwork are generated from the config by `scripts/generate-assets.mjs` during builds.

The GitHub profile is derived from the supplied repository. Email and phone are the public details supplied in the conversation. WhatsApp uses the Bangladesh international format, +8801781205471.

## Behavior

- Fully rendered initial HTML: essential content and anchor links work with JavaScript disabled.
- Each menu item opens its own page: Home (`/`), Work (`/projects/`), Journey (`/journey/`), About (`/about/`), and Contact (`/contact/`). The homepage contains the introduction and avatar; the biography and CV skills are on About, and contact links and the form are on Contact.
- Technical skills in About and the four Work entries come from the CV's Skills and Projects sections. The full CV is not served as a public download.
- Responsive menu with modal focus handling, Escape close, and restored trigger focus.
- Motion is enabled by default and the build effect plays automatically on each page load and whenever visitors navigate to another page, including browser Back and Forward. The toggle can pause motion for the current visit; reloading enables it again. Clicking Motion replays the non-blocking cursor/drawing effect on the visible section. Playback clears automatically or can be stopped with Escape. System reduced motion is respected, and the control explains when that setting pauses playback.
- Real project entries automatically enable search, derived category filters, featured ordering, six-item pagination, and accessible project details. Optional YouTube embeds load only after a visitor activates them, using the privacy-enhanced host.
- Education uses a native expandable disclosure.
- The contact form validates fields and opens a **mailto draft**. It does not send email or claim delivery. Direct email, phone, and WhatsApp links are available.
- The old browser-only admin CMS, fake content, stub email/newsletter handlers, broken image references, and placeholder resume have been removed. Content is managed through the repository.

## Browser checks

```sh
npm run build
npm run test:browser
```

Tests use the installed Google Chrome (`channel: 'chrome'`); no browser download is necessary on this machine. For another browser, change the channel in `playwright.config.ts`. They verify 1440, 768, 390, and 320px layouts, initial HTML, empty work state, education disclosure, form validity, contact URLs, mobile keyboard navigation, and motion preferences. Screenshots are saved in ignored `test-results/`.

Pure project filtering and safe YouTube URL handling are covered by `npm test`. Full project interaction needs real project entries before final content QA.

## Design provenance

`Website_portfolio_details.md` is the supplied brief. The reference website could not be loaded during this session, so this design interprets the written brief rather than claiming a verified reproduction. No code or assets from the reference owner were copied. The linked Swarm project states it has no reuse license; the drawing effect here is original and dependency-free.

`REPOSITORY_AUDIT.md` records the original 71-file inspection and baseline findings. It describes the old application, not the rebuilt implementation.
