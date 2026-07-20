# Design Document: portfolio-nasya

## Overview

This document describes the technical design for Muhammad Choirun Nasya's personal portfolio website — a single-page application built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, and Shadcn/UI.

The site is a static, content-driven SPA. All profile data, achievement records, and gallery information live in a single centralized data file (`lib/data.ts`). Every section component is a React Server Component where possible, with `'use client'` boundaries drawn only where interactivity is required (Navbar scroll state, Lightbox, Framer Motion scroll-triggered animations).

---

## Architecture

### Rendering Model

This is a **static SPA** exported from Next.js App Router. Because all data is local and the site has no server-side data fetching, the entire app renders statically at build time.

- `app/layout.tsx` — Server Component. Hosts font loading, metadata, and `<html lang="id">`.
- `app/page.tsx` — Server Component. Imports all data from `lib/data.ts` and passes it as props down to interactive Client Components; purely static sections are rendered inline or as Server Components.
- `app/globals.css` — Contains `@import "tailwindcss"` as the sole Tailwind directive. No separate `tailwind.config` file.
- `lib/data.ts` — Static TypeScript module, no `'use client'` directive, exports all content constants.
- `components/` — Section components. Server Components by default; interactive ones marked `'use client'`.

### Component Boundary Strategy

Per the Next.js docs, `'use client'` should be added only at the boundary where client-side features are needed, not to every component in a subtree.

| Component | Rendering | Reason |
|---|---|---|
| `app/layout.tsx` | Server | Font loading, metadata, static markup |
| `app/page.tsx` | Server | Assembles and passes data; no interaction |
| `components/Navbar.tsx` | **Client** | `useState` for mobile menu + `useEffect`/`useScroll` for background change |
| `components/HeroSection.tsx` | **Client** | Framer Motion entrance animation, `useReducedMotion` |
| `components/AboutSection.tsx` | **Client** | Framer Motion scroll-triggered animation |
| `components/BiodataSection.tsx` | **Client** | Framer Motion stagger animation |
| `components/PrestasiSection.tsx` | **Client** | Framer Motion stagger, hover variants, Lightbox `useState` |
| `components/GallerySection.tsx` | **Client** | Lightbox `useState`, Framer Motion stagger |
| `components/MotivasiSection.tsx` | **Client** | Framer Motion scroll-triggered animation |
| `components/Footer.tsx` | Server | Static markup, receives data as props |
| `components/Lightbox.tsx` | **Client** | Modal state, keyboard events, scroll-lock |

### Dependency Installation

The following packages are not in the current `package.json` and must be installed before implementation:

```bash
npm install framer-motion lucide-react
npx shadcn@latest init
```

Framer Motion and Lucide React are runtime dependencies. Shadcn/UI generates unstyled component source files (e.g., for Card, Button) into `components/ui/`.

---

## Components and Interfaces

### `lib/data.ts`

Central data module. Exports strictly-typed constants, no `'use client'` directive.

```
lib/
  data.ts   ← all profile + achievement data
```

### Directory Structure

```
app/
  layout.tsx          ← Server Component; Inter font, metadata, lang="id"
  page.tsx            ← Server Component; assembles all sections
  globals.css         ← @import "tailwindcss"; CSS custom properties; keyframes

components/
  Navbar.tsx          ← Client Component
  HeroSection.tsx     ← Client Component
  AboutSection.tsx    ← Client Component
  BiodataSection.tsx  ← Client Component
  PrestasiSection.tsx ← Client Component
  GallerySection.tsx  ← Client Component
  MotivasiSection.tsx ← Client Component
  Footer.tsx          ← Server Component
  Lightbox.tsx        ← Client Component

lib/
  data.ts             ← Data file (no 'use client')

public/
  fotodiri/
    fotodiri.jpeg
  prestasi/
    prestasi1.webp
    prestasiolimpiadesainsairlangga.webp
    wisudadanpenghargaan.webp
```

### `app/layout.tsx`

