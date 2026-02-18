import { REGIONS } from '@/constants'
import { PokemonSummary, PokeType } from '@/types'
import { useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { useTweaksStore } from '@/stores/tweaks.store'

type filterConfig = {
  debounce?: number
}

const defaultConfig: filterConfig = {
  debounce: 0,
}

export const usePokeFilters = (
  pokeList: PokemonSummary[],
  config: filterConfig = defaultConfig
) => {
  const { query, region, types, sort, setQuery, setRegion, setSort, setTypes } =
    useTweaksStore()
  const debSearch = useDebounce(query, config.debounce || 0)

  const list = useMemo(() => {
    const query = debSearch.trim().toLowerCase()
    const currentRegion =
      region !== 'all' ? REGIONS.find((r) => r.name === region) : null

    let result = [...pokeList]

    // 1. Filtro de búsqueda
    if (query !== '') {
      result = result.filter(
        ({ name, id }) =>
          name.toLowerCase().includes(query) || id.toString().includes(query)
      )
    }

    // 2. Filtro de región
    if (currentRegion) {
      const { start, end } = currentRegion
      result = result.filter((p) => p.id >= start && p.id <= end)
    }

    // 3. Filtro de tipos
    if (Array.isArray(types) && types.length > 0) {
      // <--- Validamos que sea un Array
      result = result.filter((pokemon) =>
        types.some((t) => pokemon.types && pokemon.types.includes(t))
      )
    }

    // 4. Ordenamiento real (Sin el return 0)
    result.sort((a, b) => {
      if (sort === 'id-asc') return a.id - b.id // <--- Importante
      if (sort === 'id-desc') return b.id - a.id
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      return 0
    })

    return result
  }, [pokeList, debSearch, types, sort, region])

  // Lógica de toggle recuperada del reducer
  const toggleType = (typeName: PokeType['name']) => {
    const isAlreadySelected = types.includes(typeName)
    const newTypes = isAlreadySelected
      ? types.filter((t) => t !== typeName)
      : [...types, typeName]
    setTypes(newTypes)
  }

  return {
    list,
    state: { search: query, region, types, sort },
    setSearch: setQuery,
    setRegion,
    setSort,
    toggleType, // <--- Ahora sí es un toggle real
    clearTypes: () => setTypes([]),
  }
}
