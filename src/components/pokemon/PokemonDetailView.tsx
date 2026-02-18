'use client'

import { PokemonDetail, PokeVariety } from '@/types'
import { useState } from 'react'
import { DetailHero } from './DetailHero'
import { DetailBento } from './DetailBento'
import { DetailStats } from './DetailStats'
import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils'

interface Props {
  data: PokemonDetail
}

export const PokemonDetailView = ({ data }: Props) => {
  const [isShiny, setIsShiny] = useState<boolean>(false)
  const [selectedVariety, setSelectedVariety] = useState<PokeVariety>(
    data.varieties.find((variety) => variety.isDefault) || data.varieties[0]
  )

  const currentTypes =
    selectedVariety.types.length > 0 ? selectedVariety.types : data.types
  const type = getMostColorfulType(currentTypes.map((t) => t.name))
  const theme = POKE_THEMES[type]

  return (
    <>
      <DetailHero
        data={data}
        selectedVariety={selectedVariety}
        isShiny={isShiny}
        onSelectVariety={setSelectedVariety}
        onToggleShiny={setIsShiny}
        theme={theme}
        currentTypes={currentTypes}
      />

      <DetailBento data={data} currentVariety={selectedVariety} />
      <DetailStats hue={theme?.hue} stats={selectedVariety.stats} />
    </>
  )
}
