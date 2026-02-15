import Link from 'next/link'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

type ArrowLinkProps = {
  type: 'link'
  href: string
}

type ArrowButtonProps = {
  type: 'button'
  disabled: boolean
  onClick: () => void
}

type Props = (ArrowLinkProps | ArrowButtonProps) & {
  className?: string
  direction: 'left' | 'right'
}

export const ArrowButton = (props: Props) => {
  const { direction, type, className } = props
  const Chevron = direction === 'left' ? BiChevronLeft : BiChevronRight

  const commonStyles =
    'py-4 px-0 cursor-pointer hover:bg-white/5 rounded-md transition-all text-4xl text-white/20 hover:text-white '

  if (type === 'link') {
    return (
      <Link href={props.href} className={commonStyles + className}>
        <Chevron className="text-5xl" />
      </Link>
    )
  }

  return (
    <button
      onClick={props.onClick}
      className={commonStyles + className}
      disabled={props.disabled}
    >
      <Chevron className="text-5xl" />
    </button>
  )
}
