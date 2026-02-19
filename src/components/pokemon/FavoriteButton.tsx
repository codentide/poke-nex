'use client'

import { Button } from '../ui/Button'
import { IoHeart } from 'react-icons/io5'
import { CgClose } from 'react-icons/cg'
import { PokemonSummary } from '@/types'
import { useFavoriteActions, useIsFavorite } from '@/stores/favorite.store'

interface Props {
  pokemon: PokemonSummary
}

export const FavoriteButton = ({ pokemon }: Props) => {
  const { id } = pokemon
  const { toggleFavorite } = useFavoriteActions()
  const handleToggleFavorite = () => toggleFavorite(pokemon)
  const isFavorite = useIsFavorite(id)

  return (
    <Button
      className={`flex items-center justify-center gap-3 w-full md:w-fit ${isFavorite ? 'bg-white! text-black! font-semibold!' : ''}`}
      onClick={handleToggleFavorite}
    >
      {isFavorite ? (
        <>
          <CgClose className="text-xl" />
          <span>Remove from favorites</span>
        </>
      ) : (
        <>
          <IoHeart className="text-2xl" />
          <span>Add to favorites</span>
        </>
      )}
    </Button>
  )
}
