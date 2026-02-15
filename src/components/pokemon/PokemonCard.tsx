'use client'

import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { useFavoriteActions, useIsFavorite } from '@/stores/favorite.store'
import { Pokemon } from '@/types'
import { TypeBadge } from './TypeBadge'

import Link from 'next/link'
import { memo } from 'react'
import { IoHeart } from 'react-icons/io5'
import { SpriteImage } from '../ui/SpriteImage'

interface Props {
  content: Pokemon
}

export const PokemonCard = memo(({ content }: Props) => {
  const toggleFavorite = useFavoriteActions().toggleFavorite
  const isFavorite = useIsFavorite(content.id)

  const imageUrl = content.assets.home.default
  const id = content.id.toString().padStart(3, '0')
  const type = getMostColorfulType(content.types)
  const theme = POKE_THEMES[type]
  const gradient = `bg-size-[200%_200%] bg-bottom-right to-50% bg-linear-to-tr ${theme.gradient} to-zinc-900`

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(content)
  }

  return (
    <Link href={`/pokemon/${content.name}`}>
      <article
        className={`relative group flex flex-col justify-between gap-2 rounded-lg mt-16 ${gradient} border p-5 border-zinc-800 transition-all font-rajdhani`}
      >
        <div className="relative flex w-full h-22 items-center justify-center">
          {/* [ ]: Animar con framer */}
          <SpriteImage
            className="absolute bottom-0 object-contain group-hover:-translate-y-4 group-hover:scale-110 saturate-80 group-hover:saturate-125"
            src={imageUrl}
            alt={content.name}
            width={200}
            height={200}
            theme={theme}
          />
        </div>

        <div className="text-left w-full ">
          <h3 className="text-2xl font-bold capitalize dark:text-zinc-100">
            {content.name}
          </h3>
          <span className="text-zinc-100/50">#{id}</span>
          <div className="flex items-end justify-between">
            <div className="mt-2 flex gap-2">
              {content.types.map((type) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </div>
            <button
              className="z-20 grid place-items-end aspect-square w-8 cursor-pointer"
              onClick={handleClick}
            >
              <IoHeart
                className={`text-[24px] ${!isFavorite ? 'text-zinc-700' : 'text-rose-500 drop-shadow-[0_0_8px] drop-shadow-rose-600/50'} hover:scale-125 hover:brightness-125 transition-all duration-200 `}
              />
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
})

PokemonCard.displayName = 'PokemonCard'
