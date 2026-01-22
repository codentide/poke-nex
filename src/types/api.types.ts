export type ApiPokemonResponse = {
  id: number
  name: string
  types: ApiPokemonType[]
  stats: ApiPokemonStat[]
  height: number
  weight: number
  sprites: ApiPokemonSprites

  // abilities: ApiPokemonAbility[]
  // forms: ApiPokemonForm[]
  // base_experience: number
  // game_indices: ApiGameIndex[]
  // location_area_encounters: string
  // cries: ApiPokemonCries
}

type ApiPokemonCries = {
  latest: string
  legacy: string
}

type ApiPokemonSprites = {
  other: {
    'official-artwork'?: {
      front_default: ApiSprite
      front_shiny: ApiSprite
    }
    showdown: {
      [K in ShowdownSpriteKeys]: ApiSprite
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

type ApiPokemonAbility = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

type ApiPokemonForm = {
  name: string
  url: string
}

type ApiGameIndex = {
  game_index: number
  version: {
    name: string
    url: string
  }
}

type ShowdownSpriteKeys =
  | 'back_default'
  | 'back_female'
  | 'back_shiny'
  | 'back_shiny_female'
  | 'front_default'
  | 'front_female'
  | 'front_shiny'
  | 'front_shiny_female'

type ApiSprite = string | null
