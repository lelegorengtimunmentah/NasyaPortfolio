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
    'Portfolio resmi Muhammad Choirun Nasya, siswa berprestasi SMA Nuris Jember dengan berbagai pencapaian olimpiade sains nasional.',
  openGraph: {
    title: 'Muhammad Choirun Nasya | Portfolio',
    description:
      'Portfolio resmi Muhammad Choirun Nasya, siswa berprestasi SMA Nuris Jember dengan berbagai pencapaian olimpiade sains nasional.',
    type: 'website',
  },
}

// Inline script that runs before first paint to avoid dark-mode flash
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e){}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-component */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
