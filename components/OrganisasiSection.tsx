'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, CalendarDays } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import type { Organisasi } from '@/lib/data'

interface Props {
  organisasi: Organisasi[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
}

export default function OrganisasiSection({ organisasi }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="organisasi"
      className="section-padding bg-background relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          badge="Kegiatan"
          title="Organisasi"
          description="Keterlibatan aktif dalam organisasi dan komunitas"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {organisasi.map((org, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-6 card-hover"
            >
              {/* Logo */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-white dark:bg-slate-800 shadow-sm">
                <Image
                  src={`/organisasi/${org.logo}`}
                  alt={`Logo ${org.name}`}
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-foreground leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {org.name}
                </h3>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" />
                    {org.role}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    {org.period}
                  </span>
                </div>

                {org.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {org.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