```tsx
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Muhammad Choirun Nasya | Portfolio',
  description: 'Portfolio resmi Muhammad Choirun Nasya, Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang.',
  openGraph: {
    title: 'Muhammad Choirun Nasya | Portfolio',
    description: 'Portfolio resmi Muhammad Choirun Nasya, Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

Key notes:
- `Inter` is a variable font so no `weight` is required.
- `variable: '--font-inter'` exposes the CSS variable for Tailwind's `font-sans` mapping in `globals.css`.
- `lang="id"` per Requirement 1.4.
- `openGraph` object covers `og:title`, `og:description`, `og:type` per Requirement 1.3.

### `app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --color-primary: #2563EB;
  --color-secondary: #4F46E5;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

- `@import "tailwindcss"` is the sole Tailwind directive (no v3-style `@tailwind base/components/utilities`).
- `@theme inline` maps the Inter CSS variable to `--font-sans` and defines design tokens for use in utilities.
- The gradient keyframe is defined here for the Hero background animation.

### `app/page.tsx`

Server Component. Imports all data and renders each section:

```tsx
import { siteData } from '@/lib/data'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import BiodataSection from '@/components/BiodataSection'
import PrestasiSection from '@/components/PrestasiSection'
import GallerySection from '@/components/GallerySection'
import MotivasiSection from '@/components/MotivasiSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection hero={siteData.hero} />
        <AboutSection about={siteData.about} />
        <BiodataSection biodata={siteData.biodata} />
        <PrestasiSection achievements={siteData.achievements} />
        <GallerySection gallery={siteData.gallery} />
        <MotivasiSection quote={siteData.motivationalQuote} />
      </main>
      <Footer footer={siteData.footer} />
    </>
  )
}
```

### `components/Navbar.tsx` (Client Component)

- Sticky positioning via Tailwind `fixed top-0 w-full z-50`.
- `useState` for mobile menu open/close toggle.
- `useEffect` + `window.addEventListener('scroll', ...)` to detect scroll > 20px and apply background class.
- Navigation links are plain `<a href="#section-id">` anchors with `scroll-behavior: smooth` applied globally on `html` via CSS.
- Mobile breakpoint: links hidden on `< md`, hamburger button visible. On `>= md`, links in horizontal row.
- Close mobile menu when a link is clicked.

### `components/HeroSection.tsx` (Client Component)

- `useReducedMotion()` from Framer Motion — if true, skip animation variants and gradient animation.
- Gradient background: `background-size: 200% 200%` + `animation: gradient-shift 8s ease infinite` applied via Tailwind's arbitrary values or inline style.
- Framer Motion `motion.div` with `initial={{ opacity: 0, y: 40 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6 }}` for photo and text content.
- Two-column layout on `md:` breakpoint: photo left, text right. Stack on mobile.
- Profile photo via `<Image src="/fotodiri/fotodiri.jpeg" alt="Muhammad Choirun Nasya" width={400} height={400} priority />`.
- CTA buttons link to `#prestasi` and `#tentang`.

### `components/AboutSection.tsx` (Client Component)

- Framer Motion `useInView` hook with `once: true` to trigger animation when section enters viewport.
- Photo column: `initial={{ opacity: 0, x: -50 }}`, `animate` when in view.
- Text column: `initial={{ opacity: 0, x: 50 }}`, `animate` when in view.
- Photo via `<Image src="/fotodiri/fotodiri.jpeg" alt="Foto Muhammad Choirun Nasya" ... />`.
- Two-column layout on `md:` breakpoint.

### `components/BiodataSection.tsx` (Client Component)

- Framer Motion `useInView` with `once: true` and stagger container variant.
- Each biodata field rendered as a card with: Lucide icon, label, value from data.
- Stagger: `staggerChildren: 0.1`, each card `duration: 0.3`, fade + scale (`scale: 0.95 → 1`).
- Biodata fields: Nama, Universitas, Fakultas, Program Studi, Alamat, Umur — icons mapped per field.

### `components/PrestasiSection.tsx` (Client Component)

- `useState` for lightbox open state and selected image index.
- Framer Motion stagger on scroll via `useInView` + `staggerChildren: 0.1`.
- Each Achievement Card:
  - `<Image>` with `src={/prestasi/${achievement.imageFilename}}` and `onError` handler for placeholder fallback.
  - Framer Motion hover variant: `whileHover={{ scale: 1.05 }}` + CSS `box-shadow` transition for glow.
  - Displays title, event, level, organizer, date.
  - If `achievement.team` is non-empty array, renders team member list.
  - `onClick` sets lightbox open + current index.
