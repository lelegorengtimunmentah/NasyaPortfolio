import type { FooterData } from '@/lib/data'

export default function Footer({ footer }: { footer: FooterData }) {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-lg font-semibold">{footer.name}</p>
        <p className="text-sm text-gray-400">{footer.role} · {footer.institution}</p>
        <p className="text-sm text-gray-500 mt-4">
          &copy; {footer.copyrightYear} {footer.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
