'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'
import type { Achievement } from '@/lib/data'

interface PrestasiSectionProps {
  achievements: Achievement[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function PrestasiSection({ achievements }: PrestasiSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set())

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Prestasi</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(37,99,235,0.35)' }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm"
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
            >
              {/* Image or placeholder */}
              <div className="relative h-48 bg-gray-100">
                {errorIndices.has(i) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <span>Gambar tidak tersedia</span>
                  </div>
                ) : (
                  <Image
                    src={`/prestasi/${achievement.imageFilename}`}
                    alt={achievement.title}
                    fill
                    className="object-cover"
                    onError={() => setErrorIndices(prev => new Set(prev).add(i))}
                  />
                )}
              </div>
              {/* Card body */}
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-1">{achievement.title}</h3>
                <p className="text-sm text-blue-600 font-medium">{achievement.eventName}</p>
                <p className="text-sm text-gray-500">{achievement.level} · {achievement.organizer}</p>
                <p className="text-sm text-gray-400 mt-1">{achievement.date}</p>
                {achievement.team && achievement.team.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">Tim: {achievement.team.join(', ')}</p>
                )}
              </div>
            </motion.div>
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
