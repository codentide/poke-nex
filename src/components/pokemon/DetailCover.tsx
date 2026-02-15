'use client'

import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { Pokemon, PokeVariety } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SpriteImage } from '../ui'
import { TypeBadge } from './TypeBadge'
import { VarietyControls } from './VarietyControls'

interface Props {
  data: Pokemon
}

export const DetailCover = ({ data }: Props) => {
  const [shiny, setShiny] = useState<boolean>(false)
  const [selectedVariety, setSelectedVariety] = useState<PokeVariety>(
    data.varieties.find((variety) => variety.isDefault) || data.varieties[0]
  )
  const currentTypes = selectedVariety.types.length > 0 ? selectedVariety.types : data.types
  const pathname = usePathname()
  const type = getMostColorfulType(currentTypes)
  const theme = POKE_THEMES[type]

  const sprite = shiny
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
        onSelectVariety={setSelectedVariety}
        isShiny={shiny}
        onToggleShiny={setShiny}
        theme={theme}
      />

      <div className="mt-10 mb-8">
        {/* Pokemon Image */}
        <div
          className={`relative aspect-square w-50 xs:w-72 md:w-100 drop-shadow-2xl ${theme.glow} drop-shadow-[0_0_120px] mb-8`}
        >
          <SpriteImage
            key={sprite}
            src={sprite}
            alt={`${shiny ? 'Shiny ' : ''}${selectedVariety.name} image`}
            theme={theme}
            fill
            loading="eager"
            className="z-0"
            skeletonClassName="w-3/4 h-3/4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {shiny && (
            <small className="absolute -bottom-20 left-[50%] translate-x-[-50%] font-rajdhani text-sm lg:text-xl uppercase tracking-widest text-zinc-100/40">
              (Shiny Form)
            </small>
          )}
        </div>
      </div>

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
