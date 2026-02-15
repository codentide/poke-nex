'use client'

import { getEffectivities } from '@/lib/utils'
import { Pokemon, PokeVariety } from '@/types'
import { TypeBadge } from './TypeBadge'
import { BentoItem } from './BentoItem'

interface Props {
  data: Pokemon
  currentVariety?: PokeVariety
}

export const DetailBento = ({ data, currentVariety }: Props) => {
  const typesToUse = currentVariety && currentVariety.types.length > 0 
    ? currentVariety.types 
    : data.types

  const { weaknesses, multipliers, resistances, immunities } = getEffectivities(
    typesToUse.map((type) => type.name)
  )

  const weight = currentVariety ? currentVariety.weight : data.weight
  const height = currentVariety ? currentVariety.height : data.height
  const abilities = currentVariety ? currentVariety.abilities : data.abilities

  return (
    <div className="w-full lg:w-fit grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-1.5 ">
      {/* ... (Weaknesses, Resistances, Immunities remain the same using typesToUse) */}
      {/* WEAKNESSES */}
      {weaknesses.length > 0 && (
        <BentoItem title="Weaknesses" full>
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 w-full">
            {weaknesses.map((type) => (
              <TypeBadge
                key={type}
                type={type}
                multiplier={multipliers[type]}
              />
            ))}
          </div>
        </BentoItem>
      )}
      {/* RESISTANCES */}
      {resistances.length > 0 && (
        <BentoItem title="Resistances" full>
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 w-full">
            {resistances.map((type) => (
              <TypeBadge
                key={type}
                type={type}
                multiplier={multipliers[type]}
              />
            ))}
          </div>
        </BentoItem>
      )}
      {/* IMMUNITIES */}
      {immunities.length > 0 && (
        <BentoItem title="Immunities" full>
          <div className="flex items-center gap-2 w-full xs:w-fit">
            {immunities.map((type) => (
              <TypeBadge
                key={type}
                type={type}
                multiplier={multipliers[type]}
              />
            ))}
          </div>
        </BentoItem>
      )}
      <BentoItem title="Weight" description={`${weight.toFixed(1)} KG`} />
      <BentoItem title="Height" description={`${height.toFixed(1)} M`} />
      <BentoItem title="Category" description={currentVariety ? currentVariety.genus : data.genus} />
      <BentoItem title={abilities.length > 1 ? 'Abilities' : 'Ability'}>
        {abilities.map((ability) => (
          <span
            key={ability.name}
            className={`${abilities.length > 1 ? 'text-sm' : 'text-2xl'} font-semibold uppercase leading-none`}
          >
            {ability.name} {ability.hidden && '(h)'}
          </span>
        ))}
      </BentoItem>
    </div>
  )
}
