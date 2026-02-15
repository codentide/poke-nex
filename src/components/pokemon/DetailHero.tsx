import { TypeTheme } from '@/constants'
import { Pokemon, PokeType, PokeVariety } from '@/types'
import { ArrowButton } from '../ui'
import { DetailCover } from './DetailCover'

interface Props {
  data: Pokemon
  selectedVariety: PokeVariety
  isShiny: boolean
  onSelectVariety: (variety: PokeVariety) => void
  onToggleShiny: (shiny: boolean) => void
  theme: TypeTheme
  currentTypes: PokeType[]
}

export const DetailHero = ({
  data,
  selectedVariety,
  isShiny,
  onSelectVariety,
  onToggleShiny,
  theme,
  currentTypes,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <small className="block font-rajdhani text-2xl text-center text-white/32">
        N° {data.id.toString().padStart(4, '0')}
      </small>
      <div className="relative flex items-center justify-center gap-4 md:gap-12 w-full">
        {data.id > 1 && (
          <ArrowButton
            className="absolute xs:static -left-3"
            direction="left"
            type="link"
            href={`/pokemon/${data.id - 1}`}
          />
        )}
        <DetailCover
          data={data}
          selectedVariety={selectedVariety}
          isShiny={isShiny}
          onSelectVariety={onSelectVariety}
          onToggleShiny={onToggleShiny}
          theme={theme}
          currentTypes={currentTypes}
        />
        {data.id < 1025 && (
          <ArrowButton
            className="absolute xs:static -right-3"
            direction="right"
            type="link"
            href={`/pokemon/${data.id + 1}`}
          />
        )}
      </div>
      <h1 className="sr-only">{data.name}</h1>
      <p className="w-full lg:w-[80%] font-inter text-center leading-relaxed text-white/50">
        {selectedVariety.description}
      </p>
    </div>
  )
}
