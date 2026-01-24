import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { PageBadge } from './PageBadge'

interface Props {
  current: number
  total: number
  onNext: () => void
  onPrev: () => void
  onPageSelect: (page: number) => void
}

const calculatePageButtons = (current: number, total: number) => {
  const showAmount = 3

  let start = Math.max(1, current)
  if (start + showAmount > total) {
    start = Math.max(1, total - showAmount)
  }

  const badges = []
  for (let i = 0; i < showAmount && start + i <= total; i++) {
    badges.push(start + i)
  }

  return badges
}

export const PaginationControl = ({ current, total, onNext, onPrev, onPageSelect }: Props) => {
  const pageButtons = calculatePageButtons(current, total)

  return (
    <div className="flex items-center justify-center gap-10 py-10">
      <button
        className="flex items-center gap-2 px-6 py-3 font-bold text-gray-600 transition-all bg-white shadow-sm rounded-xl cursor-pointer hover:shadow-md hover:text-red-500 active:scale-95 disabled:invisible"
        onClick={onPrev}
        disabled={current <= 1}
      >
        <FaAngleLeft className="text-red-400" />
        Back
      </button>

      <div className="flex items-center gap-3 px-5 py-2 font-mono text-lg font-bold text-white bg-gray-800 shadow-inner rounded-full">
        {pageButtons.map((page) => (
          <PageBadge key={page} page={page} onClick={onPageSelect} active={page == current} />
        ))}
        {current + 3 <= total && <span className="opacity-30">...</span>}
        <PageBadge page={total} onClick={onPageSelect} active={total === current} />
      </div>

      <button
        className="flex items-center gap-2 px-6 py-3 font-bold text-gray-600 transition-all bg-white shadow-sm rounded-xl cursor-pointer hover:shadow-md hover:text-red-500 active:scale-95 disabled:invisible"
        onClick={onNext}
        disabled={current >= total}
      >
        Next
        <FaAngleRight className="text-red-400" />
      </button>
    </div>
  )
}
