'use client'

import { Pokemon } from '@/types'
import { useFavoriteActions, useIsFavorite } from '@/stores/favorite.store'
import { SpriteImage } from '../ui/SpriteImage'
import { TypeBadge } from './TypeBadge'
import { TypeIcon } from './TypeIcon'
import { IoHeart } from 'react-icons/io5'
import { memo } from 'react'
import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'

interface Props {
  content: Pokemon[]
}

import { useRouter } from 'next/navigation'

const TableRow = memo(({ pokemon }: { pokemon: Pokemon }) => {
  const router = useRouter()
  const toggleFavorite = useFavoriteActions().toggleFavorite
  const isFavorite = useIsFavorite(pokemon.id)
  
  const id = pokemon.id.toString().padStart(3, '0')
  const type = getMostColorfulType(pokemon.types)
  const theme = POKE_THEMES[type]

  const handleRowClick = () => {
    router.push(`/pokemon/${pokemon.name}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(pokemon)
  }

  return (
    <tr 
      onClick={handleRowClick}
      className="group border-b border-zinc-800/50 hover:bg-zinc-800/60 transition-colors font-rajdhani cursor-pointer"
    >
      <td className="py-4 pl-4 pr-2 text-zinc-500 font-medium">#{id}</td>
      <td className="py-4 px-2">
        <div className="flex items-center gap-2.5 lg:gap-4 group/link">
          <div className="relative w-12 h-12 flex-shrink-0">
            <SpriteImage
              src={pokemon.assets.home.default}
              alt={pokemon.name}
              width={48}
              height={48}
              theme={theme}
              className="object-contain group-hover/link:scale-110 transition-transform"
            />
          </div>
          <span className="text-md lg:text-lg lg:font-bold capitalize text-zinc-100 group-hover/link:text-zinc-300 transition-colors">
            {pokemon.name}
          </span>
        </div>
      </td>
      <td className="py-4 px-2">
        <div className="flex gap-2">
          {pokemon.types.map((type) => {
            const typeTheme = POKE_THEMES[type.name]
            return (
              <div key={type.name}>
                {/* Mobile: Icons */}
                <div className={`${typeTheme.bg} p-1.5 rounded-full sm:hidden`}>
                  <TypeIcon type={type.name} size={14} className={typeTheme.text} />
                </div>
                {/* Desktop: Badges */}
                <div className="hidden sm:block">
                  <TypeBadge type={type.name} />
                </div>
              </div>
            )
          })}
        </div>
      </td>
      <td className="py-4 pl-4 pr-6 text-right">
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-full hover:bg-zinc-700/50 transition-colors cursor-pointer"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <IoHeart
            className={`text-xl ${
              isFavorite 
                ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' 
                : 'text-zinc-600 hover:text-zinc-400'
            } transition-all duration-200`}
          />
        </button>
      </td>
    </tr>
  )
})

TableRow.displayName = 'TableRow'

export const PokemonTable = ({ content }: Props) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-800/30">
          <tr className="border-b border-zinc-800 text-zinc-400 text-sm font-rajdhani uppercase tracking-wider">
            <th className="py-4 pl-4 pr-2 font-semibold w-24">ID</th>
            <th className="py-4 px-2 font-semibold">Pokémon</th>
            <th className="py-4 px-2 font-semibold">Types</th>
            <th className="py-4 pl-2 pr-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {content.map((pokemon) => (
            <TableRow key={pokemon.id} pokemon={pokemon} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
