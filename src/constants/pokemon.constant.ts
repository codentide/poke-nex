import { PokeStat, PokeType } from '@/types'

export const POKEMON_STATS: Record<string, PokeStat['name']> = {
  attack: 'ATK',
  defense: 'DEF',
  hp: 'HP',
  'special-attack': 'SPA',
  'special-defense': 'SPD',
  speed: 'SPE',
}

export const SORTS = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  ID_ASC: 'id-asc',
  ID_DESC: 'id-desc',
} as const

export const POKEMON_TYPES = {
  NORMAL: 'normal',
  FIGHTING: 'fighting',
  FLYING: 'flying',
  POISON: 'poison',
  GROUND: 'ground',
  ROCK: 'rock',
  BUG: 'bug',
  GHOST: 'ghost',
  STEEL: 'steel',
  FIRE: 'fire',
  WATER: 'water',
  GRASS: 'grass',
  ELECTRIC: 'electric',
  PSYCHIC: 'psychic',
  ICE: 'ice',
  DRAGON: 'dragon',
  // DARK: 'dark',
  FAIRY: 'fairy',
  // STELLAR: 'stellar',
  // UNKNOWN: 'unknown',
} as const

export const ALL_POKEMON_TYPES: PokeType['name'][] = [
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'fairy',
  'normal',
  // 'dark',
]
