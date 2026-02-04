import { POKE_THEMES } from '@/constants'
import { PokeType } from '@/types'

interface Props {
  type: PokeType['name']
  multiplier?: number
}

export const TypeBadge = ({ type, multiplier }: Props) => {
  const theme = POKE_THEMES[type] || 'normal'

  return (
    <div
      key={type}
      className={`flex items-center justify-center gap-2 w-fit font-rajdhani rounded-sm px-3 py-0.5 text-sm font-bold uppercase ${theme.bg} ${theme.text}`}
    >
      {type}
      {multiplier != null && multiplier !== 1 && multiplier !== 0 && (
        <div className="grid place-items-center w-fit py-1 px-1.5 rounded-xs leading-[0.4] bg-black/40">
          <span className="leading-[0.7] mt-0.5 text-xs">X{multiplier}</span>
        </div>
      )}
    </div>
  )
}
