'use client'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Button = ({ children, className, onClick }: Props) => {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <button
      className={` px-8 py-2 rounded-md text-lg font-rajdhani hover:font-semibold uppercase  bg-white/5 text-white/60 hover:text-black hover:bg-white transition-all cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
