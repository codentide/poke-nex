import { adaptPokemon } from '@/adapters/pokemon.adapter'
import { fetchPokemonByID } from '@/lib/api/pokemon.api'
import { Pokemon } from '@/types'

export const getPokemonDetail = async (id: string): Promise<Pokemon | null> => {
  if (!id) return null
  const pokemonData = await fetchPokemonByID(Number(id))
  if (!pokemonData) return null
  return adaptPokemon(pokemonData)
}
