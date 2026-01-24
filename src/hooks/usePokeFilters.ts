import { Pokemon, PokeSort, PokeType } from '@/types'
import { useMemo, useReducer } from 'react'
import { useDebounce } from './useDebounce'

type FilterState = {
  search: string
  types: PokeType['name'][]
  sort: PokeSort
}

type FilterAction =
  | { type: 'SET_SEARCH'; payload: FilterState['search'] }
  | { type: 'SET_SORT'; payload: FilterState['sort'] }
  | { type: 'TOGGLE_TYPE'; payload: FilterState['types'][number] }
  | { type: 'CLEAR_TYPES' }

// Reducer para manejar los estados
const filterReducer = (state: FilterState, action: FilterAction) => {
  if (action.type === 'SET_SEARCH')
    return { ...state, search: action.payload.toLowerCase() }
  if (action.type === 'SET_SORT') return { ...state, sort: action.payload }
  if (action.type === 'TOGGLE_TYPE') {
    const newType = action.payload
    const isAlreadySelected = state.types.includes(newType)

    if (isAlreadySelected) {
      const filteredTypes = state.types.filter((type) => type !== newType)
      return { ...state, types: filteredTypes }
    }
    const updatedTypes =
      state.types.length >= 2 ? [state.types[1], newType] : [...state.types, newType]
    return { ...state, types: updatedTypes }
  }
  if (action.type === 'CLEAR_TYPES') return { ...state, types: [] }
  else return state
}

// Estado inicial
const defaultState: FilterState = {
  search: '',
  types: [],
  sort: 'id-asc',
}

type filterConfig = {
  debounce?: number
}

const defaultConfig: filterConfig = {
  debounce: 0,
}

export const usePokeFilters = (
  pokeList: Pokemon[],
  config: filterConfig = defaultConfig
) => {
  const [state, dispatch] = useReducer(filterReducer, defaultState)
  const { search, types, sort } = state
  const debSearch = useDebounce(search, config.debounce || 0)

  // Proceso de filtrado y ordenamiento por niveles
  const list = useMemo(() => {
    const search = debSearch
    let result = [...pokeList]

    if (search.trim() !== '') {
      const query = search
      result = result.filter(
        ({ name, id }) =>
          name.toLowerCase().includes(query) || id.toString().includes(query)
      )
    }

    if (types.length > 0) {
      result = result.filter((pokemon) => {
        const pokeTypeNames = pokemon.types.map((type) => type.name)
        return types.every((stateType) => pokeTypeNames.includes(stateType))
      })
    }

    result.sort((a, b) => {
      if (sort === 'id-asc') return a.id - b.id
      if (sort === 'id-desc') return b.id - a.id
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      return 0
    })

    return result
  }, [pokeList, debSearch, types, sort])

  return {
    list,
    state,
    setSearch: (payload: string) => dispatch({ type: 'SET_SEARCH', payload }),
    setSort: (payload: PokeSort) => dispatch({ type: 'SET_SORT', payload }),
    toggleType: (payload: PokeType['name']) =>
      dispatch({ type: 'TOGGLE_TYPE', payload }),
    clearTypes: () => dispatch({ type: 'CLEAR_TYPES' }),
  }
}
