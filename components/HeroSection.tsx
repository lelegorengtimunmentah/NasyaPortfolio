'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import type { HeroData } from '@/lib/data'

interface HeroSectionProps {
  hero: HeroData
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const sectionStyle: React.CSSProperties = {
    ...(prefersReducedMotion ? {} : { animation: 'gradient-shift 10s ease infinite' }),
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
      }

  const motionPropsDelayed = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.15 },
      }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden py-24 px-6 hero-gradient"
      style={sectionStyle}
    >
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"
        style={prefersReducedMotion ? undefined : { animation: 'pulse-soft 6s ease-in-out infinite' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-14 lg:gap-20">
        <motion.div className="relative flex-shrink-0" {...motionProps}>
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-full bg-gradient-to-br from-white/30 via-teal-300/20 to-violet-300/30 blur-sm"
          />
          <div className="relative rounded-full p-1.5 ring-2 ring-white/40 ring-offset-4 ring-offset-transparent">
            <Image
              src="/fotodiri/fotodiri.jpeg"
              alt="Muhammad Choirun Nasya"
              width={400}
              height={400}
              preload={true}
              className="rounded-full object-cover shadow-2xl shadow-indigo-900/40 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col gap-6 text-white text-center md:text-left" {...motionPropsDelayed}>
          <div className="inline-flex items-center gap-2 self-center md:self-start rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-teal-300" />
            Portfolio Mahasiswa Psikologi
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            {hero.name}
          </h1>

          <p className="text-lg md:text-xl font-medium text-indigo-100/95 max-w-xl">
            {hero.title}
          </p>

          <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
            {hero.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
            <a
              href="#prestasi"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 transition-all hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5"
            >
              Lihat Prestasi
            </a>
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/60"
            >
              Tentang Saya
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#tentang"
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown
          className="h-5 w-5"
          style={prefersReducedMotion ? undefined : { animation: 'float 2s ease-in-out infinite' }}
        />
      </a>
    </section>
  )
}
