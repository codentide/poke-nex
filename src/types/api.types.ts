export type ApiLanguage = {
  name: 'en' | 'es' | 'ja'
  url: string
}

export type ApiPokemonListResponse = {
  count: number
  results: { name: string; url: string }[]
}

// Estructura de Sprites
type ApiSprite = string | null
export type ApiPokemonSprites = {
  other: {
    'official-artwork': { front_default: ApiSprite; front_shiny: ApiSprite }
    home: { front_default: ApiSprite; front_shiny: ApiSprite }
  }
}

// Tipos para Stats, Types y Abilities
export type ApiPokemonType = { type: { name: string; url: string } }
export type GQLPokemonType = { type: { name: string } }

export type ApiPokemonStat = { base_stat: number; stat: { name: string } }
export type ApiPokemonAbility = {
  ability: { name: string }
  is_hidden: boolean
}

// Respuesta de Evolución
export type ApiEvolutionStep = {
  species: {
    name: string
    url: string
  }
  evolves_to: ApiEvolutionStep[]
}

export type ApiEvolutionChainResponse = {
  id: number
  chain: ApiEvolutionStep
}

// Respuesta de Species (Datos extendidos)
export type ApiSpeciesResponse = {
  genera: { genus: string; language: ApiLanguage }[]
  flavor_text_entries: { flavor_text: string; language: ApiLanguage }[]
  evolution_chain: { url: string }
  varieties: ApiVariety[]
}

// Variación de forma de pokémon
export interface ApiVariety {
  is_default: boolean
  pokemon: {
    name: string
    url: string
  }
  types?: ApiPokemonType[]
  stats?: ApiPokemonStat[]
  abilities?: ApiPokemonAbility[]
  weight?: number
  height?: number
}

// El Objeto Principal que llega de la API
export type ApiPokemonResponse = {
  id: number
  name: string
  height: number
  weight: number
  types: ApiPokemonType[]
  stats: ApiPokemonStat[]
  sprites: ApiPokemonSprites
  abilities: ApiPokemonAbility[]
  species: { url: string }
  // Estos son opcionales porque solo vienen en la petición extendida
  genera?: ApiSpeciesResponse['genera']
  flavor_text_entries?: ApiSpeciesResponse['flavor_text_entries']
  evolution_chain?: ApiSpeciesResponse['evolution_chain']
  varieties?: ApiVariety[]
}

export type GQLPokemonSummaryList = {
  data: {
    pokemon: {
      id: number
      name: string
      pokemontypes: GQLPokemonType[]
    }[]
  }
}
