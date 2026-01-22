import { ApiPokemonResponse } from '@/types/api.types'

const BASE_URL = process.env.POKEAPI_BASE_URL

export const fetchPokemonByID = async (id: number): Promise<ApiPokemonResponse | null> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) return null
  return await response.json()
}
