# Implementation Plan: portfolio-nasya

## Overview

Implement Muhammad Choirun Nasya's personal portfolio website as a static single-page application using Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, and Shadcn/UI. All content lives in a single centralized data file. Components are React Server Components by default, with `'use client'` boundaries only where interactivity or Framer Motion is required.

## Tasks

- [x] 1. Install dependencies and configure project foundation
  - Install runtime dependencies: `npm install framer-motion lucide-react`
  - Install dev dependencies for testing: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths fast-check @testing-library/jest-dom`
  - Initialize Shadcn/UI: `npx shadcn@latest init` (accept defaults; this generates `components/ui/`)
  - Create `vitest.config.mts` at project root with `@vitejs/plugin-react`, `vite-tsconfig-paths`, and `environment: 'jsdom'`
  - Add `"test": "vitest --run"` to `package.json` scripts
  - _Requirements: 10.5, 10.6_

- [x] 2. Update global styles and layout
  - [x] 2.1 Update `app/globals.css`
    - Replace current content with: `@import "tailwindcss"` directive, `@theme inline` block mapping `--font-sans` to `--font-inter`, `--color-primary: #2563EB`, `--color-secondary: #4F46E5`, and the `gradient-shift` `@keyframes` definition
    - Add `scroll-behavior: smooth` to the `html` selector for CSS-native smooth scrolling
    - _Requirements: 1.5, 2.3, 3.5_

  - [x] 2.2 Rewrite `app/layout.tsx`
    - Import `Inter` from `next/font/google` with `{ subsets: ['latin'], variable: '--font-inter' }`
    - Export a static `Metadata` object with `title`, `description`, and `openGraph` fields (`og:title`, `og:description`, `og:type: 'website'`)
    - Set `<html lang="id" className={inter.variable}>` and `<body className="font-sans antialiased">`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Create centralized data file
  - [x] 3.1 Create `lib/data.ts`
    - Export all TypeScript interfaces: `BiodataField`, `Achievement`, `HeroData`, `AboutData`, `FooterData`, `SiteData`
    - Use no `any` types; all fields strictly typed including `team?: string[]` on `Achievement`
    - Export the `siteData` constant with: `hero` (name, title, description), `about` (biography), `biodata` (6 fields: Nama, Universitas, Fakultas, Program Studi, Alamat, Umur — each with Lucide icon name string), `achievements` (6 entries mapped to available image files in `/public/prestasi/`), `gallery` (3 image filenames), `motivationalQuote`, and `footer` (name, role, institution, copyrightYear: 2025)
    - Do NOT add `'use client'` directive
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 4. Implement Lightbox component
  - [x] 4.1 Create `components/Lightbox.tsx`
    - Mark `'use client'`
    - Accept props: `images: string[]`, `currentIndex: number`, `isOpen: boolean`, `onClose: () => void`, `onPrev?: () => void`, `onNext?: () => void`, `showNavigation?: boolean`
    - Render as fixed full-screen overlay with `z-50`; close on backdrop click or close button click
    - `useEffect` for keyboard listeners: `Escape` → `onClose`, arrow keys → `onPrev`/`onNext`
    - Scroll lock: `document.body.style.overflow = 'hidden'` while open, restore on close
    - Focus the close button on open (`aria-label`), `role="dialog"`, `aria-modal="true"` for accessibility
    - Image sized with `max-h-[90vh] max-w-[90vw]`; use `next/image` with `fill` inside a sized container or explicit dimensions
    - Export pure helper functions `getNextIndex(current, total)` and `getPrevIndex(current, total)` implementing wrap-around arithmetic — these are the units under property tests
    - _Requirements: 6.4, 6.5, 7.3, 7.4, 7.5_

  - [ ]* 4.2 Write property tests for Lightbox navigation wrap-around
    - Create `__tests__/lightbox.test.ts`
    - **Property 8: Gallery lightbox navigation wrap-around**
    - Test `getNextIndex(n-1, n) === 0` for any `n ≥ 1` using `fc.integer({ min: 1, max: 50 })`
    - Test `getPrevIndex(0, n) === n-1` for any `n ≥ 1` using `fc.integer({ min: 1, max: 50 })`
    - **Validates: Requirements 7.4**

  - [ ]* 4.3 Write unit tests for Lightbox behavior
    - Test `Escape` key triggers `onClose`
    - Test backdrop click triggers `onClose`
    - Mock `framer-motion` and `next/image` in the Vitest setup
    - _Requirements: 6.5, 7.5_