- Passes selected image to `<Lightbox>`.

### `components/GallerySection.tsx` (Client Component)

- CSS multi-column masonry: `columns-2 md:columns-3` Tailwind classes on the container.
- Each image: `<Image>` wrapped in a `<button>` for click-to-open lightbox.
- Framer Motion stagger fade-up on scroll via `useInView` + `staggerChildren: 0.1`.
- `useState` for lightbox index and open state.
- Passes images array, current index, prev/next handlers to `<Lightbox>`.

### `components/Lightbox.tsx` (Client Component)

- Shared component used by both Prestasi and Gallery sections.
- Props:
  - `images: string[]` — array of image src paths
  - `currentIndex: number`
  - `isOpen: boolean`
  - `onClose: () => void`
  - `onPrev?: () => void`
  - `onNext?: () => void`
  - `showNavigation?: boolean` — Gallery uses prev/next, Prestasi just shows single image
- Renders as a fixed full-screen overlay with `z-50`.
- Closes on backdrop click or close button click.
- `useEffect` to add keyboard listeners (`Escape` to close, arrow keys for navigation).
- Scroll lock via `document.body.style.overflow = 'hidden'` while open.
- Wraps around: first image → prev → last image; last image → next → first image.
- Image sized to fit within viewport (`max-h-[90vh] max-w-[90vw]`).
- Preserves scroll position: no `scrollTop` manipulation on open/close.

### `components/MotivasiSection.tsx` (Client Component)

- Framer Motion `useInView` with `once: true`, fade-up entrance, `duration: 0.7` (≤ 800ms).
- Full-width gradient background: `from-[#2563EB] to-[#4F46E5]` direction left-to-right.
- Renders `quote` prop or fallback `"Kutipan tidak tersedia."` if empty/undefined.

### `components/Footer.tsx` (Server Component)

- Receives `footer: FooterData` prop from `page.tsx`.
- Renders name, role, institution, copyright year — all from data prop, no hardcoded strings.

---

## Data Models

All types live in `lib/data.ts` and are exported alongside the data constants.

```ts
// lib/data.ts

export interface BiodataField {
  label: string
  value: string
  icon: string // Lucide icon name string, component resolved in BiodataSection
}

export interface Achievement {
  title: string
  eventName: string
  level: string
  organizer: string
  date: string
  imageFilename: string  // filename only, e.g. "prestasi1.webp"
  team?: string[]        // optional; omit or empty array if individual achievement
}

export interface HeroData {
  name: string
  title: string
  description: string
}

export interface AboutData {
  biography: string
}

export interface FooterData {
  name: string
  role: string
  institution: string
  copyrightYear: number
}

export interface SiteData {
  hero: HeroData
  about: AboutData
  biodata: BiodataField[]
  achievements: Achievement[]
  gallery: string[]           // array of image filenames in /public/prestasi/
  motivationalQuote: string
  footer: FooterData
}

export const siteData: SiteData = {
  hero: {
    name: 'Muhammad Choirun Nasya',
    title: 'Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang',
    description: '...',
  },
  about: {
    biography: '...',
  },
  biodata: [
    { label: 'Nama', value: 'Muhammad Choirun Nasya', icon: 'User' },
    { label: 'Universitas', value: 'UIN Maulana Malik Ibrahim Malang', icon: 'GraduationCap' },
    { label: 'Fakultas', value: 'Psikologi', icon: 'BookOpen' },
    { label: 'Program Studi', value: 'Psikologi', icon: 'Brain' },
    { label: 'Alamat', value: '...', icon: 'MapPin' },
    { label: 'Umur', value: '...', icon: 'Calendar' },
  ],
  achievements: [
    {
      title: '...',
      eventName: '...',
      level: '...',
      organizer: '...',
      date: '...',
      imageFilename: 'prestasi1.webp',
    },
    // ... 5 more achievements, mapped to available images
  ],
  gallery: [
    'prestasi1.webp',
    'prestasiolimpiadesainsairlangga.webp',
    'wisudadanpenghargaan.webp',
  ],
  motivationalQuote: '...',
  footer: {
    name: 'Muhammad Choirun Nasya',
    role: 'Mahasiswa',
    institution: 'UIN Maulana Malik Ibrahim Malang',
    copyrightYear: 2025,
  },
}
```

