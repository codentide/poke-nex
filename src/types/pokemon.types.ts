import { POKEMON_TYPES, SORTS } from '@/constants/pokemon.constant'

export type PokeType = {
  name: (typeof POKEMON_TYPES)[keyof typeof POKEMON_TYPES]
  url: string
}

export interface PokeRegion {
  name: RegionName
  start: number
  end: number
}

export type RegionName =
  | 'kanto'
  | 'johto'
  | 'hoenn'
  | 'sinnoh'
  | 'unova'
  | 'kalos'
  | 'alola'
  | 'galar'
  | 'paldea'
  | 'all'

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

export interface PokeVariety {
  name: string
  isDefault: boolean
  pokemonId: number
  types: PokeType[]
  stats: PokeStat[]
  abilities: { name: string; hidden: boolean }[]
  weight: number
  height: number
  genus: string
  description: string
}

// Interfaz final del Pokémon en nuestra App
export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  genus: string
  description: string
  types: PokeType[]
  stats: PokeStat[]
  abilities: { name: string; hidden: boolean }[]
  varieties: PokeVariety[]
  assets: {
    official: { default: string; shiny: string }
    home: { default: string; shiny: string }
  }
  evolution: {
    id: number
    chain: Evolution[]
  } | null
}

export interface PokemonSummary {
  id: number
  name: string
  types: PokeType['name'][]
  image: string
}
