import type { Metadata } from 'next'
import './globals.css'
import { inter, rajdhani } from './fonts'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { StorageSyncListener } from '@/components/providers/StorageSyncListener'

export const metadata: Metadata = {
  title: 'Pokénex PRO',
  description:
    'Discover information and statistics about your favorite Pokémon.',
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
        <StorageSyncListener />
        <div className="fixed inset-0 z-[-1] opacity-[0.8] lg:opacity-[0.4] bg-pattern" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
