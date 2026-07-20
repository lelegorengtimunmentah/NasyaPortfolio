'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

interface MotivasiSectionProps {
  quote: string | undefined
}

export default function MotivasiSection({ quote }: MotivasiSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const displayQuote =
    !quote || quote.trim() === '' ? 'Kutipan tidak tersedia.' : quote

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 px-6 hero-gradient"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
            <Quote className="h-7 w-7 text-teal-300" />
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-white text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-relaxed italic"
        >
          &ldquo;{displayQuote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-white/30" />
          <span className="text-sm font-medium text-white/60 tracking-widest uppercase">
            Motivasi
          </span>
          <div className="h-px w-12 bg-white/30" />
        </motion.div>
      </div>
    </section>
  )
}
