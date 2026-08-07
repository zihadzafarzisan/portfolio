# Zisan's Portfolio Website

A fast, modern, and production-ready personal portfolio website for **Zisan** (Web Designer & Developer). Built with Next.js 16+ (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and React Hook Form + Zod.

## Features

- **Theme System**: Dark/Light mode toggle with system preference fallback, persisted via `localStorage`, with no flash of wrong theme on page load.
- **Single-Page Home + Dedicated Routes**:
  - `/` — Home page with smooth anchor navigation across all sections
  - `/about` — Detailed About page with skills breakdown and resume download link
  - `/projects` — Full project showcase with animated category filtering (Framer Motion `layout`)
  - `/projects/[slug]` — Individual case study page with interactive Before/After image slider, problem/solution breakdown, tech stack tags, and live links
  - `/contact` — Standalone contact page reusing the validated contact form
  - `/blog` — "Coming Soon" stub page with newsletter subscription UI
  - `/api/contact` — Serverless API route validating contact messages using Zod
- **Rich Motion & Aesthetics**:
  - GPU-accelerated gradient blob background animation
  - Subtle mouse-following gradient spotlight (auto-disabled on touch devices)
  - Animated scroll-triggered counters for stats
  - Horizontal desktop process stepper & vertical mobile timeline with animated SVG lines
  - Infinite auto-scrolling marquee for client testimonials and tech stack logos
  - Full support for `prefers-reduced-motion` across all Framer Motion components

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion 13 + CSS Keyframes
- **Fonts:** Sora (Headings) + Inter (Body) via `next/font/google`
- **Icons:** `lucide-react`
- **Forms & Validation:** React Hook Form + Zod (`@hookform/resolvers`)
- **Package Manager:** `pnpm`

---

## Getting Started

### Prerequisites

Ensure you have Node.js 18+ and `pnpm` installed.

### Installation

```bash
# Clone or navigate to project directory
cd zisan-portfolio

# Install dependencies
pnpm install
```

### Running Locally

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build static & serverless routes
pnpm build

# Preview production build
pnpm start
```

---

## Content Customization & TODOs

All content is structured as typed TypeScript data files for easy editing:

1. **Projects (`/data/projects.ts`)**:
   - Single source of truth for home page featured projects, `/projects` grid, and dynamic `/projects/[slug]` case studies.
   - Edit project details, before/after image paths, live demo links, and technologies.
2. **Testimonials (`/data/testimonials.ts`)**:
   - Replace placeholder testimonial quotes, client names, roles, and avatar images.
3. **Services (`/data/services.ts`)**:
   - Edit the 6 core services offered, their descriptions, and corresponding Lucide icon names.
4. **Tech Stack (`/data/tech-stack.ts`)**:
   - Customize the list of tools and technologies shown in the grid/marquee.
5. **Resume PDF (`/public/resume.pdf`)**:
   - Replace the placeholder PDF at `/public/resume.pdf` with your actual resume document.
6. **Contact Email API (`/app/api/contact/route.ts`)**:
   - Currently logs form submissions to console with a clear `TODO` comment to integrate [Resend](https://resend.com) or EmailJS.
7. **Calendly Link**:
   - Update `https://calendly.com/zisan` in `components/layout/Navbar.tsx` and `components/sections/Hero.tsx` with your real booking link.
