'use client'

import { PokeGallery } from '@/components/pokemon'
import { useFavoriteState } from '@/stores/favorite.store'
import { Pokemon } from '@/types'
import Link from 'next/link'

export default function FavoritesPage() {
  const favoriteList = useFavoriteState() as Pokemon[]

  return (
    <main className="flex flex-col gap-8 min-h-screen py-12 px-[4%] md:px-[12%] lg:px-[20%] ">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold uppercase font-rajdhani text-zinc-300 tracking-tighter">
          My Collection <span className="text-zinc-600">/ Archives</span>
        </h1>
        <div className="text-zinc-500 text-md font-medium">
          {favoriteList.length > 0 ? (
            <>
              You currently have
              <span className="text-lg text-lime-300 font-rajdhani font-bold">
                {' '}
                {favoriteList.length}{' '}
              </span>
              specimens synchronized in your local database.
            </>
          ) : (
            <span className="flex items-center justify-center gap-1.5 flex-wrap">
              No records detected in your session.
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-lime-500 hover:text-lime-400 transition-colors duration-300 group"
              >
                <span>Explore PokéNex</span>
              </Link>
            </span>
          )}
        </div>
      </div>
      <PokeGallery content={favoriteList} />
    </main>
  )
}
