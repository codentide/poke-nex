'use client'

import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { Pokemon } from '@/types'
import Image from 'next/image' // ¡Aprovechemos el componente de Next!
import Link from 'next/link'
import { memo, useState } from 'react'
import { IoHeart } from 'react-icons/io5'
import { TypeBadge } from './TypeBadge'

interface Props {
  content: Pokemon
}

export const PokemonCard = memo(({ content }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const imageUrl = content.assets.home.default
  const formattedID = content.id.toString().padStart(3, '0')
  const primaryType = getMostColorfulType(content.types)
  const gradient = `bg-size-[200%_200%] bg-bottom-right to-50% bg-linear-to-tr ${POKE_THEMES[primaryType].gradient} to-zinc-900`

  return (
    <Link href={`/pokemon/${content.name}`}>
      <article
        className={`relative group flex flex-col justify-between gap-2 rounded-lg mt-16 ${gradient} border p-5 border-zinc-800 transition-all font-rajdhani`}
      >
        <div className="relative flex w-full h-22 items-center justify-center">
          <Image
            src={imageUrl}
            alt={content.name}
            width={200}
            height={200}
            className="absolute bottom-0 object-contain transition-transform group-hover:-translate-y-4 group-hover:scale-110 saturate-80 group-hover:saturate-125"
          />
        </div>
        <div className="text-left w-full ">
          <h3 className="text-2xl font-bold capitalize text-zinc-800 dark:text-zinc-100">
            {content.name}
          </h3>
          <span className="text-zinc-400">#{formattedID}</span>
          <div className="flex items-end justify-between">
            <div className="mt-2 flex gap-2">
              {content.types.map((type) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </div>
            <button
              className="z-20 grid place-items-end aspect-square w-8 cursor-pointer"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsFavorite((prev) => !prev)
                console.log(content.name, 'agregado a favoritos...')
              }}
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
