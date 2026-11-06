# Portfolio repository audit

> Historical baseline: this report describes the original repository before the redesign. The implementation has since been rebuilt using `Website_portfolio_details.md` and the owner's supplied name, student bio, education, and contacts. See README.md for the current application and validation commands.

Inspected on 2026-11-06. Repository: https://github.com/zihadzafarzisan/portfolio.git
Baseline commit: `8048e30` — Initial commit: Zisan Portfolio Website & Admin CMS.

All 71 tracked files were inspected: source and configuration were read, the lockfile was examined structurally and used for a frozen dependency installation, the SVGs and placeholder PDF were read, and the favicon was decoded and viewed. Git internals and installed dependencies are outside this authored-file inventory. Application source has not been changed during this inspection.

## Current architecture

- Next.js 16.3.0 App Router, React 19.2.8, TypeScript, Tailwind CSS 4.3.3, Framer Motion 13, Lucide icons, React Hook Form, and Zod.
- Public routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/contact`, `/blog`.
- Admin routes: `/admin`, `/admin/login`, `/admin/projects`, `/admin/testimonials`, `/admin/services`, `/admin/settings`, `/admin/messages`.
- One backend endpoint: `POST /api/contact`. No database, server authentication, email delivery, newsletter provider, or image upload integration is implemented.
- Most public sections read a client context. Project detail routes and the sitemap instead read static TypeScript data.
- Admin settings, messages, and content are stored in the current browser's localStorage. They are not published to other visitors or synchronized between devices or browser tabs.

## Findings to address in the overhaul

### Authentication and publishing

1. `context/AdminAuthContext.tsx` checks a hardcoded passcode in the client and trusts a localStorage boolean. The login page displays the default passcode. There is no server-side authorization. This is a local editing prototype, not a protected publishing system.
2. Site edits and messages persist only in the visitor's browser. An inquiry submitted on someone else's device cannot reach the owner's inbox through this implementation.
3. Adding or editing projects changes the client listing, but `/projects/[slug]`, metadata, and sitemap still use `data/projects.ts`. Newly added or renamed slugs can lead to 404s; detail pages can show stale content.
4. The services editor calls `updateServices` and `updateTechStack` in one handler. Both save a full snapshot from the same render, so the second localStorage write can overwrite the newly saved services with the previous values. React state can appear correct until a reload.

### Contact and unfinished features

5. `POST /api/contact` validates and logs submissions, then reports success without sending email or storing them on the server. The contact UI also ignores `response.ok`, so HTTP errors can still display success and clear the form.
6. Newsletter forms in the footer, contact section, and blog have no subscription integration. Blog content is a coming-soon stub.
7. The footer links to `/privacy` and `/terms`; both routes return 404.
8. Admin project editing lacks controls for long description, before/after images, and source URL despite those fields existing in the project model. Slugs are not checked for uniqueness or valid path characters. There is no asset upload flow.
9. JSON export omits tech stack and messages; there is no import flow. It is not a complete backup/restore system.

### Content and visual assets

10. All 20 distinct `/images/...` references found in source/data are absent. These include the hero portrait, about photo, project screenshots, testimonial avatars, and editor sample paths. Some avatar references are unused because the UI renders initials instead.
11. `public/resume.pdf` is a 501-byte placeholder containing “Zisan - Resume Placeholder,” not a usable personal resume. The favicon is a white Vercel triangle on black. Five other public SVGs are starter artwork.
12. Testimonials are explicitly marked as placeholders, client logos use fictional names, project URLs include `.placeholder` hosts, and GitHub statistics on the about page are simulated. Homepage statistics and experience claims need confirmation; “3+ years” conflicts with the about page's “over a decade.”
13. Branding varies between Zisan and Zihad. Social accounts, email, WhatsApp, booking URL, and `zisan.dev` domain require confirmation. The GitHub links currently do not match the repository owner's username.
14. Content is split between context defaults, static data, metadata, navbar, footer, and page components. Updating settings does not update all those surfaces.

### Rendering, styling, and accessibility

15. Both global auth/config providers return `null` until mounting, blocking public page content from the initial server render. Public content depends on client hydration even though the build reports static routes.
16. Theme variables follow a `.dark` class, but compiled Tailwind `dark:` utilities follow the system media query. The stylesheet has no class-based dark variant. Manual toggles can therefore mix incompatible theme styles. The initial theme script also handles a saved `system` value differently from the provider.
17. The compiled CSS contains no `font-sora` or `prose` utility definitions, although pages use these classes. Heading font tokens exist, but the body also applies Tailwind `font-sans`, which needs checking against the intended Inter font.
18. Hero spotlight uses undefined `--primary-rgb`; animation-delay classes are undefined. Mouse movement updates React state on every event. These effects need redesign or removal.
19. CSS blob, pulse, and marquee animations and smooth scrolling have no reduced-motion media override. Several Framer Motion components also omit a reduced-motion check despite the README's full-support claim. Continuous marquees lack a general keyboard-accessible pause control.
20. PublicLayout wraps pages in `<main>` while pages define their own `<main>`, producing nested landmarks after hydration. Header spacing is also applied by both the layout and several pages.
21. Mobile navigation and admin modals need proper dialog semantics, focus handling, and scroll management. Some admin inputs and icon buttons lack accessible labels. Contact errors/statuses need programmatic associations and announcements.
22. CaseStudy defines its own mouse/touch-only comparison slider instead of using the existing keyboard-operable UI slider. The inline slider resizes its overlay and uses `100cqw` without an explicit matching query container, so before/after alignment needs checking.
23. Project filters are hardcoded and omit the admin editor's “Web Application” category. Selection state is not exposed with `aria-pressed`.

### Metadata and maintenance

24. Metadata and sitemap hardcode an unconfirmed domain. Social preview image assets and a metadata base are absent. Several child page titles already include the site name while the root title template appends it again.
25. Admin routes inherit indexable root metadata and are not excluded by robots.txt. Decide their future before configuring indexing.
26. The README's Node 18 prerequisite is stale relative to the locked Next package. Documentation describes production readiness and accessibility beyond what the implementation supports.
27. The build downloads Google Fonts. It failed without network access and succeeded with network access; consider self-hosted fonts for reproducible offline builds.
28. No automated test suite or CI workflow is included. The existing lint and production build pass, so those checks alone do not catch the behavior above.

## File-by-file inventory

### Root and tooling — 11 files

| File | Role and review notes |
| --- | --- |
| `.gitignore` | Ignores dependencies, generated builds, env files, logs, and TypeScript output. |
| `AGENTS.md` | Requires reading installed Next.js guides before writing application code. |
| `CLAUDE.md` | References AGENTS.md. |
| `README.md` | Setup and feature documentation; update prerequisites and claims during rebuild. |
| `package.json` | Application dependencies, four scripts, pinned pnpm 11.20.0; no test script. |
| `pnpm-lock.yaml` | 4,344 lines, 440 package entries; frozen installation succeeded; no custom tarball URL entries found. This is not a vulnerability audit. |
| `pnpm-workspace.yaml` | Disables sharp and unrs-resolver build scripts. |
| `next.config.ts` | Empty framework configuration. |
| `postcss.config.mjs` | Tailwind PostCSS integration. |
| `eslint.config.mjs` | Next core web vitals and TypeScript presets. |
| `tsconfig.json` | Strict TypeScript and `@/*` import alias. |

### Public application — 12 files

| File | Role and review notes |
| --- | --- |
| `app/layout.tsx` | Fonts, metadata, global providers; auth/config mounting blocks initial page content. |
| `app/page.tsx` | Composes eleven homepage sections. |
| `app/template.tsx` | Route animation; review reduced motion and remount behavior. |
| `app/globals.css` | Theme tokens, typography, marquee/blob keyframes; incomplete theme/motion utilities. |
| `app/sitemap.ts` | Static route/project inventory using hardcoded domain and build-time timestamps. |
| `app/about/page.tsx` | Extended biography and simulated GitHub stats; verify experience claims. |
| `app/projects/page.tsx` | Projects route header and filterable grid. |
| `app/projects/[slug]/page.tsx` | Static-data lookup, generated paths and metadata; disconnected from editor. |
| `app/contact/page.tsx` | Standalone shared contact section. |
| `app/blog/page.tsx` | Coming-soon page with inactive subscription button. |
| `app/api/contact/route.ts` | Zod validation and console logging; delivery/storage unfinished. |
| `app/favicon.ico` | Four embedded sizes; viewed 256px image confirms Vercel branding. |

### Admin application — 8 files

| File | Role and review notes |
| --- | --- |
| `app/admin/layout.tsx` | Sidebar and client redirect guard; no server authorization. |
| `app/admin/login/page.tsx` | Local passcode form; exposes default passcode and redirects during render. |
| `app/admin/page.tsx` | Overview, counts, reset and partial JSON export. |
| `app/admin/projects/page.tsx` | Add/edit/delete projects; incomplete fields, absent assets, limited validation. |
| `app/admin/testimonials/page.tsx` | Add/delete reviews; no editing or actual avatar upload. |
| `app/admin/services/page.tsx` | Service/tech editor; sequential snapshot writes can lose persisted service edits. |
| `app/admin/settings/page.tsx` | Hero, bio, contact/social settings; other hardcoded surfaces remain disconnected. |
| `app/admin/messages/page.tsx` | Read/delete browser-local messages; cannot receive other visitors' inquiries. |

### Layout components — 5 files

| File | Role and review notes |
| --- | --- |
| `components/layout/Navbar.tsx` | Fixed header, theme toggle, anchors/mobile drawer; hardcoded booking link. |
| `components/layout/Footer.tsx` | Navigation, placeholder socials, newsletter stub, missing legal routes. |
| `components/layout/PublicLayout.tsx` | Hides public chrome on admin routes; adds nested main and repeated page offset. |
| `components/layout/ThemeProvider.tsx` | LocalStorage/system theme state; inconsistent with compiled dark utilities. |
| `components/layout/ThemeScript.tsx` | Inline initial theme class; saved system value is handled inconsistently. |

### Page sections — 13 files

| File | Role and review notes |
| --- | --- |
| `components/sections/Hero.tsx` | Editable headline, CTA, missing portrait and incomplete background effects. |
| `components/sections/ClientLogos.tsx` | Fictional client names and mobile marquee. |
| `components/sections/Stats.tsx` | Four unverified hardcoded statistics. |
| `components/sections/FeaturedProjects.tsx` | Context-driven homepage cards; screenshots absent. |
| `components/sections/ProjectsGrid.tsx` | Context-driven grid; fixed category list and incomplete motion/accessibility handling. |
| `components/sections/CaseStudy.tsx` | Detail presentation and duplicate inline comparison slider. |
| `components/sections/Services.tsx` | Context-driven service cards with limited icon-name mapping. |
| `components/sections/WhyMe.tsx` | Six generic selling points. |
| `components/sections/Process.tsx` | Six-step animated timeline; mobile progress line lacks full-height styling. |
| `components/sections/Testimonials.tsx` | Duplicated quote marquee with initials; placeholder avatar field unused. |
| `components/sections/TechStack.tsx` | Desktop grid/mobile marquee; icon identifiers unused in favor of initials. |
| `components/sections/About.tsx` | Editable biography, missing photo, placeholder resume and external contribution chart. |
| `components/sections/Contact.tsx` | Form, social links, FAQ and newsletter stub; local message write and unchecked HTTP response. |

### UI components — 7 files

| File | Role and review notes |
| --- | --- |
| `components/ui/Accordion.tsx` | Single-open FAQ; add trigger/panel IDs and reduced-motion handling. |
| `components/ui/AnimatedCounter.tsx` | IntersectionObserver counter; animation-frame cleanup and motion changes need review. |
| `components/ui/Badge.tsx` | Three badge variants. |
| `components/ui/Button.tsx` | Button/link/clone composition; href branch drops props/ref and class conflict merging is basic. |
| `components/ui/Card.tsx` | Card surface and hover styles; default padding can conflict with image-card layouts. |
| `components/ui/ImageSlider.tsx` | Reusable draggable keyboard slider; currently bypassed by CaseStudy. |
| `components/ui/SectionWrapper.tsx` | Shared animated section wrapper. |

### State, data, and helpers — 8 files

| File | Role and review notes |
| --- | --- |
| `context/AdminAuthContext.tsx` | Client-only localStorage auth state and hardcoded passcode. |
| `context/SiteConfigContext.tsx` | Defaults and whole-snapshot local persistence; seeded sample inbox. |
| `data/projects.ts` | Three case studies, including explicit placeholders and absent image paths. |
| `data/services.ts` | Six typed service entries. |
| `data/tech-stack.ts` | Twelve technologies and unused icon identifiers. |
| `data/testimonials.ts` | Five explicitly placeholder reviews and absent avatar paths. |
| `lib/validation.ts` | Shared contact schema; no trimming or maximum lengths. |
| `lib/utils.ts` | Class joining and date formatting helpers. |

### Public assets — 7 files

| File | Role and review notes |
| --- | --- |
| `public/file.svg` | Starter file icon; no source references found in reviewed components. |
| `public/globe.svg` | Starter globe icon. |
| `public/next.svg` | Next.js wordmark. |
| `public/vercel.svg` | Vercel triangle artwork. |
| `public/window.svg` | Starter browser/window icon. |
| `public/resume.pdf` | Placeholder PDF, not personal resume content. |
| `public/robots.txt` | Allows all crawlers and hardcodes sitemap domain. |

Inventory total: 11 root + 12 public app + 8 admin + 5 layout + 13 sections + 7 UI + 8 state/data/helpers + 7 public assets = 71 original tracked files.

## Baseline validation

- Dependency install: `npx.cmd --yes pnpm@11.20.0 install --frozen-lockfile --ignore-scripts` succeeded without changing the package manifest or lockfile.
- Lint: `node_modules/.bin/eslint.cmd .` passed with no output.
- Production build: `node_modules/.bin/next.cmd build` passed with network access, including TypeScript and static page generation. The first restricted-network attempt failed fetching Inter/Sora.
- Production server HTTP checks: home, about, projects, Makario detail, contact, blog, admin login, sitemap, robots, and resume returned 200. `/privacy`, `/terms`, and the hero portrait returned 404.
- Contact checks: invalid fields returned 400; valid synthetic input returned 200 despite no delivery integration; malformed JSON returned 500 rather than 400. No real email was sent.
- Compiled CSS inspection confirmed system-media dark variants, absent class-based dark variants, absent `font-sora`/`prose` utilities, undefined primary RGB token, and no reduced-motion media override.
- These were source, asset, compilation, and HTTP checks. No interactive browser, mobile layout, screen-reader, or full accessibility audit was performed.

## Suggested rebuild order

1. Establish the visual direction, preferred public name, target audience, and real project/contact content.
2. Build a cohesive typography, spacing, color, layout, and responsive navigation system.
3. Replace the homepage and dedicated project/about/contact experiences, using verified content and real assets.
4. Choose a publishing model: repository-managed content or a real CMS with server authentication and shared persistence. Keep public rendering independent of admin auth.
5. Implement actual inquiry delivery with accurate success/error handling; integrate or remove unfinished newsletter/blog UI according to the desired scope.
6. Complete metadata, icons, motion/accessibility, asset/link validation, and production verification.
