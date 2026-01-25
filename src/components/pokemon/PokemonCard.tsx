import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { Pokemon } from '@/types'
import Image from 'next/image' // ¡Aprovechemos el componente de Next!
import Link from 'next/link'
import { memo } from 'react'

interface Props {
  content: Pokemon
}

export const PokemonCard = memo(({ content }: Props) => {
  const imageUrl = content.assets.home.default.front
  const formattedID = content.id.toString().padStart(3, '0')
  const primaryType = getMostColorfulType(content.types)
  const gradient = `bg-size-[200%_200%] bg-bottom-right to-50% bg-linear-to-tr ${POKE_THEMES[primaryType].gradient} to-zinc-900`

  return (
    <Link href={`/pokemon/${content.name}`}>
      <article
        className={`group flex flex-col gap-2 rounded-lg mt-16  ${gradient} border p-5 border-zinc-800 transition-all font-rajdhani`}
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

        <div className="text-center">
          <h3 className="text-2xl font-bold capitalize text-zinc-800 dark:text-zinc-100">
            {content.name}
          </h3>
          <span className="  text-zinc-400">#{formattedID}</span>

          <div className="mt-2 flex justify-center gap-2">
            {content.types.map((type) => {
              const theme = POKE_THEMES[type.name]

              return (
                <span
                  key={type.name}
                  className={`rounded-sm px-3 py-0.5 text-sm font-bold uppercase ${theme.bg} ${theme.text}`}
                >
                  {type.name}
                </span>
              )
            })}
          </div>
        </div>
      </article>
    </Link>
  )
})

PokemonCard.displayName = 'PokemonCard'
