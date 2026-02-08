import { PokemonCardSkeleton } from './PokemonCardSkeleton'

export const PokeGallerySkeleton = () => {
  return (
    <section className="flex flex-col gap-16 max-w-7xl min-h-[68vh] animate-skeleton-appear opacity-0">
      {/* FilterBar Skeleton */}
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
        {/* Primera fila: Search + Sort + View */}
        <div className="flex flex-col lg:flex-row gap-2.5 items-stretch justify-between lg:h-10">
          {/* Search input */}
          <div className="flex-1 h-10 bg-zinc-800 rounded-md animate-pulse" />
          
          {/* Sort + View buttons */}
          <div className="flex h-10 gap-2.5">
            <div className="w-full lg:w-50 h-full bg-zinc-800 rounded-md animate-pulse" />
            <div className="w-10 h-10 bg-zinc-800 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Segunda fila: Type badges */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
              <div
                key={i}
                className="w-9 h-9 bg-zinc-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid Container Skeleton */}
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-2">
        <div className="h-10 w-10 bg-zinc-800 rounded-md animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-10 bg-zinc-800 rounded-md animate-pulse"
          />
        ))}
        <div className="h-10 w-10 bg-zinc-800 rounded-md animate-pulse" />
      </div>
    </section>
  )
}
