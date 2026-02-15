export const PokemonCardSkeleton = () => {
  return (
    <article className="relative flex flex-col justify-between gap-2 rounded-lg mt-16 bg-linear-to-tr from-zinc-800 to-zinc-900 border border-zinc-800 p-5 animate-pulse">
      {/* Image area */}
      <div className="relative flex w-full h-22 items-center justify-center">
        <div className="absolute bottom-0 w-40 h-40 bg-white/5 rounded-full" />
      </div>

      {/* Content area */}
      <div className="text-left w-full">
        {/* Pokemon name */}
        <div className="h-7 w-32 bg-white/10 rounded mb-1" />

        {/* Pokemon ID */}
        <div className="h-4 w-12 bg-white/5 rounded mb-2" />

        <div className="flex items-end justify-between">
          {/* Type badges */}
          <div className="mt-2 flex gap-2">
            <div className="h-6 w-16 bg-white/10 rounded-full" />
            <div className="h-6 w-16 bg-white/10 rounded-full" />
          </div>

          {/* Favorite button */}
          <div className="w-8 h-8 bg-white/5 rounded-full" />
        </div>
      </div>
    </article>
  )
}
