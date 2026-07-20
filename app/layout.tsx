import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'Muhammad Choirun Nasya | Portfolio',
  description:
    'Portfolio resmi Muhammad Choirun Nasya, Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang.',
  openGraph: {
    title: 'Muhammad Choirun Nasya | Portfolio',
    description:
      'Portfolio resmi Muhammad Choirun Nasya, Mahasiswa Fakultas Psikologi UIN Maulana Malik Ibrahim Malang.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
