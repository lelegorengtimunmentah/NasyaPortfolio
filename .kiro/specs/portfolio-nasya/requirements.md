# Requirements Document

## Introduction

This document defines the requirements for the personal portfolio website of Muhammad Choirun Nasya, a Psychology student at UIN Maulana Malik Ibrahim Malang. The website is a single-page application built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Shadcn/UI. It showcases his academic background, personal biography, achievements, and a photo gallery — all with a minimalist, premium, and fully responsive design.

## Glossary

- **Portfolio_Site**: The complete single-page portfolio web application.
- **Navbar**: The sticky navigation bar at the top of the page with smooth-scroll links.
- **Hero_Section**: The first visible section featuring the profile photo and introductory text.
- **About_Section**: The "Tentang Saya" section with personal biography and a two-column layout.
- **Biodata_Section**: The biographical data card section with icon-decorated fields.
- **Prestasi_Section**: The "Prestasi" (Achievements) section with a timeline layout and modal/lightbox.
- **Gallery_Section**: The "Galeri Prestasi" masonry photo gallery with lightbox navigation.
- **Motivasi_Section**: The motivational quote section with gradient background.
- **Footer**: The page footer with personal and institutional information.
- **Lightbox**: A full-screen modal overlay for displaying enlarged images with navigation.
- **Achievement_Card**: A clickable card in the Prestasi_Section that opens the Lightbox.
- **Framer_Motion**: The animation library used for scroll-triggered and hover animations.
- **next/image**: The Next.js Image component used for all image rendering.
- **Shadcn_UI**: The component library providing accessible, unstyled base components.
- **Lucide_React**: The icon library providing SVG icons for the Biodata_Section and Navbar.
- **Data_File**: The `lib/data.ts` file containing all static profile and achievement data.

---

## Requirements

### Requirement 1: Global Layout, SEO, and Fonts

**User Story:** As a visitor, I want the site to have correct metadata, a professional font, and a consistent layout, so that the page loads correctly, looks polished, and ranks well in search engines.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use the Inter font loaded via `next/font/google`, with the resulting CSS variable applied as the default font-family on the `<body>` element through the root layout.
2. THE Portfolio_Site SHALL export a static `Metadata` object from `app/layout.tsx` with `title` set to `"Muhammad Choirun Nasya | Portfolio"` and `description` set to `"Portfolio resmi Muhammad Choirun Nasya, Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang."`.
3. THE Portfolio_Site SHALL include Open Graph metadata fields `og:title`, `og:description`, and `og:type` (set to `"website"`) in the `Metadata` export in `app/layout.tsx`.
4. THE Portfolio_Site SHALL set the HTML `lang` attribute to `"id"` in the root layout.
5. THE Portfolio_Site SHALL use Tailwind CSS v4 with `@import "tailwindcss"` as the sole Tailwind directive in `app/globals.css`, with no separate `tailwind.config` file.

### Requirement 2: Sticky Navbar with Smooth Scroll

**User Story:** As a visitor, I want a sticky navigation bar that scrolls me smoothly to each section, so that I can navigate the single-page layout without confusion.

#### Acceptance Criteria

1. THE Navbar SHALL remain fixed at the top of the viewport at all scroll positions, never scrolling out of view.
2. THE Navbar SHALL contain navigation links for the following sections: Home (`#hero`), Tentang (`#tentang`), Biodata (`#biodata`), Prestasi (`#prestasi`), and Galeri (`#galeri`).
3. WHEN a Navbar link is clicked, THE page SHALL scroll smoothly to the corresponding section without a full-page reload.
4. WHEN the user scrolls down more than 20 pixels from the top, THE Navbar SHALL apply a visually distinct background style that is clearly different from the fully transparent state it has at the top of the page.
5. THE Navbar SHALL display all navigation links in a horizontal row on viewports 768px wide and above, and SHALL display a toggle button that opens and closes a vertical navigation menu on viewports narrower than 768px.
6. WHEN the toggle button is activated on a mobile viewport, THE Navbar SHALL reveal the vertical navigation menu; WHEN activated again or a link is clicked, THE Navbar SHALL hide the menu.

### Requirement 3: Hero Section

