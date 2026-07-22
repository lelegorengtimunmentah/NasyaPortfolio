'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Trophy, Users } from 'lucide-react'
import Lightbox from '@/components/Lightbox'
import SectionHeader from '@/components/SectionHeader'
import type { Achievement } from '@/lib/data'

interface PrestasiSectionProps {
  achievements: Achievement[]
}

const levelStyles: Record<string, string> = {
  Nasional: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  Regional: 'bg-teal-100 text-teal-700 ring-teal-200',
  Institusi: 'bg-violet-100 text-violet-700 ring-violet-200',
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function PrestasiSection({ achievements }: PrestasiSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set())

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          badge="Pencapaian"
          title="Prestasi"
          description="Rekam jejak kompetisi dan penghargaan akademik"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, i) => (
            <motion.article
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group bg-card rounded-2xl overflow-hidden cursor-pointer border border-border shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10 transition-shadow duration-300"
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
            >
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                {errorIndices.has(i) ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-2">
                    <Trophy className="h-8 w-8 opacity-40" />
                    <span className="text-sm">Gambar tidak tersedia</span>
                  </div>
                ) : (
                  <>
                    <Image
                      src={`/prestasi/${achievement.imageFilename}`}
                      alt={achievement.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => setErrorIndices(prev => new Set(prev).add(i))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                )}
                <span
                  className={[
                    'absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
                    levelStyles[achievement.level] ?? 'bg-slate-100 text-slate-600 ring-slate-200',
                  ].join(' ')}
                >
                  {achievement.level}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-foreground leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{achievement.eventName}</p>
                <p className="text-sm text-muted-foreground">{achievement.organizer}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-1">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  {achievement.date}
                </div>
                {achievement.team && achievement.team.length > 0 && (
                  <div className="flex items-start gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border mt-3 pt-3">
                    <Users className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{achievement.team.join(', ')}</span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={[`/prestasi/${achievements[lightboxIndex].imageFilename}`]}
          currentIndex={0}
          isOpen={lightboxOpen}
          onClose={() => { setLightboxOpen(false); setLightboxIndex(null) }}
          showNavigation={false}
        />
      )}
    </section>
  )
}
