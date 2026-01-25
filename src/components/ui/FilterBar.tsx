import { ALL_POKEMON_TYPES, POKE_THEMES } from '@/constants'
import { PokeSort, PokeType } from '@/types'
import { TypeIcon } from './TypeIcon'
import { FaTrash } from 'react-icons/fa6'
import { CustomSelect } from './CustomSelect'

interface Props {
  search: string
  onSearch: (val: string) => void
  sort: PokeSort
  onSort: (val: PokeSort) => void
  selectedTypes: PokeType['name'][]
  onToggleType: (type: PokeType['name']) => void
  onClearTypes: () => void
}

const SORT_OPTIONS = [
  { key: 'ID UP', value: 'id-asc' },
  { key: 'ID DOWN', value: 'id-desc' },
  { key: 'A-Z', value: 'name-asc' },
  { key: 'Z-A', value: 'name-desc' },
]
export const FilterBar = ({
  search,
  onSearch,
  sort,
  onSort,
  selectedTypes,
  onToggleType,
  onClearTypes,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex gap-4 items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Busca tu Pokémon..."
          className="flex-1 py-2 px-4 rounded-md bg-zinc-800 focus:ring-1 focus:ring-red-500 outline-none"
        />
        <CustomSelect
          classname="w-50"
          selected={sort}
          options={SORT_OPTIONS}
          onSelect={(value) => onSort(value as PokeSort)}
          renderItem={(type) => (
            <div className="flex items-center gap-2">
              <span className="capitalize">{type}</span>
            </div>
          )}
        />
      </div>

      {/* Segunda fila: Badges de Tipos */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {ALL_POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type)
            const theme = POKE_THEMES[type]
            return (
              <button
                key={type}
                onClick={() => onToggleType(type)}
                className={`
                  p-2 rounded-full text-xs font-semibold uppercase cursor-pointer hover:brightness-[1.2] transition-all focus:brightness-[1.5] focus:outline-none
                  ${
                    isSelected
                      ? `${theme.bg} ${theme.text} `
                      : 'bg-zinc-800 text-zinc-500 outline-transparent'
                  }
                `}
              >
                <TypeIcon type={type} size={18} />
              </button>
            )
          })}
        </div>
        {selectedTypes.length > 0 && (
          <button
            title="Clear type filters"
            onClick={onClearTypes}
            className="p-2.25 rounded-full text-xs font-semibold uppercase cursor-pointer hover:brightness-[1.2]  focus:brightness-[1.5] focus:outline-none bg-red-900 text-red-400 transition-all"
          >
            <FaTrash className="text-[16px]" />
          </button>
        )}
      </div>
    </div>
  )
}
