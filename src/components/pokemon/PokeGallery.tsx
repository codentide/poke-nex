'use client'

import { usePaginate } from '@/hooks/usePaginate'
import { usePokeFilters } from '@/hooks/usePokeFilters'
import { Pokemon } from '@/types'
import { useEffect, useState } from 'react'
import { GridContainer, PaginationControl } from '../ui'
import { FilterBar } from '../ui/FilterBar'
import { PokemonCard } from './PokemonCard'

interface Props {
  content: Pokemon[]
}

type View = 'grid' | 'list'

export const PokeGallery = ({ content }: Props) => {
  const [view, setView] = useState<View>('grid')
  const Container = view === 'grid' ? GridContainer : GridContainer

  const {
    list: filteredList,
    state: filterState,
    setSearch,
    setSort,
    toggleType,
    clearTypes,
  } = usePokeFilters(content, { debounce: 250 })

  const {
    paginated: paginatedList,
    current,
    pages,
    next,
    prev,
    setCurrent,
  } = usePaginate(filteredList, 12)

  useEffect(() => {
    console.log(filterState)
  }, [filterState])

  return (
    <section className="flex flex-col gap-4">
      <FilterBar
        search={filterState.search}
        selectedTypes={filterState.types}
        sort={filterState.sort}
        onSearch={setSearch}
        onToggleType={toggleType}
        onClearTypes={clearTypes}
        onSort={setSort}
      />

      <Container>
        {paginatedList.map((pokemon) => (
          <PokemonCard key={pokemon.id} content={pokemon} />
        ))}
      </Container>

      <PaginationControl
        current={current}
        total={pages}
        onNext={next}
        onPrev={prev}
        onPageSelect={setCurrent}
      />
    </section>
  )
}
