import { GraduationCap } from 'lucide-react'
import type { FooterData } from '@/lib/data'

export default function Footer({ footer }: { footer: FooterData }) {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/30 mb-5">
          <GraduationCap className="h-6 w-6 text-indigo-400" />
        </div>

        <p className="font-heading text-xl font-bold">{footer.name}</p>
        <p className="mt-2 text-sm text-slate-400">
          {footer.role} · {footer.institution}
        </p>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            &copy; {footer.copyrightYear} {footer.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
