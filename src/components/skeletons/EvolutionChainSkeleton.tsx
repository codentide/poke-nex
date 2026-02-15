import { BiChevronRight } from 'react-icons/bi'

interface Props {
  themeText?: string // Para que la flecha herede el color del tema si quiere
}

export const EvolutionChainSkeleton = ({
  themeText = 'text-white/20',
}: Props) => {
  return (
    <div className="flex flex-col gap-8 animate-skeleton-appear [animation-delay:300ms] opacity-0">
      <div className="h-10 w-48 bg-white/5 rounded-lg mx-auto mb-2 animate-pulse" />
      <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4 w-full">
        {[1, 2, 3].map((step, index) => (
          <div
            className="flex flex-col lg:flex-row items-center gap-4"
            key={step}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-40 bg-white/5 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            {index < 2 && (
              <BiChevronRight
                className={`text-4xl rotate-90 lg:rotate-0 ${themeText} opacity-20`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