Notes:
- `icon` in `BiodataField` is a string key mapping to a Lucide component. `BiodataSection` resolves the icon component dynamically from a lookup map.
- `gallery` filenames reference images already in `/public/prestasi/`. Achievement `imageFilename` entries map to the same directory.
- No `any` type used anywhere.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navbar scroll threshold behavior

*For any* scroll position value in pixels, if the position is greater than 20, the Navbar should apply the "scrolled" background state; if the position is 20 or less, the Navbar should apply the "transparent" background state.

**Validates: Requirements 2.4**

### Property 2: Hero section renders all data fields

*For any* `HeroData` object with non-empty `name`, `title`, and `description`, the rendered `HeroSection` should contain all three values in the output.

**Validates: Requirements 3.2**

### Property 3: About section renders biography

*For any* `AboutData` with a non-empty `biography` string, the rendered `AboutSection` should contain that biography string.

**Validates: Requirements 4.1**

### Property 4: Biodata section renders N cards for N fields

*For any* array of N `BiodataField` objects (where N ≥ 1), the `BiodataSection` should render exactly N card elements, and each rendered card should contain the corresponding field's `label` and `value`.

**Validates: Requirements 5.2, 5.3, 10.3**

### Property 5: Achievement card data integrity

*For any* `Achievement` object in the data file, the rendered `PrestasiSection` output should contain the achievement's `title`, `eventName`, `level`, `organizer`, `date`, and an image `src` derived from the achievement's `imageFilename` — no transformation or truncation.

**Validates: Requirements 6.1, 6.2**

### Property 6: Team display invariant

*For any* `Achievement` where `team` is a non-empty array of strings, the rendered card should display all team member names present in that array; *for any* `Achievement` where `team` is undefined or empty, no team member names should appear.

**Validates: Requirements 6.7**

### Property 7: Gallery renders N images from data

*For any* `SiteData` where `gallery` contains N filenames (N ≥ 1), the `GallerySection` should render exactly N image elements, each with a `src` derived from the corresponding filename in `gallery`.

**Validates: Requirements 7.1, 7.2, 10.3**

### Property 8: Gallery lightbox navigation wrap-around

*For any* gallery of N images (N ≥ 1), pressing next on the last image (index N-1) should display the first image (index 0), and pressing previous on the first image (index 0) should display the last image (index N-1).

**Validates: Requirements 7.4**

### Property 9: Motivational quote displays content or fallback

*For any* value of `motivationalQuote` — including empty string and undefined — the `MotivasiSection` should render either the quote text (if non-empty) or the string `"Kutipan tidak tersedia."` (never render an empty section body).

**Validates: Requirements 8.1, 8.2**

### Property 10: Footer renders all data fields

*For any* valid `FooterData` object, all visible text in `Footer` should be derivable from that object's fields — `name`, `role`, `institution`, and `copyrightYear` — with no hardcoded strings inline.

**Validates: Requirements 9.1, 9.2**

---

## Error Handling

### Image Load Failures

- All `<Image>` components in `PrestasiSection` use `onError` to swap `src` to a placeholder element (a styled `<div>` with a muted background and icon).
- Gallery images use the same `onError` pattern.
- `next/image` handles responsive sizing and format conversion automatically; no custom loader is needed for local `/public/` assets.

### Missing Quote

- `MotivasiSection` guards against `!quote || quote.trim() === ''` and renders the Indonesian fallback string.

### TypeScript Compile Errors

- `tsconfig.json` strict mode is already active (default for `create-next-app`). All exported types from `lib/data.ts` must be exhaustively satisfied by `siteData`.
- Build fails fast on type errors (`next build` runs `tsc` and `eslint` by default).

### Accessibility

