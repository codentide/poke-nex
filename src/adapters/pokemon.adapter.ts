import { ApiPokemonResponse, Pokemon, PokeType } from '@/types'

export const adaptPokemon = ({
  id,
  name,
  height,
  weight,
  types,
  sprites,
}: ApiPokemonResponse): Pokemon => {
  const mappedTypes: PokeType[] = types.map((type) => ({
    name: type.type.name as PokeType['name'],
    url: type.type.url,
  }))

  const artwork = sprites.other['official-artwork']
  const home = sprites.other.home
  const dummyImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png'

  return {
    id,
    name,
    height: height / 10,
    weight: weight / 10,
    types: mappedTypes,
    assets: {
      official: {
        default: {
          front: artwork.front_default || dummyImage,
        },
        shiny: {
          front: artwork.front_shiny || dummyImage,
        },
      },
      home: {
        default: {
          front: home.front_default || dummyImage,
        },
        shiny: {
          front: home.front_shiny || dummyImage,
        },
      },
    },
  }
}
