import { ApiError } from '@/types'
import {
  ApiEvolutionChainResponse,
  ApiPokemonListResponse,
  ApiPokemonResponse,
  ApiSpeciesResponse,
} from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL
const LIMIT = process.env.POKEMON_LIST_LIMIT

// Petición de información detallada del pokemon, con extended=true se trae información adicional
export const fetchPokemonByID = async (
  slug: string,
  extended = false
): Promise<ApiPokemonResponse> => {
  const baseResponse = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 86400 },
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
  return {
    ...baseData,
    genera: speciesData.genera,
    flavor_text_entries: speciesData.flavor_text_entries,
    evolution_chain: speciesData.evolution_chain,
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
