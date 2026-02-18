'use client'

import { usePaginate, usePokeFilters } from '@/hooks'
import { PokemonSummary } from '@/types'
import { FilterBar, GridContainer, PaginationControl } from '../ui'
import { PokemonCard, PokemonTable } from './'
import { useHydrated } from '@/hooks/useHydrated'
import { PokeGallerySkeleton } from '../skeletons'
import { useTweaksStore } from '@/stores/tweaks.store'

interface Props {
  content: PokemonSummary[]
  emptyMessage?: string
}

export const PokeGallery = ({ content }: Props) => {
  const isHydrated = useHydrated()
  const view = useTweaksStore((s) => s.view)
  const setView = useTweaksStore((s) => s.setView)

  const {
    list: filteredList,
    state: filterState,
    setSearch,
    setRegion,
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
  } = usePaginate(filteredList, 24)

  if (!isHydrated) return <PokeGallerySkeleton />

  return (
    <section className="flex flex-col gap-8 max-w-7xl min-h-[68vh]">
      <FilterBar
        search={filterState.search}
        region={filterState.region}
        selectedTypes={filterState.types}
        sort={filterState.sort}
        view={view}
        onSearch={setSearch}
        onRegionUpdate={setRegion}
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
