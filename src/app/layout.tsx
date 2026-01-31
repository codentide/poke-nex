import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { inter, rajdhani } from './fonts'
import { Header } from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'Pokénex',
  description: 'Pokédex next app',
  icons: {
    icon: { url: '/favicon.svg' },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rajdhani.variable} antialiased bg-black`}
      >
        {/* Textura */}
        <div className="fixed inset-0 z-[-1] opacity-[0.4] bg-pattern" />
        <Header />
        {/* <header className="flex items-center gap-1">
          <nav>
            <ul>
              <li>
                <Link href={'/'} className="bg-red-400 p-4">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </header> */}
        {children}
      </body>
    </html>
  )
}
