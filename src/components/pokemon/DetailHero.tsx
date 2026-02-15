import { Pokemon } from '@/types'
import { ArrowButton } from '../ui'
import { DetailCover } from './DetailCover'
import { TypeBadge } from './TypeBadge'

interface Props {
  data: Pokemon
}

export const DetailHero = ({ data }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <small className="block font-rajdhani text-2xl text-center text-white/32">
        N° {data.id.toString().padStart(4, '0')}
      </small>
      <div className="relative flex items-center justify-center gap-4 md:gap-12 w-full">
        {data.id > 1 && (
          <ArrowButton
            className="absolute xs:static -left-3"
            direction="left"
            type="link"
            href={`/pokemon/${data.id - 1}`}
          />
        )}
        <DetailCover data={data} />
        {data.id < 1025 && (
          <ArrowButton
            className="absolute xs:static -right-3"
            direction="right"
            type="link"
            href={`/pokemon/${data.id + 1}`}
          />
        )}
      </div>
      <h1 className="sr-only">
        {data.name}
      </h1>
      <p className="w-full lg:w-[80%] font-inter text-center leading-relaxed text-white/50">
        {data.description}
      </p>
    </div>
  )
}
