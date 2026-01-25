interface Props {
  active?: boolean
  page: number
  onClick?: (page: number) => void
}

export const PageBadge = ({ active, page, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) onClick(page)
  }

  return (
    <button
      className={`grid place-items-center w-8.5 h-full aspect-[1/1.2] rounded-md font-bold text-lg cursor-pointer ${active ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-800 text-zinc-400 '}`}
      onClick={handleClick}
    >
      {page}
    </button>
  )
}
