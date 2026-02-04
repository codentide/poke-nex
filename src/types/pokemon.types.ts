import { POKEMON_TYPES, SORTS } from '@/constants/pokemon.constant'

export type PokeStat = {
  name: 'HP' | 'ATK' | 'DEF' | 'SPA' | 'SPD' | 'SPE'
  value: number
}
export type PokeSort = (typeof SORTS)[keyof typeof SORTS]
export type PokeType = {
  name: (typeof POKEMON_TYPES)[keyof typeof POKEMON_TYPES]
  url: string
}

type SpriteGroup = {
  front: string
}

type Assets = {
  official: {
    default: SpriteGroup
    shiny: SpriteGroup
  }
  home: {
    default: SpriteGroup
    shiny: SpriteGroup
  }
}

export type Evolution = {
  id: number
  name: string
  sprite: string
}

export interface Pokemon {
  id: number
  name: string
  height: number // "Stored in meters"
  weight: number // "Stored in kilograms"
  types: PokeType[]
  genus: string
  abilities: { name: string; hidden: boolean }[]
  description: string
  assets: Assets
  stats: PokeStat[]
  evolution: {
    id: number
    chain: Evolution[]
  } | null
}
