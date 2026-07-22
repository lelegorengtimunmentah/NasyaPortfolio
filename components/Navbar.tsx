'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#biodata', label: 'Biodata' },
  { href: '#riwayat-prestasi', label: 'Prestasi' },
  { href: '#pendidikan', label: 'Pendidikan' },
  { href: '#organisasi', label: 'Organisasi' },
  { href: '#galeri', label: 'Galeri' },
]

export function getNavbarState(scrollY: number): 'scrolled' | 'transparent' {
  return scrollY > 20 ? 'scrolled' : 'transparent'
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function toggleTheme() {
    const html = document.documentElement
    const next = !isDark
    html.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  function closeMobileMenu() {
    setIsOpen(false)
  }

  const scrolledBg = 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60 dark:border-white/10'
  const linkClass = scrolled
    ? 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
    : 'text-white/90 hover:text-white'

  return (
    <header
      className={[
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled ? scrolledBg : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <a
            href="#hero"
            className={[
              'flex items-center gap-2 font-heading text-xl font-bold transition-colors',
              scrolled
                ? 'text-indigo-700 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300'
                : 'text-white hover:text-white/90',
            ].join(' ')}
            onClick={closeMobileMenu}
          >
            <span
              className={[
                'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                scrolled
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                  : 'bg-white/20 text-white ring-1 ring-white/30',
              ].join(' ')}
            >
              N
            </span>
            Nasya
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    linkClass,
                    !scrolled && 'hover:bg-white/10',
                    scrolled && 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={[
                'p-2.5 rounded-xl transition-colors',
                scrolled
                  ? 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400'
                  : 'text-white hover:bg-white/10',
              ].join(' ')}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={[
                'lg:hidden p-2.5 rounded-xl transition-colors',
                scrolled
                  ? 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-900/30'
                  : 'text-white hover:bg-white/10',
              ].join(' ')}
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden flex flex-col gap-1 pb-4"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={[
                      'block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                      scrolled
                        ? 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-300 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30'
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
