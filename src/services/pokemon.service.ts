import { adaptPokemon } from '@/adapters/pokemon.adapter'
import { fetchPokemonByID, fetchPokemonList } from '@/lib/api/pokemon.api'
import { Pokemon } from '@/types'

export const getPokemonDetail = async (slug: string): Promise<Pokemon | null> => {
  if (!slug) return null
  const pokemonData = await fetchPokemonByID(slug)
  if (!pokemonData) return null
  return adaptPokemon(pokemonData)
}

export const getPokemonList = async () => {
  const pokemonList = await fetchPokemonList()
  if (!pokemonList || pokemonList.results.length === 0) return []
  return pokemonList.results
}

export const getPokemonDetailList = async () => {
  const keyList = await getPokemonList()
  const promises = keyList.map(({ name }) => getPokemonDetail(name))
  const result = await Promise.all(promises)
  return result.filter((pokemon) => pokemon != null)
}
