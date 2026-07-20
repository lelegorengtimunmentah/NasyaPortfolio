'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { AboutData } from '@/lib/data'

interface AboutSectionProps {
  about: AboutData
}

export default function AboutSection({ about }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Tentang Saya</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/fotodiri/fotodiri.jpeg"
              alt="Foto Muhammad Choirun Nasya"
              width={400}
              height={400}
              className="rounded-2xl object-cover shadow-lg w-full max-w-sm"
            />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-700 leading-relaxed">{about.biography}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
