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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Pokénex PRO',
    description:
      'Discover information and statistics about your favorite Pokémon.',
    url: 'https://poke-nex.vercel.app',
    siteName: 'Pokénex PRO | Discover',
    images: [
      {
        url: 'https://poke-nex.vercel.app/pokenex-pro_preview.png',
        width: 1339,
        height: 925,
        alt: 'Pokénex PRO Interface Preview',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="SQiPI30YGvqJkXYHJwmRf0M2OlqtGUit0bpJqzh-99I"
        />
        <meta
          property="og:image"
          content="https://poke-nex.vercel.app/pokenex-pro_preview.png"
        />
        <meta
          property="twitter:image"
          content="https://poke-nex.vercel.app/pokenex-pro_preview.png"
        />
      </head>
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
