'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()

  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="w-full flex h-16 items-center justify-between px-[4%] md:px-[12%] lg:px-[20%]">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="relative h-8 w-8">
            <Image fill src="/logo-white.svg" alt="PokeLogo" />
          </div>
          <span className="font-rajdhani text-2xl font-bold tracking-tighter leading-5 text-white">
            POKÉNEX<span className="text-lime-300">PRO</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {LINKS.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.path}
                className={`font-rajdhani font-medium transition-colors text-lg hover:text-white ${pathname === link.path ? 'text-white' : 'text-white/50'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
