'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'

export const Header = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'Calculator', path: '/calculator' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/12.5 bg-black/50 backdrop-blur-md">
      <div className="w-full flex h-16 items-center justify-between px-[4%] md:px-[12%] lg:px-[20%]">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative h-8 w-8">
            <Image fill src="/logo-white.svg" alt="PokeLogo" />
          </div>
          <span className="font-rajdhani text-2xl font-bold tracking-tighter leading-5 text-white">
            POKÉNEX<span className="text-lime-300">PRO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => {
            return (
              <Link
                key={link.label}
                href={link.path}
                className={`font-rajdhani font-medium transition-colors text-lg hover:text-white ${pathname === link.path ? 'text-lime-300' : 'text-white/50'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden text-white text-3xl focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
            >
              <IoMenu />
            </div>
            <div
              className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
            >
              <IoClose />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64' : 'max-h-0 border-b-0'}`}
      >
        <nav className="py-6 px-[4%] flex flex-col gap-5 items-center border-t border-white/12.5 ">
          {LINKS.map((link, index) => {
            return (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`font-rajdhani font-medium transition-all duration-300 text-xl hover:text-white ${pathname === link.path ? 'text-white translate-x-0 opacity-100' : 'text-white/50 translate-x-0 opacity-100'} ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
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
