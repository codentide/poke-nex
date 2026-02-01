import { POKEMON_STATS } from '@/constants'
import {
  ApiLanguage,
  ApiPokemonResponse,
  Pokemon,
  PokeStat,
  PokeType,
} from '@/types'

export const adaptPokemon = ({
  id,
  name,
  height,
  weight,
  types,
  sprites,
  abilities: apiAbilities,
  flavor_text_entries,
  stats: apiStats,
  genera,
}: ApiPokemonResponse): Pokemon => {
  const mappedTypes: PokeType[] = types.map((type) => ({
    name: type.type.name as PokeType['name'],
    url: type.type.url,
  }))

  const artwork = sprites.other['official-artwork']
  const home = sprites.other.home
  const dummyImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png'
  const genus = distillGenus(genera)
  const abilities = mapAbilities(apiAbilities)
  const description = distillDescription(flavor_text_entries)
  const stats = mapStats(apiStats)
  return {
    id,
    name,
    genus,
    types: mappedTypes,
    abilities,
    description,
    height: height / 10,
    weight: weight / 10,
    stats,
    assets: {
      official: {
        default: {
          front: artwork.front_default || dummyImage,
        },
        shiny: {
          front: artwork.front_shiny || dummyImage,
        },
      },
      home: {
        default: {
          front: home.front_default || dummyImage,
        },
        shiny: {
          front: home.front_shiny || dummyImage,
        },
      },
    },
  }
}

const distillGenus = (
  genera: ApiPokemonResponse['genera'],
  lang: ApiLanguage['name'] = 'en'
) => {
  return (
    genera
      ?.find((item) => item.language.name === lang)
      ?.genus.replace('Pokémon', '') || 'Unknown'
  )
}

const mapAbilities = (abilities: ApiPokemonResponse['abilities']) => {
  return abilities.map(({ ability, is_hidden }) => ({
    name: ability.name,
    hidden: is_hidden,
  }))
}

const mapStats = (apiStats: ApiPokemonResponse['stats']): PokeStat[] => {
  return apiStats.map(({ stat, base_stat }) => ({
    name: POKEMON_STATS[stat.name],
    value: base_stat,
  }))
}

const distillDescription = (
  flavorTextArray: ApiPokemonResponse['flavor_text_entries'],
  lang: ApiLanguage['name'] = 'en'
) => {
  const description =
    flavorTextArray?.find((item) => item.language.name === lang)?.flavor_text ||
    'Not enough data has been collected yet to describe this Pokémon.'
  return description
    .replace(/[\n\f\r\t]/g, ' ')
    .replace(/\s\s+/g, ' ')
    .trim()
}
