import { PokeType } from '@/types'

interface Props {
  type: PokeType['name']
  size: number
  className?: string
}

export const TypeIcon = ({ type, size = 6, className }: Props) => {
  return (
    <div
      title={type}
      className={`icon-mask ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maskImage: `url(/type-icons/${type}.svg)`,
        WebkitMaskImage: `url(/type-icons/${type}.svg)`,
      }}
    />
  )
}
