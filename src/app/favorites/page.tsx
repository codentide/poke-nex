'use client'

import { useEffect, useState } from 'react'
import { PokeGallery } from '@/components/pokemon'
import { PokeGallerySkeleton } from '@/components/skeletons'
import { useFavoriteState } from '@/stores/favorite.store'
import { Pokemon } from '@/types'
import Link from 'next/link'

export default function FavoritesPage() {
  const favoriteList = useFavoriteState() as Pokemon[]
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <main className="flex flex-col gap-8 min-h-screen py-12 px-[4%] md:px-[12%] lg:px-[20%] ">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold uppercase font-rajdhani text-zinc-300 tracking-tighter">
          My Collection <span className="text-zinc-600">/ Archives</span>
        </h1>

        {hydrated ? (
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
                  className="text-lime-500 hover:text-lime-400 underline underline-offset-4"
                >
                  Explore PokéNex
                </Link>
              </span>
            )}
          </div>
        ) : (
          <div className="h-4.5 w-1/2 bg-white/5 rounded mb-2 mt-0.5" />
        )}
      </div>
      {hydrated ? (
        <>
          {favoriteList.length > 0 ? (
            <PokeGallery content={favoriteList} />
          ) : (
            <div className="flex flex-col items-center opacity-20 py-20 grayscale">
              {/* Aquí podrías poner un ícono de una Pokéball vacía o un MissingNo */}
              <p className="font-rajdhani text-xl uppercase tracking-widest">
                Database Empty
              </p>
            </div>
          )}
        </>
      ) : (
        <PokeGallerySkeleton />
      )}
    </main>
  )
}
