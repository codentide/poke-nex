export const StatsChartSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-0 h-68 lg:h-120 mb-8 animate-skeleton-appear [animation-delay:300ms] opacity-0">
      {/* <div className="h-10 w-48 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" /> */}
      <div className="flex-1 w-full flex items-center justify-center">
        {/* Un círculo grande que simule el radar */}
        <div className="w-64 h-64 lg:w-96 lg:h-96 border-4 border-dashed border-white/5 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-dashed border-white/5 rounded-full" />
        </div>
      </div>
    </div>
  )
}
