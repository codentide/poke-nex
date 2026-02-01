type ApiPokemonCries = {
  latest: string
  legacy: string
}

export type ApiLanguage = {
  name: 'en' | 'es' | 'ja'
  url: string
}

// type ApiPokemonForm = {
//   name: string
//   url: string
// }

// type ApiGameIndex = {
//   game_index: number
//   version: {
//     name: string
//     url: string
//   }
// }

// type ShowdownSpriteKeys =
//   | 'back_default'
//   | 'back_female'
//   | 'back_shiny'
//   | 'back_shiny_female'
//   | 'front_default'
//   | 'front_female'
//   | 'front_shiny'
//   | 'front_shiny_female'

type ApiPokemonAbility = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

type HomeSpriteKeys =
  | 'front_default'
  | 'front_female'
  | 'front_shiny'
  | 'front_shiny_female'
type ApiSprite = string | null
type ApiPokemonSprites = {
  other: {
    'official-artwork': {
      front_default: ApiSprite
      front_shiny: ApiSprite
    }
    home: {
      [K in HomeSpriteKeys]: ApiSprite
    }
  }
}

type ApiPokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type ApiPokemonStat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

// POKEMON LIST

export type ApiPokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

// EVOLUTION CHAIN

type ApiEvolutionStep = {
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

// POKEMON SPECIES

export type ApiSpeciesResponse = {
  genera: {
    genus: string
    language: ApiLanguage
  }[]
  flavor_text_entries: {
    flavor_text: string
    language: ApiLanguage
    version: {
      name: string
      url: string
    }
  }[]
  evolution_chain: {
    url: string
  }
}

// GENERAL POKEMON FETCH

export type ApiPokemonResponse = {
  id: number
  name: string
  types: ApiPokemonType[]
  stats: ApiPokemonStat[]
  height: number
  weight: number
  sprites: ApiPokemonSprites
  abilities: ApiPokemonAbility[]
  genera: ApiSpeciesResponse['genera'] | null
  flavor_text_entries: ApiSpeciesResponse['flavor_text_entries'] | null
  evolution_chain: {
    url: string
  }
  species: {
    name: string
    url: string
  }

  // forms: ApiPokemonForm[]
  // base_experience: number
  // game_indices: ApiGameIndex[]
  // location_area_encounters: string
  // cries: ApiPokemonCries
}
