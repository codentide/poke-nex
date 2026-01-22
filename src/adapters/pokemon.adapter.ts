import { ApiPokemonResponse, Pokemon } from '@/types'

export const adaptPokemon = ({ id, name, height, weight, types }: ApiPokemonResponse): Pokemon => {
  const mappedTypes = types.map((type) => ({ name: type.type.name }))

  return {
    id,
    name,
    height,
    weight,
    types: mappedTypes,
  }
}
