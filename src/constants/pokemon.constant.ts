import { PokeType } from '@/types'

export const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-black',
  poison: 'bg-purple-500 text-white',
  flying: 'bg-indigo-300 text-black',
  bug: 'bg-lime-500 text-white',
  normal: 'bg-gray-400 text-white',
  fairy: 'bg-pink-300 text-pink-900',
  steel: 'bg-slate-400 text-slate-900',
  default: 'bg-slate-200 text-slate-700',
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
