import {
  ApiEvolutionChainResponse,
  ApiPokemonListResponse,
  ApiPokemonResponse,
  ApiSpeciesResponse,
} from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL
const LIMIT = process.env.POKEMON_LIST_LIMIT

// [ ]: Refactorizar para lanzar una excepción cuando la respuesta no sea valida (throw)

export const fetchPokemonByID = async (
  slug: string,
  extended = true
): Promise<ApiPokemonResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 86400 },
  })
  if (!response.ok) return null
  const data: ApiPokemonResponse = await response.json()
  if (!extended) return data
  const speciesResponse = await fetch(data.species.url)
  if (!speciesResponse.ok) return data
  const speciesData: ApiSpeciesResponse = await speciesResponse.json()
  data.genera = speciesData.genera
  data.flavor_text_entries = speciesData.flavor_text_entries
  data.evolution_chain = speciesData.evolution_chain
  return data
}

export const fetchPokemonList = async (
  limit: number = Number(LIMIT)
): Promise<ApiPokemonListResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) return null
  return await response.json()
}

export const fetchEvolutionChain = async (
  id: number | string
): Promise<ApiEvolutionChainResponse> => {
  const response = await fetch(`${BASE_URL}/evolution-chain/${id}`)
  if (!response.ok) throw new Error('Error fetching evolution chain')
  return await response.json()
}
