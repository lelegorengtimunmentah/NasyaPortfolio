'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, GraduationCap, BookOpen, Brain, MapPin, Calendar, type LucideIcon } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import type { BiodataField } from '@/lib/data'

interface BiodataSectionProps {
  biodata: BiodataField[]
}

const iconMap: Record<string, LucideIcon> = {
  User,
  GraduationCap,
  BookOpen,
  Brain,
  MapPin,
  Calendar,
}

const iconColors = [
  'from-indigo-500 to-violet-600',
  'from-violet-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-teal-500 to-emerald-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function BiodataSection({ biodata }: BiodataSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-slate-50/80 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Identitas"
          title="Biodata Diri"
          description="Informasi pribadi dan akademik"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {biodata.map((field, index) => {
            const IconComponent = iconMap[field.icon] ?? User
            const gradient = iconColors[index % iconColors.length]

            return (
              <motion.div
                key={field.label}
                role="article"
                variants={item}
                className="group card-hover bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {field.label}
                  </p>
                  <p className="mt-1 font-semibold text-slate-800 leading-snug">{field.value}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
