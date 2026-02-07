import { getEffectivities } from '@/lib/utils'
import { Pokemon } from '@/types'
import { TypeBadge } from './TypeBadge'
import { BentoItem } from './BentoItem'

interface Props {
  data: Pokemon
}

export const DetailBento = ({ data }: Props) => {
  const { weaknesses, multipliers, resistances, immunities } = getEffectivities(
    data.types.map((type) => type.name)
  )

  return (
    <div className="w-full lg:w-fit grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-1.5 ">
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
      <BentoItem title="Weight" description={`${data.weight} KG`} />
      <BentoItem title="Height" description={`${data.height} M`} />
      <BentoItem title="Category" description={data.genus} />
      <BentoItem title={data.abilities.length > 1 ? 'Abilities' : 'Ability'}>
        {data.abilities.map((ability) => (
          <span
            key={ability.name}
            className={`${data.abilities.length > 1 ? 'text-sm' : 'text-2xl'} font-semibold uppercase leading-none`}
          >
            {ability.name} {ability.hidden && '(h)'}
          </span>
        ))}
      </BentoItem>
    </div>
  )
}
