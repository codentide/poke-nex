import { GQLPokemonSummaryList, PokemonSummary } from '@/types'

export const adaptPokemonSummary = ({
  id,
  name,
  pokemontypes,
}: GQLPokemonSummaryList['data']['pokemon'][number]): PokemonSummary => {
  const types = pokemontypes.map(
    (t) => t.type.name as PokemonSummary['types'][number]
  )

  return {
    id,
    name,
    types,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id || 132}.png`,
  }
}
