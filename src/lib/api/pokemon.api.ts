import {
  ApiPokemonListResponse,
  ApiPokemonResponse,
  ApiSpeciesResponse,
} from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL
const LIMIT = process.env.POKEMON_LIST_LIMIT

export const fetchPokemonByID = async (
  slug: string
): Promise<ApiPokemonResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 86400 },
  })
  if (!response.ok) return null

  const data: ApiPokemonResponse = await response.json()
  const speciesResponse = await fetch(data.species.url)
  const speciesData: ApiSpeciesResponse = await speciesResponse.json()
  data.genera = speciesData.genera
  data.flavor_text_entries = speciesData.flavor_text_entries
  return data
}

export const fetchPokemonList = async (
  limit: number = Number(LIMIT)
): Promise<ApiPokemonListResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) return null
  return await response.json()
}