**User Story:** As a visitor, I want to see a visually striking hero section with the subject's photo and introduction, so that I immediately understand who this portfolio belongs to.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a profile photo loaded via `next/image` with the source path `/fotodiri/fotodiri.jpeg`.
2. THE Hero_Section SHALL display the name `"Muhammad Choirun Nasya"`, the title `"Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang"`, and the full description paragraph sourced from the Data_File.
3. THE Hero_Section SHALL contain two call-to-action buttons: `"Lihat Prestasi"` (linking to `#prestasi`) and `"Tentang Saya"` (linking to `#tentang`).
4. THE Hero_Section SHALL render a two-column layout on viewports 768px and wider (photo on the left, text content on the right), and a single-column stacked layout on narrower viewports with the photo displayed above the text.
5. THE Hero_Section SHALL include a continuously running gradient background animation that visibly transitions between the primary blue (`#2563EB`) and secondary indigo (`#4F46E5`) colors using a CSS `@keyframes` animation or Framer_Motion.
6. WHEN the Hero_Section mounts, THE Hero_Section SHALL animate the photo and text content upward from an offset position into their final positions (fade-up entrance) using Framer_Motion.
7. WHEN the `prefers-reduced-motion` media feature is set to `reduce`, THE Hero_Section SHALL skip all entrance and background animations, displaying content in its final state immediately.

### Requirement 4: Tentang Saya (About) Section

**User Story:** As a visitor, I want to read a personal biography section, so that I can learn more about Nasya's background, hobbies, and personality.

#### Acceptance Criteria

1. THE About_Section SHALL display the heading `"Tentang Saya"` and the full biography text sourced from the Data_File.
2. THE About_Section SHALL render a two-column layout on viewports 768px and wider with the photo on the left and the biography text on the right, and a single-column stacked layout on narrower viewports with the photo displayed above the text.
3. THE About_Section SHALL display a photo loaded via `next/image` from the `/public/fotodiri/` directory, with a descriptive non-empty `alt` attribute.
4. WHEN the About_Section enters the viewport during scroll, THE About_Section SHALL animate the photo column with a fade-left entrance and the text column with a fade-right entrance using Framer_Motion; this animation plays once and does not repeat on subsequent scroll events.

### Requirement 5: Biodata Section

**User Story:** As a visitor, I want to see structured personal data in a clean card layout, so that I can quickly identify key facts about Nasya.

#### Acceptance Criteria

1. THE Biodata_Section SHALL display a visible section heading.
2. THE Biodata_Section SHALL render each of the following biodata fields as a distinct card containing a Lucide_React icon, a label, and the corresponding value sourced from the Data_File: Nama, Universitas, Fakultas, Program Studi, Alamat, and Umur.
3. THE Biodata_Section SHALL source all displayed values from the Data_File (`lib/data.ts`) and SHALL NOT contain any hardcoded string or number values for the biodata fields inline in the component.
4. WHEN the Biodata_Section enters the viewport during scroll, THE Framer_Motion SHALL animate each card with a fade and scale entrance, with a stagger delay of 0.1 seconds between each card and a duration of 0.3 seconds per card.

### Requirement 6: Prestasi (Achievements) Section

**User Story:** As a visitor, I want to view Nasya's achievements in a visual timeline, so that I can appreciate their accomplishments in a clear and engaging way.

#### Acceptance Criteria

1. THE Prestasi_Section SHALL render all 6 achievements sourced from the Data_File in a timeline or card layout, each displaying the achievement title, event name, level, organizer, and date.
2. THE Prestasi_Section SHALL display the corresponding achievement image from `/public/prestasi/` for each achievement card using `next/image`, where the image filename is mapped in the Data_File.
3. WHEN an Achievement_Card is hovered, THE Achievement_Card SHALL apply an image scale transform of at least 1.05, a box-shadow increase of at least 8px blur, and a blue glow effect (`box-shadow` using the primary blue color `#2563EB`) using CSS transitions or Framer_Motion hover variants.
4. WHEN an Achievement_Card is clicked, THE Prestasi_Section SHALL open the Lightbox displaying the full-size achievement image.
5. WHEN the Lightbox is open, THE Lightbox SHALL be closable by clicking outside the image area or by activating a visible close button, returning the user to the same scroll position.
6. WHEN the Prestasi_Section enters the viewport, THE Framer_Motion SHALL animate each Achievement_Card with a scroll-triggered stagger animation, with a delay of 0.1 seconds between each card.
7. IF an achievement in the Data_File has a `team` field defined as a non-empty array of strings, THE Achievement_Card SHALL display all team member names from that field.
8. IF an achievement image fails to load, THE Achievement_Card SHALL display a visible placeholder in place of the broken image.

