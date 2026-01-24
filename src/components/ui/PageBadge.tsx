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
    <button className={`cursor-pointer ${active ? 'text-white' : 'text-red-400'}`} onClick={handleClick}>
      {page}
    </button>
  )
}
