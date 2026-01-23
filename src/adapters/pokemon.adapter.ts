import { ApiPokemonResponse, Pokemon } from '@/types'

export const adaptPokemon = ({ id, name, height, weight, types, sprites }: ApiPokemonResponse): Pokemon => {
  const mappedTypes = types.map((type) => ({ name: type.type.name }))

  const artwork = sprites.other['official-artwork']
  const home = sprites.other.home
  const dummyImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png'

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
          front: artwork.front_default || dummyImage,
        },
      },
      home: {
        default: {
          front: home.front_default || dummyImage,
        },
        shiny: {
          front: home.front_default || dummyImage,
        },
      },
    },
  }
}
