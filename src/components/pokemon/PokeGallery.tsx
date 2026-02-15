'use client'

import { useState } from 'react'
import { usePaginate, usePokeFilters } from '@/hooks'
import { Pokemon } from '@/types'
import {
  FilterBar,
  GridContainer,
  PaginationControl,
} from '../ui'
import { PokemonCard, PokemonTable } from './'

interface Props {
  content: Pokemon[]
  emptyMessage?: string
}

export type View = 'grid' | 'list'

export const PokeGallery = ({ content }: Props) => {
  const [view, setView] = useState<View>('grid')

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

  return (
    <section className="flex flex-col gap-16 max-w-7xl min-h-[68vh]">
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

      {paginatedList.length > 0 ? (
        view === 'grid' ? (
          <GridContainer>
            {paginatedList.map((pokemon) => (
              <PokemonCard key={pokemon.id} content={pokemon} />
            ))}
          </GridContainer>
        ) : (
          <PokemonTable content={paginatedList} />
        )
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-zinc-500 italic">
            No specimens match your current filters.
          </p>
        </div>
      )}

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
