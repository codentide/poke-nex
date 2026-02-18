import { adaptPokemon } from '@/adapters/pokemon-detail.adapter'
import { adaptPokemonSummary } from '@/adapters/pokemon-summary.adapter'
import {
  fetchEvolutionChain,
  fetchPokemonByID,
  fetchPokemonList,
  fetchPokemonListGQL,
} from '@/lib/api/pokemon.api'
import { handleServiceError } from '@/lib/utils/error.util'
import { flatEvolutionChain } from '@/lib/utils/pokemon.util'
import {
  ApiError,
  Evolution,
  PokemonDetail,
  PokemonList,
  PokemonSummary,
  ServiceResponse,
} from '@/types'

export const getPokemonDetail = async (
  slug: string,
  extended: boolean = true
): Promise<ServiceResponse<PokemonDetail>> => {
  try {
    if (!slug) throw new Error('The Pokémon slug or ID is required.')
    const pokemonData = await fetchPokemonByID(slug, extended)
    if (!pokemonData) throw new ApiError('Pokémon data is null')
    return { data: adaptPokemon(pokemonData), error: null }
  } catch (error) {
    const fault = handleServiceError(error, '[getPokemonDetail]')
    return {
      data: null,
      error: fault,
    }
  }
}

export const getPokemonList = async (): Promise<
  ServiceResponse<PokemonList>
> => {
  try {
    const pokemonList = await fetchPokemonList()
    if (!pokemonList || pokemonList.results.length === 0) {
      throw new ApiError('Pokémon list is null')
    }
    return { data: pokemonList.results, error: null }
  } catch (error) {
    const fault = handleServiceError(error, '[getPokemonList]')
    return {
      data: null,
      error: fault,
    }
  }
}

export const getPokemonListGQL = async (): Promise<
  ServiceResponse<PokemonSummary[]>
> => {
  try {
    const pokemonList = await fetchPokemonListGQL()
    if (!pokemonList || pokemonList.data.pokemon.length === 0) {
      throw new ApiError('Pokémon list is null')
    }
    const data = pokemonList.data.pokemon.map((p) => adaptPokemonSummary(p))
    return { data, error: null }
  } catch (error) {
    const fault = handleServiceError(error, '[getPokemonList]')
    return {
      data: null,
      error: fault,
    }
  }
}

export const getPokemonDetailList = async (): Promise<
  ServiceResponse<PokemonDetail[]>
> => {
  try {
    const keyList = await getPokemonList()
    if (!keyList.data) {
      // En lugar de crear un nuevo ApiError, propagamos el error original
      if (keyList.error) {
        const originalError = new ApiError(
          keyList.error.message,
          typeof keyList.error.code === 'number'
            ? keyList.error.code
            : undefined,
          keyList.error.context
        )
        throw originalError
      }
      throw new ApiError('Pokémon list is null')
    }
    const promises = keyList.data.map(({ name }) =>
      getPokemonDetail(name, false)
    )
    const responses = await Promise.all(promises)
    const result = responses
      .filter((res) => res.data != null)
      .map((res) => res.data)

    return { data: result, error: null }
  } catch (error) {
    const fault = handleServiceError(error, '[getPokemonDetailList]')
    return {
      data: null,
      error: fault,
    }
  }
}

export const getEvolutionChain = async (
  id: string | number
): Promise<ServiceResponse<Evolution[]>> => {
  try {
    if (!id) throw new Error('The Pokémon slug or ID is required.')
    const evolutionResponse = await fetchEvolutionChain(id)
    if (!evolutionResponse) throw new ApiError('Pokémon evolution is null')
    return { data: flatEvolutionChain(evolutionResponse.chain), error: null }
  } catch (error) {
    const fault = handleServiceError(error, '[getEvolutionChain]')
    return {
      data: null,
      error: fault,
    }
  }
}
