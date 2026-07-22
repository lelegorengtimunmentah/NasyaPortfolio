'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { GraduationCap } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import type { RiwayatPendidikan } from '@/lib/data'

interface Props {
  riwayatPendidikan: RiwayatPendidikan[]
}

const levelColors: Record<string, string> = {
  SD: 'from-green-500 to-emerald-600',
  SMP: 'from-blue-500 to-indigo-600',
  SMA: 'from-indigo-500 to-violet-600',
  'Perguruan Tinggi': 'from-violet-500 to-purple-600',
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function RiwayatPendidikanSection({ riwayatPendidikan }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="pendidikan"
      className="section-padding bg-slate-50/80 dark:bg-slate-900/50 relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          badge="Pendidikan"
          title="Riwayat Pendidikan"
          description="Perjalanan pendidikan formal dari tingkat menengah hingga perguruan tinggi"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {riwayatPendidikan.map((edu, i) => {
            const gradient = levelColors[edu.level] ?? 'from-slate-400 to-slate-600'
            const isUpcoming = edu.year.toLowerCase().includes('mendatang') || edu.year.toLowerCase().includes('rencana')

            return (
              <motion.div
                key={i}
                variants={item}
                className={[
                  'group relative rounded-2xl border border-border bg-card overflow-hidden card-hover',
                  isUpcoming && 'ring-2 ring-indigo-400/30 dark:ring-indigo-500/20',
                ].join(' ')}
              >
                {isUpcoming && (
                  <div className="absolute top-3 right-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-700/40">
                    Rencana
                  </div>
                )}

                {/* Gradient header strip */}
                <div className={`h-2 w-full bg-linear-to-r ${gradient}`} aria-hidden="true" />

                <div className="p-6">
                  {/* Institution logo */}
                  <div className="mb-4 flex items-center justify-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-white dark:bg-slate-800 shadow-sm p-2">
                      <Image
                        src={`/school/${edu.logo}`}
                        alt={`Logo ${edu.institution}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </div>

                  {/* Level badge */}
                  <div className="flex justify-center mb-3">
                    <span
                      className={[
                        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-gradient-to-r bg-clip-text text-transparent ring-1',
                        `bg-linear-to-r ${gradient}`,
                      ].join(' ')}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" style={{ WebkitTextFillColor: 'initial' }} />
                      {edu.level}
                    </span>
                  </div>

                  <h3 className="text-center font-heading font-bold text-foreground leading-snug">
                    {edu.institution}
                  </h3>

                  {edu.major && (
                    <p className="mt-1 text-center text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      {edu.major}
                    </p>
                  )}

                  <p className="mt-3 text-center text-sm font-medium text-muted-foreground bg-muted rounded-lg py-1.5 px-3">
                    {edu.year}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
