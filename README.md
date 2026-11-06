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

`npm run build` creates a Next.js production build in **.next/**. `npm start` runs the site and Friday's server endpoint. Deploy using a Next.js server host (for example, a compatible Node.js service or Vercel), with the environment variables below configured privately. The site now needs a server; old **out/** exports and `scripts/serve.mjs` do not include Friday's API. Nothing is deployed automatically.

## Friday chat assistant

Friday appears on every page and answers from `config/site.ts`, `data/projects.ts`, and `data/experience.ts`. Updating those files and redeploying updates its knowledge. The browser calls `/api/chat/`; the server supplies portfolio context to Gemini. It does not crawl third-party sites or upload the CV and screenshots.

1. Create an API key at https://aistudio.google.com/api-keys in a project **without paid billing enabled**. This is what prevents paid API usage; application request limits alone cannot guarantee zero cost on a billed project.
2. Copy `.env.example` to `.env.local` and enter the key as `GEMINI_API_KEY`. Never use `NEXT_PUBLIC_` or commit the key. Set the same secret privately in your hosting dashboard.
3. The default model is `gemini-3.1-flash-lite`, currently listed with a free tier at https://ai.google.dev/gemini-api/docs/pricing. Set `GEMINI_MODEL` if your project needs a different free-tier model. Check availability and quota in AI Studio; do not switch to a paid project to bypass a limit.
4. Restart `npm run dev`, or run `npm run build` then `npm start` for production.

No key is included. Without one, Friday clearly reports that it is not connected. There is no paid fallback, automatic retry, web search, or embedding service. The endpoint allows five requests per minute and two concurrent requests per server process, bounds request and response sizes, and stops requests after 20 seconds. These local limits reset on server restart and are not shared across server instances; Google's project quota remains authoritative. Free API usage and hosting allowances are separate.

Chat messages are sent to Google Gemini; the widget explains this before sending. Google's free-tier data practices apply (see its pricing/terms). The app does not intentionally persist or log conversations. History stays in memory during page navigation and clears on reload or New chat. Answers can be inaccurate; unknown details should be referred to Contact.

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
