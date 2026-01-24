import { POKEMON_TYPES, SORTS } from '@/constants/pokemon.constant'

export type PokeSort = (typeof SORTS)[keyof typeof SORTS]
export type PokeType = {
  name: (typeof POKEMON_TYPES)[keyof typeof POKEMON_TYPES]
  url: string
}

type SpriteGroup = {
  front: string
}

export interface Pokemon {
  id: number
  name: string
  height: number // "Stored in meters"
  weight: number // "Stored in kilograms"
  types: PokeType[]
  assets: {
    official: {
      default: SpriteGroup
      shiny: SpriteGroup
    }
    home: {
      default: SpriteGroup
      shiny: SpriteGroup
    }
  }
}
