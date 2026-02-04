import { adaptPokemon } from '@/adapters/pokemon.adapter'
import {
  fetchEvolutionChain,
  fetchPokemonByID,
  fetchPokemonList,
} from '@/lib/api/pokemon.api'
import { flatEvolutionChain } from '@/lib/utils/pokemon.util'
import { Evolution, Pokemon } from '@/types'

// [ ]: En vez de retornar null en errores retornar un objeto {data: null, error: error}

export const getPokemonDetail = async (
  slug: string,
  extended: boolean = true
): Promise<Pokemon | null> => {
  try {
    if (!slug) return null
    const pokemonData = await fetchPokemonByID(slug, extended)
    if (!pokemonData) throw new Error('Response is null')
    return adaptPokemon(pokemonData)
  } catch (error) {
    console.error('[GET-POKEMON-DETAIL]', error)
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
  const promises = keyList.map(({ name }) => getPokemonDetail(name, false))
  const result = await Promise.all(promises)
  return result.filter((pokemon) => pokemon != null)
}

export const getEvolutionChain = async (
  id: string | number
): Promise<Evolution[]> => {
  try {
    if (!id) throw new Error('[GET-EVOLUTION-CHAIN]: ID is required')
    const evolutionResponse = await fetchEvolutionChain(id)

    return flatEvolutionChain(evolutionResponse.chain)
  } catch (error) {
    console.error(error)
    return []
  }
}
