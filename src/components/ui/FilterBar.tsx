import { PokeSort, PokeType } from '@/types'

interface Props {
  search: string
  onSearch: (val: string) => void
  sort: PokeSort
  onSort: (val: PokeSort) => void
  selectedTypes: PokeType['name'][]
  onToggleType: (type: PokeType['name']) => void
  onClearTypes: () => void
}

export const FilterBar = ({
  search,
  onSearch,
  sort,
  onSort,
  selectedTypes,
  onToggleType,
  onClearTypes,
}: Props) => {
  const allTypes: PokeType['name'][] = [
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ]

  return (
    <div className="flex flex-col gap-6 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
      {/* Primera fila: Search y Sort */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Busca tu Pokémon..."
          className="flex-1 min-w-[250px] p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as PokeSort)}
          className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none cursor-pointer"
        >
          <option value="id-asc">Número (Menor a Mayor)</option>
          <option value="id-desc">Número (Mayor a Menor)</option>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
        </select>
      </div>

      {/* Segunda fila: Badges de Tipos */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
            Filtrar por tipo
          </span>
          {selectedTypes.length > 0 && (
            <button
              onClick={onClearTypes}
              className="text-xs text-red-500 hover:underline font-medium"
            >
              Limpiar filtros ({selectedTypes.length})
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allTypes.map((type) => {
            const isSelected = selectedTypes.includes(type)
            return (
              <button
                key={type}
                onClick={() => onToggleType(type)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                  ${
                    isSelected
                      ? `bg-type-${type} text-white ring-2 ring-offset-2 ring-type-${type}`
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }
                `}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
