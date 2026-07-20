'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, GraduationCap, BookOpen, Brain, MapPin, Calendar, type LucideIcon } from 'lucide-react'
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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function BiodataSection({ biodata }: BiodataSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Biodata Diri</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {biodata.map((field) => {
            const IconComponent = iconMap[field.icon] ?? User
            return (
              <motion.div
                key={field.label}
                role="article"
                variants={item}
                className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
              >
                <IconComponent className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">{field.label}</p>
                  <p className="font-semibold text-gray-800">{field.value}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
