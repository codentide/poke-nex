import { ApiPokemonListResponse, ApiPokemonResponse } from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL
const LIMIT = process.env.POKEMON_LIST_LIMIT

export const fetchPokemonByID = async (slug: string): Promise<ApiPokemonResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon/${slug}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) return null
  return await response.json()
}

export const fetchPokemonList = async (limit: number = Number(LIMIT)): Promise<ApiPokemonListResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) return null
  return await response.json()
}
