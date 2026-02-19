import { PokemonSummary } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  favorites: PokemonSummary[]
}

type Actions = {
  toggleFavorite: (pokemon: PokemonSummary) => void
  isFavorite: (id: PokemonSummary['id']) => boolean
}

interface Store extends State, Actions {}

export const useFavoriteStore = create<Store>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (id) => get().favorites.some((p) => p.id === id),
      toggleFavorite: (pokemon) => {
        const { favorites, isFavorite } = get()
        const newPokemon: PokemonSummary = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          image: pokemon.image,
        }
        set({
          favorites: isFavorite(newPokemon.id)
            ? favorites.filter((p) => p.id !== newPokemon.id)
            : [...favorites, newPokemon],
        })
      },
    }),
    {
      name: 'POKENEX-FAVORITE-LIST',
    }
  )
)

export const useFavoriteState = () => {
  return useFavoriteStore((state) => state.favorites)
}

export const useIsFavorite = (id: PokemonSummary['id']) => {
  return useFavoriteStore((state) => state.favorites.some((p) => p.id === id))
}

export const useFavoriteActions = () => {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)

  return { toggleFavorite }
}
