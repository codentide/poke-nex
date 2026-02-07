import type { Metadata } from 'next'
import './globals.css'
import { inter, rajdhani } from './fonts'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

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
        <div className="fixed inset-0 z-[-1] opacity-[0.8] lg:opacity-[0.4] bg-pattern" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
