'use client'

import { PokeStat } from '@/types'
import { StatsChart } from './StatsChart'

interface Props {
  stats: PokeStat[]
  hue: string
}

export const DetailStats = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-0 h-68 lg:h-120 mb-8">
      <h3 className="text-4xl font-rajdhani font-semibold uppercase text-center text-white/60 mb-4">
        Base Stats
      </h3>
      <StatsChart {...props} />
    </div>
  )
}
