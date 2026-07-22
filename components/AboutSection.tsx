'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import type { AboutData } from '@/lib/data'

interface AboutSectionProps {
  about: AboutData
}

export default function AboutSection({ about }: AboutSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          badge="Profil"
          title="Tentang Saya"
          description="Perjalanan akademik dan passion dalam dunia psikologi"
        />

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="relative shrink-0"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-teal-50 dark:from-indigo-900/20 dark:to-teal-900/10 -z-10"
            />
            <Image
              src="/fotodiri/fotodiri.jpeg"
              alt="Foto Muhammad Choirun Nasya"
              width={400}
              height={400}
              className="rounded-2xl object-cover shadow-xl shadow-indigo-500/10 w-full max-w-sm ring-1 ring-slate-100 dark:ring-white/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-8 lg:p-10"
          >
            <p className="text-slate-600 leading-[1.85] text-base lg:text-[1.05rem] text-justify">
              {about.biography}
            </p>
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}
