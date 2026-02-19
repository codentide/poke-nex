'use client'

import { TypeTheme } from '@/constants'
import { PokemonDetail, PokeType, PokeVariety } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { SpriteImage } from '../ui'
import { TypeBadge } from './TypeBadge'
import { VarietyControls } from './VarietyControls'

interface Props {
  data: PokemonDetail
  selectedVariety: PokeVariety
  isShiny: boolean
  onSelectVariety: (variety: PokeVariety) => void
  onToggleShiny: (shiny: boolean) => void
  theme: TypeTheme
  currentTypes: PokeType[]
}

export const DetailCover = ({
  data,
  selectedVariety,
  isShiny,
  onSelectVariety,
  onToggleShiny,
  theme,
  currentTypes,
}: Props) => {
  const pathname = usePathname()

  const sprite = isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedVariety.pokemonId}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedVariety.pokemonId}.png`

  useEffect(() => {
    const slug = pathname.split('/').pop()
    if (slug && !isNaN(Number(slug))) {
      window.history.replaceState(null, '', `/pokemon/${data.name}`)
    }
  }, [data.name, pathname])

  return (
    <div className="flex flex-col items-center w-full">
      <VarietyControls
        varieties={data.varieties}
        selectedVariety={selectedVariety}
        onSelectVariety={onSelectVariety}
        isShiny={isShiny}
        onToggleShiny={onToggleShiny}
        theme={theme}
      />

      <div className="mt-10 mb-8">
        {/* PokemonDetail Image */}
        <div
          className={`relative aspect-square w-68 xs:w-72 md:w-100 drop-shadow-2xl ${theme.glow} drop-shadow-[0_0_120px] mb-8`}
        >
          <SpriteImage
            key={sprite}
            src={sprite}
            alt={`${isShiny ? 'Shiny ' : ''}${selectedVariety.name} image`}
            theme={theme}
            fill
            loading="eager"
            className="z-0"
            skeletonClassName="w-3/4 h-3/4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {isShiny && (
            <small className="absolute -bottom-20 left-[50%] translate-x-[-50%] font-rajdhani text-sm lg:text-xl uppercase tracking-widest text-zinc-100/40">
              (Shiny Form)
            </small>
          )}
        </div>
      </div>

      {/* TODO: Poodemos sacar esto fuera para evitar acoplamiento */}
      {/* Dynamic Title */}
      <h1 className="w-full mt-4 text-4xl sm:text-6xl lg:text-8xl font-rajdhani font-semibold uppercase text-center animate-[fade-in_0.5s_ease-out]">
        {selectedVariety.name}
      </h1>

      {/* Dynamic Types */}
      <div className="flex gap-2 w-fit mt-4">
        {currentTypes.map((type) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </div>
    </div>
  )
}
