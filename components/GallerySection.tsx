'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import Lightbox, { getNextIndex, getPrevIndex } from '@/components/Lightbox'
import SectionHeader from '@/components/SectionHeader'

interface GallerySectionProps {
  gallery: string[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set())

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const items = gallery.map((filename, i) => (
    <motion.div key={i} variants={item} className="break-inside-avoid mb-5">
      {errorIndices.has(i) ? (
        <div className="w-full h-48 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground text-sm border border-border">
          Gambar tidak tersedia
        </div>
      ) : (
        <button
          className="group relative w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={() => { setCurrentIndex(i); setIsOpen(true) }}
          aria-label={`Buka gambar ${i + 1}`}
        >
          <Image
            src={`/prestasi/${filename}`}
            alt={`Galeri ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setErrorIndices(prev => new Set(prev).add(i))}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all duration-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 group-hover:bg-white/90 text-white group-hover:text-indigo-700 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg">
              <ZoomIn className="h-5 w-5" />
            </span>
          </div>
        </button>
      )}
    </motion.div>
  ))

  const lightbox = (
    <Lightbox
      images={gallery.map(f => `/prestasi/${f}`)}
      currentIndex={currentIndex}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onPrev={() => setCurrentIndex(getPrevIndex(currentIndex, gallery.length))}
      onNext={() => setCurrentIndex(getNextIndex(currentIndex, gallery.length))}
      showNavigation={true}
    />
  )

  return (
    <section ref={ref} className="section-padding bg-slate-50/80 dark:bg-slate-900/50" id="galeri">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Dokumentasi"
          title="Galeri Prestasi"
          description="Momen-momen berharga dari perjalanan akademik"
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="columns-2 md:columns-3 gap-5"
        >
          {items}
        </motion.div>
      </div>
      {lightbox}
    </section>
  )
}
