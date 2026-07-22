'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, Calendar } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import type { RiwayatPrestasi } from '@/lib/data'

interface Props {
  riwayatPrestasi: RiwayatPrestasi[]
}

function getMedalClass(medal: string): string {
  const m = medal.toLowerCase()
  if (m.includes('emas')) return 'medal-emas'
  if (m.includes('perak')) return 'medal-perak'
  if (m.includes('perunggu')) return 'medal-perunggu'
  if (m.includes('juara')) return 'medal-juara'
  return 'medal-peringkat'
}

function getMedalIcon(medal: string): string {
  const m = medal.toLowerCase()
  if (m.includes('emas')) return '🥇'
  if (m.includes('perak')) return '🥈'
  if (m.includes('perunggu')) return '🥉'
  if (m.includes('juara 1')) return '🏆'
  if (m.includes('juara 2')) return '🥈'
  if (m.includes('juara 3')) return '🥉'
  return '🏅'
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function RiwayatPrestasiSection({ riwayatPrestasi }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="riwayat-prestasi" className="section-padding bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <SectionHeader
          badge="Rekam Jejak"
          title="Riwayat Prestasi"
          description="Perjalanan kompetisi dan penghargaan akademik dari tingkat sekolah hingga nasional"
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-indigo-400 via-violet-400 to-teal-400 opacity-30 hidden sm:block"
          />

          <motion.ol
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            {riwayatPrestasi.map((prestasi, i) => (
              <motion.li
                key={i}
                variants={item}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className="hidden sm:flex absolute left-0 top-5 h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 shadow-sm text-xl z-10"
                >
                  {getMedalIcon(prestasi.medal)}
                </span>

                <div className="group rounded-2xl border border-border bg-card p-5 sm:p-6 card-hover">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    {/* Medal emoji visible on mobile */}
                    <span className="text-2xl sm:hidden">{getMedalIcon(prestasi.medal)}</span>

                    <span className={['rounded-full px-3 py-1 text-xs font-bold', getMedalClass(prestasi.medal)].join(' ')}>
                      {prestasi.medal}
                    </span>

                    <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-600">
                      {prestasi.level}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-foreground leading-snug">
                    {prestasi.subject}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {prestasi.event}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{prestasi.organizer}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {prestasi.date}
                    </span>
                    {prestasi.team && prestasi.team.length > 0 && (
                      <span className="flex items-start gap-1.5">
                        <Users className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>{prestasi.team.join(', ')}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Summary badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: '🥇', label: 'Medali Emas', count: riwayatPrestasi.filter(p => p.medal.toLowerCase().includes('emas')).length },
            { icon: '🥈', label: 'Medali Perak', count: riwayatPrestasi.filter(p => p.medal.toLowerCase().includes('perak')).length },
            { icon: '🥉', label: 'Medali Perunggu', count: riwayatPrestasi.filter(p => p.medal.toLowerCase().includes('perunggu')).length },
            { icon: '🏆', label: 'Juara', count: riwayatPrestasi.filter(p => p.medal.toLowerCase().includes('juara')).length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 shadow-sm"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.count}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
