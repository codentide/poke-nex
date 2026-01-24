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

  return (
    <Link href={`/pokemon/${content.name}`}>
      <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-xs font-mono text-zinc-400">#{formattedID}</span>

        <div className="relative my-4 flex h-32 items-center justify-center">
          <Image
            src={imageUrl}
            alt={content.name}
            width={128}
            height={128}
            className="object-contain transition-transform group-hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold capitalize text-zinc-800 dark:text-zinc-100">
            {content.name}
          </h3>

          <div className="mt-2 flex justify-center gap-2">
            {content.types.map((type) => (
              <span
                key={type.name}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
})

PokemonCard.displayName = 'PokemonCard'