### Requirement 7: Galeri Prestasi (Gallery) Section

**User Story:** As a visitor, I want to browse all achievement photos in a masonry gallery, so that I can explore the visual evidence of Nasya's accomplishments.

#### Acceptance Criteria

1. THE Gallery_Section SHALL render all gallery images in a CSS multi-column layout with 2 columns on viewports narrower than 768px and 3 or more columns on viewports 768px and wider, using `next/image` for each image.
2. THE Gallery_Section SHALL source the list of image filenames exclusively from the Data_File.
3. WHEN a gallery image is clicked, THE Lightbox SHALL open displaying the full-size version of that clicked image, with visible previous and next navigation buttons, sized to fit within the viewport.
4. WHEN the next navigation button is activated on the last image, THE Lightbox SHALL display the first image; WHEN the previous navigation button is activated on the first image, THE Lightbox SHALL display the last image.
5. IF the Lightbox is open, THE Lightbox SHALL close when the user clicks outside the image area or activates a visible close button, and the page scroll position SHALL be preserved.
6. WHEN the Gallery_Section enters the viewport, THE Framer_Motion SHALL animate each gallery image with a stagger fade-up entrance, with a delay of 0.1 seconds between each image.

### Requirement 8: Motivasi (Quote) Section

**User Story:** As a visitor, I want to read an inspiring motivational quote in a visually distinct section, so that the page ends on a positive and memorable note before the footer.

#### Acceptance Criteria

1. THE Motivasi_Section SHALL display the quote text sourced from the Data_File using the `motivationalQuote` key.
2. IF the `motivationalQuote` value in the Data_File is an empty string or undefined, THE Motivasi_Section SHALL render a visible fallback message such as `"Kutipan tidak tersedia."` in place of the quote.
3. THE Motivasi_Section SHALL render as a full-width section with a left-to-right gradient background transitioning from the primary blue to the secondary indigo design tokens defined in the project's Tailwind configuration.
4. WHEN the Motivasi_Section enters the viewport, THE Motivasi_Section SHALL animate the quote text with a fade-up entrance using Framer_Motion, with a duration of at most 800ms; this animation plays once and does not repeat on subsequent scroll events.

### Requirement 9: Footer

**User Story:** As a visitor, I want to see a clean footer with attribution information, so that I know the portfolio's owner and institution at a glance.

#### Acceptance Criteria

1. THE Footer SHALL display, in a visually separated section at the bottom of the page: the owner's name, their role, their institution, and a copyright notice including the year.
2. THE Footer SHALL source all displayed values — name, role, institution, and copyright year — from the Data_File, with no hardcoded string values inline in the Footer component.

### Requirement 10: Data File and Code Quality

**User Story:** As a developer, I want all profile and achievement data centralized in a single file, so that future updates require changes in only one place.

#### Acceptance Criteria

1. THE Data_File (`lib/data.ts`) SHALL export a typed constant containing: the hero description, biography text, biodata fields (Nama, Universitas, Fakultas, Program Studi, Alamat, Umur), all 6 achievements (each with title, event name, level, organizer, date, image filename, and optional team members array), gallery image filenames, motivational quote string, and footer data (name, role, institution, copyright year).
2. THE Portfolio_Site SHALL use strict TypeScript types for all data structures exported from the Data_File, with no use of `any`.
3. THE Portfolio_Site SHALL ensure each section component receives its data exclusively via props or direct import from the Data_File; no hardcoded string, number, array, or object value that represents profile or achievement content SHALL appear inline in any section component.
4. THE Portfolio_Site SHALL use `next/image` for every image rendered across all sections.
5. WHEN the production build is run via `next build`, THE Portfolio_Site SHALL complete with zero TypeScript errors as reported by the TypeScript compiler and zero ESLint errors as reported by ESLint.
6. THE Portfolio_Site SHALL be ready to run with `npm install` followed by `npm run dev` without any additional configuration steps.
