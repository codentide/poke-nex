import { ALL_POKEMON_TYPES, POKE_THEMES, REGIONS } from '@/constants'
import { PokeRegion, PokeSort, PokeType } from '@/types'
import { FaTrash } from 'react-icons/fa6'
import { HiMiniListBullet } from 'react-icons/hi2'
import { IoGrid } from 'react-icons/io5'
import { TypeIcon } from '../pokemon/TypeIcon'
import { CustomSelect, CustomSelectProps } from './CustomSelect'
import { View } from '@/stores/tweaks.store'

interface Props {
  search: string
  sort: PokeSort
  selectedTypes: PokeType['name'][]
  view: View
  region: PokeRegion['name']
  onSearch: (val: string) => void
  onSort: (val: PokeSort) => void
  onToggleType: (type: PokeType['name']) => void
  onClearTypes: () => void
  onViewUpdate: (view: View) => void
  onRegionUpdate: (region: PokeRegion['name']) => void
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
  region,
  onSearch,
  onSort,
  onToggleType,
  onClearTypes,
  onViewUpdate,
  onRegionUpdate,
}: Props) => {
  return (
    <div className="flex flex-col gap-2.5 py-2.5 lg:py-4 rounded-xl bg-zinc-900 border border-zinc-800 ">
      <div className="flex flex-col lg:flex-row gap-2.5 items-stretch justify-between lg:h-10 px-2.5 lg:px-4">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search a pokémon by name or id..."
          className="flex-1 pt-2 pb-1.5 px-4 rounded-md font-rajdhani bg-zinc-800 focus:ring-1 focus:ring-zinc-700 outline-none transition-all"
        />
        {/* Sort and View */}
        <div className="flex h-10 gap-2.5">
          <CustomSelect
            className="w-full lg:w-50 h-full"
            value={sort}
            options={SORT_OPTIONS}
            onSelect={(value) => onSort(value as PokeSort)}
          />
          <button
            title="Change View"
            onClick={() => onViewUpdate(view === 'grid' ? 'list' : 'grid')}
            className="grid place-items-center w-10 h-10  p-2 rounded-md text-xs font-semibold uppercase cursor-pointer hover:brightness-[1.2] focus:brightness-[1.5] focus:outline-none bg-zinc-800 text-zinc-400 transition-all"
          >
            {view === 'list' ? (
              <IoGrid className="text-[20px]" />
            ) : (
              <HiMiniListBullet className="text-[24px]" />
            )}
          </button>
        </div>
      </div>

      <div className="px-2.5 lg:px-4">
        <div className="flex overflow-x-auto gap-2 scroll-smooth custom-scrollbar pb-1.5 snap-x snap-mandatory">
          {REGIONS.map(({ name }) => (
            <button
              key={name}
              className={`flex-none snap-start whitespace-nowrap px-4 py-1 lg:py-0.5 rounded-md font-rajdhani text-sm capitalize font-medium transition-colors
                ${region === name ? 'bg-lime-300 text-zinc-800' : 'bg-white/10 hover:bg-white/20'}`}
              onClick={() => onRegionUpdate(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-zinc-800" />

      {/* Badges de Tipos */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-2.5 lg:px-4">
        <div className="flex flex-wrap justify-center gap-1">
          {ALL_POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type)
            const theme = POKE_THEMES[type]
            return (
              <button
                key={type}
                onClick={() => onToggleType(type)}
                className={`
                  p-1.5 md:p-2 rounded-full text-xs font-semibold uppercase cursor-pointer hover:brightness-[1.2] transition-all focus:brightness-[1.5] focus:outline-none 
                
                  ${
                    isSelected
                      ? `${theme.bg} ${theme.text}`
                      : 'bg-zinc-800 text-zinc-500 outline-transparent'
                  }
                `}
              >
                <TypeIcon type={type} size={16} />
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
