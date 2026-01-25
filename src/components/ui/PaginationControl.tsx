import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { PageBadge } from './PageBadge'
import { calculatePageButtons } from '@/lib/utils/pagination.util'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useIsMobile } from '@/hooks/useIsMobile'

interface Props {
  current: number
  total: number
  onNext: () => void
  onPrev: () => void
  onPageSelect: (page: number) => void
}

export const PaginationControl = ({
  current,
  total,
  onNext,
  onPrev,
  onPageSelect,
}: Props) => {
  const isMobile = useIsMobile()
  const pageButtons = calculatePageButtons(current, total, isMobile ? 2 : 3)

  return (
    <div className="flex gap-4 lg:gap-10 lg:mx-auto font-rajdhani">
      <button
        className="flex items-center justify-center gap-2  px-4 py-2 font-bold text-zinc-200 bg-zinc-800 border border-white/10 rounded-md cursor-pointer hover:shadow-md hover:brightness-125 active:scale-95 disabled:opacity-25 disabled:pointer-events-none transition-all"
        onClick={onPrev}
        disabled={current <= 1}
      >
        <FaAngleLeft className="text-zinc-400" />
        <span className="hidden lg:block">Back</span>
      </button>

      <div className="flex items-center justify-center gap-2 w-full md:w-fit">
        {pageButtons.map((page) => {
          if (page === total) return null
          return (
            <PageBadge
              key={page}
              page={page}
              onClick={onPageSelect}
              active={page == current}
            />
          )
        })}
        {current + 2 <= total && (
          <span className="grid place-items-center w-8.5 h-full aspect-[1/1.2] opacity-30">
            <HiEllipsisHorizontal className="text-xl" />
          </span>
        )}
        <PageBadge
          page={total}
          onClick={onPageSelect}
          active={total === current}
        />
      </div>

      <button
        className="flex items-center justify-center gap-2  px-4 py-2 font-bold text-zinc-200 bg-zinc-800 border border-white/10 rounded-md cursor-pointer hover:shadow-md hover:brightness-125 active:scale-95 disabled:opacity-25 disabled:pointer-events-none transition-all"
        onClick={onNext}
        disabled={current >= total}
      >
        <span className="hidden lg:block">Next</span>
        <FaAngleRight className="text-zinc-400" />
      </button>
    </div>
  )
}
