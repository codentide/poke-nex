import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { inter, rajdhani } from './fonts'

export const metadata: Metadata = {
  title: 'Pokénex',
  description: 'Pokédex next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rajdhani.variable} antialiased`}>
        <header className="flex items-center gap-1">
          <nav>
            <ul>
              <li>
                <Link href={'/'} className="bg-red-400 p-4">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  )
}
