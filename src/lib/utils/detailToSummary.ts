import { PokemonDetail, PokemonSummary } from '@/types'

export const detailToSummary = (detail: PokemonDetail): PokemonSummary => {
  const { id, name, types, assets } = detail
  return {
    id,
    name,
    types: types.map((t) => t.name),
    image: assets.home.default,
  }
}
