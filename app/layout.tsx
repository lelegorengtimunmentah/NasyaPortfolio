import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
