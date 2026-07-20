'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Pure helper functions for wrap-around navigation — exported for property tests
export function getNextIndex(current: number, total: number): number {
  return (current + 1) % total
}

export function getPrevIndex(current: number, total: number): number {
  return (current - 1 + total) % total
}

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  showNavigation?: boolean
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  showNavigation = false,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Keyboard listeners: Escape → close, ArrowLeft → prev, ArrowRight → next
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev()
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  // Scroll lock while open; restore on close/unmount
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Focus close button when lightbox opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen || images.length === 0) return null

  const currentSrc = images[currentIndex]

  // Close when clicking the backdrop (not the image/controls)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        aria-label="Tutup"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev button */}
      {showNavigation && onPrev && (
        <button
          aria-label="Sebelumnya"
          onClick={onPrev}
          className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <Image
          src={currentSrc}
          alt={`Gambar ${currentIndex + 1}`}
          width={1200}
          height={900}
          style={{
            maxHeight: '90vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>

      {/* Next button */}
      {showNavigation && onNext && (
        <button
          aria-label="Berikutnya"
          onClick={onNext}
          className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  )
}
