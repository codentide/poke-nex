import { PokeRegion, PokeSort, PokeType } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type View = 'grid' | 'list'

interface TweaksState {
  page: number
  region: PokeRegion['name']
  types: PokeType['name'][]
  sort: PokeSort
  view: View

  query: string

  setView: (view: View) => void
  setSort: (sort: PokeSort) => void
  setPage: (page: number) => void
  setRegion: (region: PokeRegion['name']) => void
  setTypes: (types: PokeType['name'][]) => void
  setQuery: (query: string) => void
  resetTweaks: () => void
}

export const useTweaksStore = create<TweaksState>()(
  persist(
    (set, get) => ({
      page: 1,
      region: 'all',
      types: [],
      query: '',
      sort: 'id-asc',
      view: 'grid',

      setView: (view) => set({ view }),
      setSort: (sort) => set({ sort, page: 1 }),
      setPage: (page) => set({ page }),
      setRegion: (region) => {
        const newRegion = region === get().region ? 'all' : region
        set({ region: newRegion, page: 1 })
      },
      setTypes: (types) => {
        set({ types, page: 1 })
      },
      setQuery: (query) => set({ query }),
      resetTweaks: () =>
        set({
          page: 1,
          region: 'all',
          types: [],
          query: '',
          sort: 'id-asc',
          view: 'grid',
        }),
    }),
    {
      name: 'pokenex-tweaks',
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        // page: state.page,
        view: state.view,
        region: state.region,
        types: state.types,
      }),
    }
  )
)