- [x] 5. Implement Navbar component
  - [x] 5.1 Create `components/Navbar.tsx`
    - Mark `'use client'`
    - `useState` for mobile menu open/close toggle
    - `useEffect` + `window.addEventListener('scroll', ...)` to detect scroll > 20px; apply visually distinct background class when scrolled
    - Navigation links: Home (`#hero`), Tentang (`#tentang`), Biodata (`#biodata`), Prestasi (`#prestasi`), Galeri (`#galeri`) — plain `<a href="#...">` anchors
    - `fixed top-0 w-full z-50` positioning via Tailwind
    - Horizontal links on `md:` (≥768px), hamburger toggle on mobile; close menu on link click
    - Hamburger button: `aria-label="Buka menu navigasi"` / `"Tutup menu navigasi"` toggled by state
    - Extract a pure `getNavbarState(scrollY: number): 'scrolled' | 'transparent'` function for testability
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 5.2 Write property test for Navbar scroll threshold
    - Create `__tests__/navbar.test.ts`
    - **Property 1: Navbar scroll threshold behavior**
    - Test `getNavbarState(scrollY)` returns `'scrolled'` when `scrollY > 20`, `'transparent'` otherwise, for `fc.integer({ min: 0, max: 1000 })`
    - **Validates: Requirements 2.4**

- [x] 6. Implement Hero section
  - [x] 6.1 Create `components/HeroSection.tsx`
    - Mark `'use client'`; accept `hero: HeroData` prop
    - `useReducedMotion()` from Framer Motion; skip all animations and gradient animation when true
    - Gradient background using `background-size: 200% 200%` + `animation: gradient-shift 8s ease infinite` (inline style or Tailwind arbitrary); disabled when `useReducedMotion` is true
    - `motion.div` with `initial={{ opacity: 0, y: 40 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6 }}` for photo and text content
    - Two-column layout on `md:` (photo left, text right); single-column stacked on mobile (photo above text)
    - Profile photo: `<Image src="/fotodiri/fotodiri.jpeg" alt="Muhammad Choirun Nasya" width={400} height={400} priority />`
    - Two CTA buttons: "Lihat Prestasi" (`href="#prestasi"`) and "Tentang Saya" (`href="#tentang"`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ]* 6.2 Write property test for Hero section data rendering
    - Create `__tests__/hero.test.tsx`
    - **Property 2: Hero section renders all data fields**
    - For any `HeroData` with non-empty `name`, `title`, `description`, rendered output contains all three values
    - Use `fc.record({ name: fc.string({ minLength: 1 }), title: fc.string({ minLength: 1 }), description: fc.string({ minLength: 1 }) })`
    - Mock `framer-motion` (`useReducedMotion` returns `false`) and `next/image`
    - **Validates: Requirements 3.2**

- [x] 7. Implement About section
  - [x] 7.1 Create `components/AboutSection.tsx`
    - Mark `'use client'`; accept `about: AboutData` prop
    - Framer Motion `useInView` with `once: true`; photo column `initial={{ opacity: 0, x: -50 }}`, text column `initial={{ opacity: 0, x: 50 }}`, both animate when in view
    - Display heading "Tentang Saya" and biography text from prop
    - Photo: `<Image src="/fotodiri/fotodiri.jpeg" alt="Foto Muhammad Choirun Nasya" width={400} height={400} />`
    - Two-column layout on `md:` (photo left, text right); single-column stacked on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 7.2 Write property test for About section biography rendering
    - Create `__tests__/about.test.tsx`
    - **Property 3: About section renders biography**
    - For any `AboutData` with non-empty `biography`, rendered output contains that biography string
    - Use `fc.string({ minLength: 1 })` for biography
    - Mock `framer-motion` and `next/image`
    - **Validates: Requirements 4.1**