- All `<Image>` components require non-empty `alt` attributes.
- Lightbox includes `role="dialog"`, `aria-modal="true"`, and focuses the close button on open.
- Navbar hamburger button includes `aria-label="Buka menu navigasi"` / `"Tutup menu navigasi"`.
- Smooth scroll is CSS-native (`scroll-behavior: smooth` on `html`) — no JavaScript-based scroll, so it works even if JS is slow to hydrate.

---

## Testing Strategy

### PBT Applicability Assessment

This project is a static, content-driven portfolio site. The core logic units are:

- Data shape validation (TypeScript types serve as compile-time proof)
- Lightbox navigation (wrap-around index arithmetic is a pure function)
- Component rendering logic (data → rendered output)
- Fallback/guard conditions (empty quote, missing team field)

Property-based testing applies to the pure logic parts (lightbox index arithmetic, data rendering contracts). UI rendering tests use example-based snapshot tests.

**PBT Library**: [fast-check](https://fast-check.dev/) for TypeScript. No need to install a separate runner — it integrates with Jest or Vitest.

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom fast-check
```

### Unit Tests (Example-Based)

Target specific behaviors with concrete inputs:

- `Navbar`: scroll threshold triggers background class change.
- `BiodataSection`: renders exactly 6 cards for 6-item input array.
- `MotivasiSection`: renders fallback text for empty string.
- `MotivasiSection`: renders fallback text for undefined.
- `Lightbox`: `Escape` key triggers `onClose`.
- `Lightbox`: backdrop click triggers `onClose`.
- `Footer`: displays all four footer fields.

### Property-Based Tests

Each property test runs ≥ 100 iterations via fast-check.

```ts
// Tag format: Feature: portfolio-nasya, Property N: <property_text>

// Feature: portfolio-nasya, Property 1: Navbar scroll threshold behavior
test('navbar background switches at scroll > 20', () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 1000 }), (scrollY) => {
      const state = getNavbarState(scrollY)
      if (scrollY > 20) return state === 'scrolled'
      return state === 'transparent'
    })
  )
})

// Feature: portfolio-nasya, Property 4: Biodata section renders N cards for N fields
test('biodata section card count matches input length', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({ label: fc.string(), value: fc.string(), icon: fc.string() }), { minLength: 1 }),
      (fields) => {
        const { getAllByRole } = render(<BiodataSection biodata={fields} />)
        return getAllByRole('article').length === fields.length
      }
    )
  )
})

// Feature: portfolio-nasya, Property 8: Gallery lightbox navigation wrap-around
test('lightbox wraps next on last image', () => {
  fc.assert(
    fc.property(fc.integer({ min: 1, max: 50 }), (n) => {
      const result = getNextIndex(n - 1, n)
      return result === 0
    })
  )
})

test('lightbox wraps prev on first image', () => {
  fc.assert(
    fc.property(fc.integer({ min: 1, max: 50 }), (n) => {
      const result = getPrevIndex(0, n)
      return result === n - 1
    })
  )
})

// Feature: portfolio-nasya, Property 9: Motivational quote displays content or fallback
test('renders quote for any non-empty string', () => {
  fc.assert(
    fc.property(fc.string({ minLength: 1 }), (quote) => {
      const { getByText } = render(<MotivasiSection quote={quote} />)
      return !!getByText(quote)
    })
  )
})

test('renders fallback for any blank or undefined quote', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.constant(''), fc.constant('   '), fc.constant(undefined)),
      (quote) => {
        const { getByText } = render(<MotivasiSection quote={quote as string | undefined} />)
        return !!getByText('Kutipan tidak tersedia.')
      }
    )
  )
})
```

### Integration / Smoke Tests

- `next build` must complete with zero TypeScript errors and zero ESLint errors (Requirement 10.5).
- All image `src` paths in `siteData.gallery` and `siteData.achievements` should have corresponding files in `/public/prestasi/`.

### Testing Notes

- Component tests use `@testing-library/react` with `jsdom` environment (Vitest config).
- Framer Motion should be mocked in unit tests (`jest.mock('framer-motion', ...)`) to avoid JSDOM animation issues.
- `next/image` should be mocked in unit tests to a simple `<img>` passthrough.
- No snapshot tests for full sections — they become brittle as copy changes.
