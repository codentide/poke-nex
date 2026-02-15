'use client'

import { TypeTheme } from '@/constants'
import { PokeVariety } from '@/types'
import { PiStarFourFill } from 'react-icons/pi'
import { CustomSelect } from '../ui'

interface VarietyControlsProps {
  varieties: PokeVariety[]
  selectedVariety: PokeVariety
  onSelectVariety: (variety: PokeVariety) => void
  isShiny: boolean
  onToggleShiny: (shiny: boolean) => void
  theme: TypeTheme
}

/**
 * Component to control Pokémon variations and shiny state.
 *
 */
export const VarietyControls = ({
  varieties,
  selectedVariety,
  onSelectVariety,
  isShiny,
  onToggleShiny,
  theme,
}: VarietyControlsProps) => {
  const varietyOptions = varieties.map((variety) => ({
    label: variety.name,
    value: variety,
  }))

  return (
    <div className="isolate relative z-10 flex flex-col-reverse sm:flex-row items-center justify-center gap-3 w-full font-rajdhani">
      {/* Variety Selector */}
      {varieties.length > 1 && (
        <CustomSelect
          className="w-full sm:w-80"
          buttonClassName="!bg-zinc-800/50 !border-zinc-700/50"
          options={varietyOptions}
          value={selectedVariety}
          onSelect={onSelectVariety}
        />
      )}

      {/* Vertical Divider (Desktop) */}
      {varieties.length > 1 && (
        <div className="hidden sm:block w-px h-8 bg-zinc-800 mx-1" />
      )}

      {/* Shiny Toggle Switch */}
      <div className="flex items-center gap-1 w-full sm:w-auto h-10.5 p-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 ">
        <button
          onClick={() => onToggleShiny(false)}
          className={`flex-1 sm:flex-none px-4 py-1.5 rounded-sm text-sm font-bold cursor-pointer transition-all ${
            !isShiny
              ? 'bg-zinc-300 text-zinc-900'
              : 'text-zinc-500 hover:text-zinc-100'
          }`}
        >
          DEFAULT
        </button>
        <button
          onClick={() => onToggleShiny(true)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-sm text-sm font-bold cursor-pointer transition-all ${
            isShiny
              ? `${theme.bg} ${theme.text} shadow-lg`
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <PiStarFourFill
            className={isShiny ? 'text-current' : 'text-zinc-600'}
          />
          SHINY
        </button>
      </div>
    </div>
  )
}
