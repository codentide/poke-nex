type PokemonType = {
  name: string
}

type SpriteGroup = {
  front: string
}

export interface Pokemon {
  id: number
  name: string
  height: number // "Stored in meters"
  weight: number // "Stored in kilograms"
  types: PokemonType[]
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
