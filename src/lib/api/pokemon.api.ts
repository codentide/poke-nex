import { ApiError } from '@/types'
import {
  ApiEvolutionChainResponse,
  ApiPokemonListResponse,
  ApiPokemonResponse,
  ApiSpeciesResponse,
  GQLPokemonSummaryList,
} from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL
const GQL_URL = process.env.POKEAPI_GQL_URL!
const LIMIT = process.env.POKEMON_LIST_LIMIT

// Petición de información detallada del pokemon, con extended=true se trae información adicional
export const fetchPokemonByID = async (
  slug: string,
  extended = false
): Promise<ApiPokemonResponse> => {
  const baseResponse = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 604800 },
  })
  if (!baseResponse.ok) {
    throw new ApiError(
      `[API.ERROR] The Pokémon "${slug}" could not be obtained.`,
      baseResponse.status,
      '[fetchPokemonByID.base]'
    )
  }
  const baseData: ApiPokemonResponse = await baseResponse.json()
  if (!extended) return baseData

  const speciesResponse = await fetch(baseData.species.url)
  if (!speciesResponse.ok) {
    throw new ApiError(
      `[API.ERROR] The Pokémon "${slug}" could not be obtained.`,
      speciesResponse.status,
      '[fetchPokemonByID.species]'
    )
  }
  const speciesData: ApiSpeciesResponse = await speciesResponse.json()

  // Fetch full data for each variety in parallel to get their specific types
  const varietyData = await Promise.all(
    speciesData.varieties.map(async (variety) => {
      if (variety.pokemon.name === baseData.name) {
        return {
          ...variety,
          types: baseData.types,
          stats: baseData.stats,
          abilities: baseData.abilities,
          weight: baseData.weight,
          height: baseData.height,
        }
      }

      try {
        const res = await fetch(variety.pokemon.url, {
          next: { revalidate: 604800 },
        })
        if (res.ok) {
          const data: ApiPokemonResponse = await res.json()
          return {
            ...variety,
            types: data.types,
            stats: data.stats,
            abilities: data.abilities,
            weight: data.weight,
            height: data.height,
          }
        }
      } catch (e) {
        console.error(
          `[API.ERROR] Could not fetch variety ${variety.pokemon.name}`,
          e
        )
      }
      return variety
    })
  )

  return {
    ...baseData,
    genera: speciesData.genera,
    flavor_text_entries: speciesData.flavor_text_entries,
    evolution_chain: speciesData.evolution_chain,
    varieties: varietyData,
  }
}

// Petición que trae una lista de pares con nombre y url de pokémon
export const fetchPokemonList = async (
  limit: number = Number(LIMIT)
): Promise<ApiPokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) {
    throw new ApiError(
      `[API.ERROR] The Pokémon list could not be obtained.`,
      response.status,
      '[fetchPokemonList]'
    )
  }
  return await response.json()
}

export const fetchPokemonListGQL = async (
  limit: number = Number(LIMIT)
): Promise<GQLPokemonSummaryList> => {
  const query = `
    query getPokemonList($limit: Int, $offset: Int) {
      pokemon(limit: $limit, offset: $offset) {
        id
        name
        pokemontypes {
          type {
            name
          }
        }
      }
    }
  `
  const response = await fetch(GQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { limit, offset: 0 },
    }),
    next: { revalidate: 604800 },
  })

  if (!response.ok) {
    throw new ApiError(
      `[API.ERROR] The Pokémon list could not be obtained.`,
      response.status,
      '[fetchPokemonList]'
    )
  }

  return await response.json()
}

// Petición auxiliar que trae la información relacionada a la cadena de evoluciones de un pokémon
export const fetchEvolutionChain = async (
  id: number | string
): Promise<ApiEvolutionChainResponse> => {
  const response = await fetch(`${BASE_URL}/evolution-chain/${id}`)
  if (!response.ok) {
    throw new ApiError(
      `[API.ERROR] The Pokémon evolution chain could not be obtained.`,
      response.status,
      '[fetchEvolutionChain]'
    )
  }
  return await response.json()
}
