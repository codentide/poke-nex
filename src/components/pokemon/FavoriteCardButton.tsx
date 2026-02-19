import { useFavoriteActions, useIsFavorite } from '@/stores/favorite.store'
import { PokemonSummary } from '@/types'
import { memo, MouseEvent } from 'react'
import { IoHeart } from 'react-icons/io5'

export const FavoriteCardButton = memo(
  ({ pokemon }: { pokemon: PokemonSummary }) => {
    const isFavorite = useIsFavorite(pokemon.id)
    const { toggleFavorite } = useFavoriteActions()

    const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      toggleFavorite(pokemon)
    }

    return (
      <button
        type="button"
        onClick={handleFavoriteClick}
        className="group/heart relative z-20 p-1 transition-transform active:scale-90"
      >
        <IoHeart
          className={`
            text-2xl transition-all duration-300
            ${
              isFavorite
                ? 'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                : 'text-zinc-700 group-hover/heart:text-zinc-500'
            }
            hover:scale-120
          `}
        />
      </button>
    )
  }
)

FavoriteCardButton.displayName = 'FavoriteCardButton'
