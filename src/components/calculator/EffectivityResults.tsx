'use client'

import { PokeType } from '@/types'
import { TypeBadge } from '@/components/pokemon/TypeBadge'

interface Props {
  multipliers: Record<PokeType['name'], number>
}

export const EffectivityResults = ({ multipliers }: Props) => {
  const categories = [
    { label: 'Weaknesses (4x)', value: 4 },
    { label: 'Weaknesses (2x)', value: 2 },
    { label: 'Resistances (0.5x)', value: 0.5 },
    { label: 'Resistances (0.25x)', value: 0.25 },
    { label: 'Immunities (0x)', value: 0 },
  ]

  const hasAnyResult = Object.values(multipliers).some(m => m !== 1)

  if (!hasAnyResult) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-zinc-800 rounded-md bg-zinc-900/25">
        <span className="text-zinc-400 font-rajdhani text-sm uppercase tracking-[0.3em]">
            Select types to analyze
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {categories.map((cat, catIndex) => {
        const types = Object.entries(multipliers)
          .filter(([_, value]) => value === cat.value)
          .map(([name]) => name as PokeType['name'])

        if (types.length === 0) return null

        return (
          <div 
            key={cat.label} 
            className="space-y-3"
          >
            <h3 className="text-md lg:text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 font-rajdhani">
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
                {types.map((type, typeIndex) => (
                    <div 
                        key={type} 
                        className="w-full sm:w-fit transition-all duration-500 ease-out animate-in fade-in zoom-in-95"
                        style={{ 
                            animationDelay: `${(catIndex * 150) + (typeIndex * 50)}ms`,
                            animationFillMode: 'backwards' 
                        }}
                    >
                        <TypeBadge type={type} multiplier={cat.value} />
                    </div>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
