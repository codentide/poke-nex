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
  DARK: 'dark',
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

// Fortalezas y debilidades

export const TYPE_CHART: Record<
  string,
  {
    strengths: PokeType['name'][]
    weaknesses: PokeType['name'][]
    immunes: PokeType['name'][]
  }
> = {
  normal: { strengths: [], weaknesses: ['fighting'], immunes: ['ghost'] },
  fire: {
    strengths: ['grass', 'ice', 'bug', 'steel'],
    weaknesses: ['water', 'ground', 'rock'],
    immunes: [],
  },
  water: {
    strengths: ['fire', 'ground', 'rock'],
    weaknesses: ['electric', 'grass'],
    immunes: [],
  },
  grass: {
    strengths: ['water', 'ground', 'rock'],
    weaknesses: ['fire', 'ice', 'poison', 'flying', 'bug'],
    immunes: [],
  },
  electric: {
    strengths: ['water', 'flying'],
    weaknesses: ['ground'],
    immunes: [],
  },
  ice: {
    strengths: ['grass', 'ground', 'flying', 'dragon'],
    weaknesses: ['fire', 'fighting', 'rock', 'steel'],
    immunes: [],
  },
  fighting: {
    strengths: ['normal', 'ice', 'rock', 'dark', 'steel'],
    weaknesses: ['flying', 'psychic', 'fairy'],
    immunes: [],
  },
  poison: {
    strengths: ['grass', 'fairy'],
    weaknesses: ['ground', 'psychic'],
    immunes: [],
  },
  ground: {
    strengths: ['fire', 'electric', 'poison', 'rock', 'steel'],
    weaknesses: ['water', 'grass', 'ice'],
    immunes: ['electric'],
  },
  flying: {
    strengths: ['grass', 'fighting', 'bug'],
    weaknesses: ['electric', 'ice', 'rock'],
    immunes: ['ground'],
  },
  psychic: {
    strengths: ['fighting', 'poison'],
    weaknesses: ['bug', 'ghost', 'dark'],
    immunes: [],
  },
  bug: {
    strengths: ['grass', 'psychic', 'dark'],
    weaknesses: ['fire', 'flying', 'rock'],
    immunes: [],
  },
  rock: {
    strengths: ['fire', 'ice', 'flying', 'bug'],
    weaknesses: ['water', 'grass', 'fighting', 'ground', 'steel'],
    immunes: [],
  },
  ghost: {
    strengths: ['psychic', 'ghost'],
    weaknesses: ['ghost', 'dark'],
    immunes: ['normal', 'fighting'],
  },
  dragon: {
    strengths: ['dragon'],
    weaknesses: ['ice', 'dragon', 'fairy'],
    immunes: [],
  },
  dark: {
    strengths: ['psychic', 'ghost'],
    weaknesses: ['fighting', 'bug', 'fairy'],
    immunes: ['psychic'],
  },
  steel: {
    strengths: ['ice', 'rock', 'fairy'],
    weaknesses: ['fire', 'fighting', 'ground'],
    immunes: ['poison'],
  },
  fairy: {
    strengths: ['fighting', 'dragon', 'dark'],
    weaknesses: ['poison', 'steel'],
    immunes: ['dragon'],
  },
}

export const TYPE_DEFENSE_CHART: Record<string, Record<string, number>> = {
  normal: { fighting: 2, ghost: 0 },
  fire: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    ice: 0.5,
    bug: 0.5,
    steel: 0.5,
    fairy: 0.5,
  },
  water: { electric: 2, grass: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
  grass: {
    fire: 2,
    ice: 2,
    poison: 2,
    flying: 2,
    bug: 2,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
    ground: 0.5,
  },
  electric: { ground: 2, electric: 0.5, flying: 0.5, steel: 0.5 },
  ice: { fire: 2, fighting: 2, rock: 2, steel: 2, ice: 0.5 },
  fighting: { flying: 2, psychic: 2, fairy: 2, rock: 0.5, bug: 0.5, dark: 0.5 },
  poison: {
    ground: 2,
    psychic: 2,
    fighting: 0.5,
    poison: 0.5,
    bug: 0.5,
    grass: 0.5,
    fairy: 0.5,
  },
  ground: { water: 2, grass: 2, ice: 2, electric: 0, poison: 0.5, rock: 0.5 },
  flying: {
    electric: 2,
    ice: 2,
    rock: 2,
    ground: 0,
    fighting: 0.5,
    bug: 0.5,
    grass: 0.5,
  },
  psychic: { bug: 2, ghost: 2, dark: 2, fighting: 0.5, psychic: 0.5 },
  bug: { fire: 2, flying: 2, rock: 2, fighting: 0.5, ground: 0.5, grass: 0.5 },
  rock: {
    water: 2,
    grass: 2,
    fighting: 2,
    ground: 2,
    steel: 2,
    normal: 0.5,
    fire: 0.5,
    poison: 0.5,
    flying: 0.5,
  },
  ghost: { ghost: 2, dark: 2, normal: 0, fighting: 0 },
  dragon: {
    ice: 2,
    dragon: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
  },
  dark: { fighting: 2, bug: 2, fairy: 2, ghost: 0.5, dark: 0.5, psychic: 0 },
  steel: {
    fire: 2,
    fighting: 2,
    ground: 2,
    normal: 0.5,
    grass: 0.5,
    ice: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 0.5,
    dragon: 0.5,
    steel: 0.5,
    fairy: 0.5,
    poison: 0,
  },
  fairy: { poison: 2, steel: 2, fighting: 0.5, bug: 0.5, dark: 0.5, dragon: 0 },
}
