import { adaptPokemon } from '@/adapters/pokemon.adapter'
import {
  fetchEvolutionChain,
  fetchPokemonByID,
  fetchPokemonList,
} from '@/lib/api/pokemon.api'
import { flatEvolutionChain } from '@/lib/utils/pokemon.util'
import { Pokemon } from '@/types'

export const getPokemonDetail = async (
  slug: string
): Promise<Pokemon | null> => {
  try {
    if (!slug) return null
    const pokemonData = await fetchPokemonByID(slug)
    if (!pokemonData) throw new Error('[GET-POKEMON-DETAIL]: Response is null')
    return adaptPokemon(pokemonData)
  } catch (error) {
    console.error(error)
    return null
  }
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

export const getEvolutionChain = async (
  id: string | number
): Promise<Pokemon['evolution']['chain']> => {
  try {
    if (!id) throw new Error('[GET-EVOLUTION-CHAIN]: ID is required')
    const evolutionResponse = await fetchEvolutionChain(id)

    return flatEvolutionChain(evolutionResponse.chain)
  } catch (error) {
    console.error(error)
    return []
  }
}