- [x] 8. Implement Biodata section
  - [x] 8.1 Create `components/BiodataSection.tsx`
    - Mark `'use client'`; accept `biodata: BiodataField[]` prop
    - Framer Motion `useInView` with `once: true` and stagger container variant (`staggerChildren: 0.1`)
    - Each card: `duration: 0.3`, fade + scale (`scale: 0.95 → 1`) entrance
    - Render each field as a card (`role="article"`) with Lucide icon, label, and value
    - Resolve Lucide icon component from a lookup map keyed on `BiodataField.icon` string (e.g., `{ User, GraduationCap, BookOpen, Brain, MapPin, Calendar }`)
    - Section heading visible above cards
    - No hardcoded field strings — all values from `biodata` prop
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 8.2 Write property test for Biodata section card count and content
    - Create `__tests__/biodata.test.tsx`
    - **Property 4: Biodata section renders N cards for N fields**
    - For any array of N `BiodataField` objects (N ≥ 1), rendered output has exactly N elements with `role="article"`, each containing the corresponding `label` and `value`
    - Use `fc.array(fc.record({ label: fc.string(), value: fc.string(), icon: fc.constant('User') }), { minLength: 1 })`
    - Mock `framer-motion` and `lucide-react`
    - **Validates: Requirements 5.2, 5.3, 10.3**

- [x] 9. Implement Prestasi section
  - [x] 9.1 Create `components/PrestasiSection.tsx`
    - Mark `'use client'`; accept `achievements: Achievement[]` prop
    - `useState` for lightbox open state and selected image index
    - Framer Motion stagger on scroll via `useInView` + `staggerChildren: 0.1`
    - Each Achievement Card:
      - `<Image src={`/prestasi/${achievement.imageFilename}`} .../>` with `onError` handler swapping to a styled placeholder `<div>`
      - Framer Motion `whileHover={{ scale: 1.05 }}` + CSS transition for `box-shadow` blue glow (`#2563EB`)
      - Display: title, event name, level, organizer, date — all from prop, no hardcoded strings
      - If `achievement.team` is a non-empty array, render team member names
      - `onClick` → open lightbox with that achievement's index
    - Render `<Lightbox>` passing single achievement image (no prev/next navigation, `showNavigation={false}`)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [ ]* 9.2 Write property test for Achievement card data integrity
    - Create `__tests__/prestasi.test.tsx`
    - **Property 5: Achievement card data integrity**
    - For any `Achievement` object, rendered output contains `title`, `eventName`, `level`, `organizer`, `date`, and an image `src` derived from `imageFilename`
    - Use `fc.record` with string arbitraries for each field
    - Mock `framer-motion`, `next/image`, and `Lightbox`
    - **Validates: Requirements 6.1, 6.2**

  - [ ]* 9.3 Write property test for team display invariant
    - In `__tests__/prestasi.test.tsx`
    - **Property 6: Team display invariant**
    - For any `Achievement` where `team` is a non-empty array, all member names appear; for `team` undefined or empty, no member names appear
    - Use `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })` and `fc.constant(undefined)`
    - **Validates: Requirements 6.7**

- [x] 10. Implement Gallery section
  - [x] 10.1 Create `components/GallerySection.tsx`
    - Mark `'use client'`; accept `gallery: string[]` prop
    - CSS multi-column masonry: `columns-2 md:columns-3` Tailwind classes on container
    - Each image: `<Image src={`/prestasi/${filename}`} .../>` wrapped in `<button>` for click-to-open lightbox; use `onError` for broken image handling
    - Framer Motion stagger fade-up on scroll via `useInView` + `staggerChildren: 0.1`
    - `useState` for lightbox index and open state
    - Render `<Lightbox>` with full `images` array, `currentIndex`, prev/next handlers using `getNextIndex`/`getPrevIndex` from `Lightbox`, and `showNavigation={true}`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 10.2 Write property test for Gallery image count
    - Create `__tests__/gallery.test.tsx`
    - **Property 7: Gallery renders N images from data**
    - For any gallery array of N filenames (N ≥ 1), rendered output has exactly N `<img>` elements each with `src` derived from the filename
    - Use `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })`
    - Mock `framer-motion`, `next/image`, and `Lightbox`
    - **Validates: Requirements 7.1, 7.2, 10.3**

- [ ] 11. Checkpoint — Ensure all tests pass
  - Run `npm run test` and verify all property and unit tests pass. Ask the user if any questions arise.

