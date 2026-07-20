'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
      className="py-24 px-6"
      style={{ background: 'linear-gradient(to right, #2563EB, #4F46E5)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-white text-xl md:text-2xl font-medium leading-relaxed italic"
        >
          &ldquo;{displayQuote}&rdquo;
        </motion.blockquote>
      </div>
    </section>
  )
}
