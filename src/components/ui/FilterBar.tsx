import { View } from '@/components/pokemon/PokeGallery'
import { ALL_POKEMON_TYPES, POKE_THEMES } from '@/constants'
import { PokeSort, PokeType } from '@/types'
import { FaTrash } from 'react-icons/fa6'
import { HiMiniListBullet } from 'react-icons/hi2'
import { IoGrid } from 'react-icons/io5'
import { CustomSelect, CustomSelectProps } from './CustomSelect'
import { TypeIcon } from './TypeIcon'

interface Props {
  search: string
  sort: PokeSort
  selectedTypes: PokeType['name'][]
  view: View
  onSearch: (val: string) => void
  onSort: (val: PokeSort) => void
  onToggleType: (type: PokeType['name']) => void
  onClearTypes: () => void
  onViewUpdate: (view: View) => void
}

const SORT_OPTIONS: CustomSelectProps<string>['options'] = [
  { label: 'A-Z', value: 'name-asc' },
  { label: 'Z-A', value: 'name-desc' },
  { label: 'Lowest Id', value: 'id-asc' },
  { label: 'Highest Id', value: 'id-desc' },
]

export const FilterBar = ({
  search,
  sort,
  selectedTypes,
  view,
  onSearch,
  onSort,
  onToggleType,
  onClearTypes,
  onViewUpdate,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 ">
      <div className="flex flex-col lg:flex-row gap-2.5 items-stretch justify-between lg:h-10">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search a pokémon by name or id..."
          className="flex-1 pt-2 pb-1.5 px-4 rounded-md font-rajdhani bg-zinc-800 focus:ring-1 focus:ring-zinc-700 outline-none transition-all"
        />
        <div className="flex h-10 gap-2.5">
          <CustomSelect
            classname="w-full lg:w-50 h-full"
            selected={sort}
            options={SORT_OPTIONS}
            onSelect={(value) => onSort(value as PokeSort)}
            renderItem={(type) => (
              <div className="flex items-center gap-2">
                <span className="capitalize">{type}</span>
              </div>
            )}
          />
          <button
            title="Change View"
            onClick={() => onViewUpdate(view === 'grid' ? 'list' : 'grid')}
            className="grid place-items-center w-10 h-10  p-2 rounded-md text-xs font-semibold uppercase cursor-pointer hover:brightness-[1.2] focus:brightness-[1.5] focus:outline-none bg-zinc-800 text-zinc-400 transition-all"
          >
            {view === 'grid' ? (
              <IoGrid className="text-[20px]" />
            ) : (
              <HiMiniListBullet className="text-[24px]" />
            )}
          </button>
        </div>
      </div>

      {/* Segunda fila: Badges de Tipos */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap justify-center gap-1">
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
            className="grid place-items-center w-full lg:w-fit p-2.25 rounded-md lg:rounded-full text-xs font-semibold uppercase bg-red-900 text-red-400 cursor-pointer hover:brightness-[1.2] focus:brightness-[1.5] focus:outline-nonetransition-all"
          >
            <FaTrash className="text-[16px]" />
          </button>
        )}
      </div>
    </div>
  )
}