- [x] 12. Implement Motivasi section
  - [x] 12.1 Create `components/MotivasiSection.tsx`
    - Mark `'use client'`; accept `quote: string | undefined` prop
    - Guard: if `!quote || quote.trim() === ''`, render `"Kutipan tidak tersedia."` fallback
    - Full-width section with left-to-right gradient from `--color-primary` to `--color-secondary` (Tailwind: `from-[#2563EB] to-[#4F46E5]` or using CSS variable tokens)
    - Framer Motion `useInView` with `once: true`, fade-up entrance with `duration: 0.7`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 12.2 Write property tests for Motivasi quote fallback
    - Create `__tests__/motivasi.test.tsx`
    - **Property 9: Motivational quote displays content or fallback**
    - For any non-empty `quote` string, rendered output contains that string (not the fallback)
    - For empty string, whitespace-only string, and `undefined`, rendered output contains `"Kutipan tidak tersedia."`
    - Use `fc.string({ minLength: 1 })`, `fc.constant('')`, `fc.constant('   ')`, `fc.constant(undefined)`
    - Mock `framer-motion`
    - **Validates: Requirements 8.1, 8.2**

- [x] 13. Implement Footer component
  - [x] 13.1 Create `components/Footer.tsx`
    - Server Component (no `'use client'`); accept `footer: FooterData` prop
    - Render name, role, institution, and copyright notice with year — all from `footer` prop
    - No hardcoded strings or numbers inline
    - _Requirements: 9.1, 9.2_

  - [ ]* 13.2 Write property test for Footer data rendering
    - Create `__tests__/footer.test.tsx`
    - **Property 10: Footer renders all data fields**
    - For any valid `FooterData` object, all four fields (`name`, `role`, `institution`, `copyrightYear`) appear in the rendered output
    - Use `fc.record({ name: fc.string({ minLength: 1 }), role: fc.string({ minLength: 1 }), institution: fc.string({ minLength: 1 }), copyrightYear: fc.integer({ min: 2000, max: 2100 }) })`
    - **Validates: Requirements 9.1, 9.2**

- [x] 14. Assemble `app/page.tsx` and wire all sections
  - [x] 14.1 Rewrite `app/page.tsx`
    - Server Component; import `siteData` from `@/lib/data`
    - Import and render all section components in order: `<Navbar />`, `<HeroSection hero={siteData.hero} />`, `<AboutSection about={siteData.about} />`, `<BiodataSection biodata={siteData.biodata} />`, `<PrestasiSection achievements={siteData.achievements} />`, `<GallerySection gallery={siteData.gallery} />`, `<MotivasiSection quote={siteData.motivationalQuote} />`, `<Footer footer={siteData.footer} />`
    - Each section wrapped in `<section id="...">` tags with the corresponding anchor IDs (`hero`, `tentang`, `biodata`, `prestasi`, `galeri`)
    - _Requirements: 2.2, 2.3, 10.3_

- [x] 15. Final checkpoint — Verify build and all tests pass
  - Run `npm run test` to confirm all tests pass
  - Run `npm run build` and confirm zero TypeScript errors and zero ESLint errors
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 10.5, 10.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP build
- Each property test references a numbered property from the design document's "Correctness Properties" section for full traceability
- Framer Motion must be mocked in all component tests (`vi.mock('framer-motion', ...)`) to avoid JSDOM animation issues
- `next/image` must be mocked to a simple `<img>` passthrough in component tests
- The Vitest config uses `environment: 'jsdom'` and `vite-tsconfig-paths` for `@/` alias resolution
- `getNextIndex` and `getPrevIndex` are exported pure functions from `Lightbox.tsx` — they contain no React or browser dependencies, so they are directly importable in `.test.ts` (no rendering required for Property 8)
- Shadcn/UI `npx shadcn@latest init` generates `components/ui/` — use Card or Button primitives from there where appropriate in section components
- The `gallery` filenames and `achievement.imageFilename` values all reference the same `/public/prestasi/` directory; the three existing files cover the current data set

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "3.1"] },
    { "id": 1, "tasks": ["4.1", "5.1", "6.1", "7.1", "8.1", "9.1", "10.1", "12.1", "13.1"] },
    { "id": 2, "tasks": ["4.2", "4.3", "5.2", "6.2", "7.2", "8.2", "9.2", "9.3", "10.2", "12.2", "13.2"] },
    { "id": 3, "tasks": ["14.1"] }
  ]
}
```
