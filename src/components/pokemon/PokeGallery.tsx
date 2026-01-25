'use client'

import { usePaginate } from '@/hooks/usePaginate'
import { usePokeFilters } from '@/hooks/usePokeFilters'
import { Pokemon } from '@/types'
import { useState } from 'react'
import { GridContainer, PaginationControl } from '../ui'
import { FilterBar } from '../ui/FilterBar'
import { ListContainer } from '../ui/ListContainer'
import { PokemonCard } from './PokemonCard'

interface Props {
  content: Pokemon[]
}

export type View = 'grid' | 'list'

export const PokeGallery = ({ content }: Props) => {
  const [view, setView] = useState<View>('grid')
  const Container = view === 'grid' ? GridContainer : ListContainer

  const {
    list: filteredList,
    state: filterState,
    setSearch,
    setSort,
    toggleType,
    clearTypes,
  } = usePokeFilters(content, { debounce: 0 })

  const {
    paginated: paginatedList,
    current,
    pages,
    next,
    prev,
    setCurrent,
  } = usePaginate(filteredList, 12)

  return (
    <section className="flex flex-col gap-16 max-w-7xl">
      <FilterBar
        search={filterState.search}
        selectedTypes={filterState.types}
        sort={filterState.sort}
        view={view}
        onSearch={setSearch}
        onToggleType={toggleType}
        onClearTypes={clearTypes}
        onSort={setSort}
        onViewUpdate={setView}
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
