'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { HeroData } from '@/lib/data'

interface HeroSectionProps {
  hero: HeroData
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const sectionStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #2563EB 100%)',
    backgroundSize: '200% 200%',
    ...(prefersReducedMotion ? {} : { animation: 'gradient-shift 8s ease infinite' }),
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      }

  const motionPropsDelayed = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.2 },
      }

  return (
    <section
      className="min-h-screen flex items-center py-20 px-6"
      style={sectionStyle}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        {/* Photo column */}
        <motion.div
          className="flex-shrink-0"
          {...motionProps}
        >
          <Image
            src="/fotodiri/fotodiri.jpeg"
            alt="Muhammad Choirun Nasya"
            width={400}
            height={400}
            preload={true}
            className="rounded-full object-cover shadow-2xl border-4 border-white/30"
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-col gap-6 text-white"
          {...motionPropsDelayed}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {hero.name}
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/90">
            {hero.title}
          </p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#prestasi"
              className="px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-white/90 transition-colors"
            >
              Lihat Prestasi
            </a>
            <a
              href="#tentang"
              className="px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Tentang Saya
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
