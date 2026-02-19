'use client'

import { ALL_POKEMON_TYPES, POKE_THEMES } from '@/constants'
import { PokeType } from '@/types'

interface Props {
  selectedTypes: PokeType['name'][]
  onToggle: (type: PokeType['name']) => void
}

export const TypeSelector = ({ selectedTypes, onToggle }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {ALL_POKEMON_TYPES.map((type) => {
        const isSelected = selectedTypes.includes(type)
        const theme = POKE_THEMES[type] || POKE_THEMES.default

        return (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className={`
              flex items-center justify-center px-12 py-1.5 rounded-sm transition-all duration-200 font-rajdhani cursor-pointer
              ${
                isSelected
                  ? `${theme.bg} ${theme.text}`
                  : `bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50`
              }
            `}
          >
            <span className="text-lg md:text-sm font-bold uppercase leading-none">
              {type}
            </span>
          </button>
        )
      })}
    </div>
  )
}
