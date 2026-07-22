'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  badge: string
  title: string
  description?: string
  light?: boolean
}

export default function SectionHeader({
  badge,
  title,
  description,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-14 text-center"
    >
      <span
        className={[
          'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest',
          light
            ? 'bg-white/15 text-white/90 ring-1 ring-white/25'
            : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-indigo-800/50',
        ].join(' ')}
      >
        {badge}
      </span>
      <h2
        className={[
          'mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl',
          light ? 'text-white' : 'text-slate-900 dark:text-slate-50',
        ].join(' ')}
      >
        {title}
      </h2>
      <div
        className={[
          'mx-auto mt-4 h-1 w-16 rounded-full',
          light
            ? 'bg-gradient-to-r from-white/40 via-white to-white/40'
            : 'bg-gradient-to-r from-indigo-400 via-violet-500 to-teal-400',
        ].join(' ')}
      />
      {description && (
        <p
          className={[
            'mx-auto mt-4 max-w-2xl text-base leading-relaxed',
            light ? 'text-white/80' : 'text-slate-500 dark:text-slate-400',
          ].join(' ')}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
