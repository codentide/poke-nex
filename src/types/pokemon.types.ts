import { POKEMON_TYPES, SORTS } from '@/constants/pokemon.constant'

export type PokeType = {
  name: (typeof POKEMON_TYPES)[keyof typeof POKEMON_TYPES]
  url: string
}

export type PokeSort = (typeof SORTS)[keyof typeof SORTS]

export type PokeStat = {
  name: 'HP' | 'ATK' | 'DEF' | 'SPA' | 'SPD' | 'SPE'
  value: number
}

export interface Evolution {
  id: number
  name: string
  sprite: string
}

export type PokemonList = {
  name: string
  url: string
}[]

// Interfaz final del Pokémon en nuestra App
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  genus: string
  description: string
  types: PokeType[]
  stats: PokeStat[]
  abilities: { name: string; hidden: boolean }[]
  assets: {
    official: { default: string; shiny: string }
    home: { default: string; shiny: string }
  }
  evolution: {
    id: number
    chain: Evolution[]
  } | null
}
