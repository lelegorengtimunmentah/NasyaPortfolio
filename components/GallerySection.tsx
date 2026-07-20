'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Lightbox, { getNextIndex, getPrevIndex } from '@/components/Lightbox'

interface GallerySectionProps {
  gallery: string[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set())

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const items = gallery.map((filename, i) => (
    <motion.div key={i} variants={item} className="break-inside-avoid mb-4">
      {errorIndices.has(i) ? (
        <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
          Gambar tidak tersedia
        </div>
      ) : (
        <button
          className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          onClick={() => { setCurrentIndex(i); setIsOpen(true) }}
          aria-label={`Buka gambar ${i + 1}`}
        >
          <Image
            src={`/prestasi/${filename}`}
            alt={`Galeri ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-auto rounded-lg object-cover hover:opacity-90 transition-opacity"
            onError={() => setErrorIndices(prev => new Set(prev).add(i))}
          />
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
    <section ref={ref} className="py-20 px-6 bg-white" id="galeri">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Galeri Prestasi</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="columns-2 md:columns-3 gap-4"
        >
          {items}
        </motion.div>
      </div>
      {lightbox}
    </section>
  )
}
