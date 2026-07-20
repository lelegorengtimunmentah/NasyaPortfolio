'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#biodata', label: 'Biodata' },
  { href: '#prestasi', label: 'Prestasi' },
  { href: '#galeri', label: 'Galeri' },
]

export function getNavbarState(scrollY: number): 'scrolled' | 'transparent' {
  return scrollY > 20 ? 'scrolled' : 'transparent'
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function closeMobileMenu() {
    setIsOpen(false)
  }

  const linkClass = scrolled
    ? 'text-slate-600 hover:text-indigo-600'
    : 'text-white/90 hover:text-white'

  return (
    <header
      className={[
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-indigo-500/5 border-b border-slate-100'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          <a
            href="#hero"
            className={[
              'flex items-center gap-2 font-heading text-xl font-bold transition-colors',
              scrolled ? 'text-indigo-700 hover:text-indigo-600' : 'text-white hover:text-white/90',
            ].join(' ')}
            onClick={closeMobileMenu}
          >
            <span
              className={[
                'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                scrolled
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/20 text-white ring-1 ring-white/30',
              ].join(' ')}
            >
              N
            </span>
            Nasya
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                    linkClass,
                    !scrolled && 'hover:bg-white/10',
                    scrolled && 'hover:bg-indigo-50',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={[
              'md:hidden p-2.5 rounded-xl transition-colors',
              scrolled
                ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                : 'text-white hover:bg-white/10',
            ].join(' ')}
            aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden flex flex-col gap-1 pb-4"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={[
                      'block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                      scrolled
                        ? 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10',
                    ].join(' ')}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
