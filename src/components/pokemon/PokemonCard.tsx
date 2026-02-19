'use client'

import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { PokemonSummary } from '@/types'
import { TypeBadge } from './TypeBadge'
import { memo, useMemo } from 'react'
import { SpriteImage } from '../ui/SpriteImage'
import { FavoriteCardButton } from './FavoriteCardButton'
import Link from 'next/link'

interface Props {
  content: PokemonSummary
}

export const PokemonCard = memo(({ content }: Props) => {
  const { id, name, types, image } = content

  const { theme, formattedId, gradient } = useMemo(() => {
    const type = getMostColorfulType(types)
    const theme = POKE_THEMES[type]
    const formattedId = id.toString().padStart(3, '0')
    const gradient = `bg-size-[200%_200%] bg-bottom-right to-50% bg-linear-to-tr ${theme.gradient} to-zinc-900`

    return {
      formattedId,
      theme,
      gradient,
    }
  }, [id, types])

  return (
    <Link href={`/pokemon/${name}`}>
      <article
        className={`relative group flex flex-col justify-between gap-2 rounded-lg ${gradient} border p-5 border-zinc-800 transition-all font-rajdhani`}
      >
        <div className="relative flex w-full h-22 items-center justify-center">
          <SpriteImage
            className="absolute bottom-0 object-contain group-hover:-translate-y-4 group-hover:scale-110 saturate-80 group-hover:saturate-125"
            src={image}
            alt={name}
            width={200}
            height={200}
            theme={theme}
          />
        </div>

        <div className="text-left w-full ">
          <h3 className="text-2xl font-bold capitalize dark:text-zinc-100">
            {name}
          </h3>

          <span className="text-zinc-100/50">#{formattedId}</span>

          <div className="flex items-end justify-between">
            <div className="mt-2 flex gap-2">
              {types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>

            <FavoriteCardButton pokemon={content} />
          </div>
        </div>
      </article>
    </Link>
  )
})

PokemonCard.displayName = 'PokemonCard'
