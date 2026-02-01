import { POKE_THEMES } from '@/constants'
import { PokeType } from '@/types'

interface Props {
  type: PokeType
}

export const TypeBadge = ({ type }: Props) => {
  const theme = POKE_THEMES[type.name] || 'normal'

  return (
    <span
      key={type.name}
      className={`font-rajdhani rounded-sm px-3 py-0.5 text-sm font-bold uppercase ${theme.bg} ${theme.text}`}
    >
      {type.name}
    </span>
  )
}
