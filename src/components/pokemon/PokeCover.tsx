'use client'

import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { Pokemon } from '@/types'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PiStarFourFill } from 'react-icons/pi'

interface Props {
  data: Pokemon
}

export const PokeCover = ({ data }: Props) => {
  const [shiny, setShiny] = useState<boolean>(false)
  const { name, types, assets } = data
  const pathname = usePathname()
  const type = getMostColorfulType(types)
  const theme = POKE_THEMES[type]

  const sprite = shiny ? assets.home.shiny.front : assets.home.default.front

  useEffect(() => {
    const slug = pathname.split('/').pop()
    if (slug && !isNaN(Number(slug))) {
      window.history.replaceState(null, '', `/pokemon/${data.name}`)
    }
  }, [data.name, pathname])

  return (
    <>
      <div
        className={`relative aspect-square w-52 sm:w-72 lg:w-96 drop-shadow-2xl ${theme.glow} drop-shadow-[0_0_120px]`}
      >
        <button
          title="Toggle shiny form"
          onClick={() => setShiny((prev) => !prev)}
          className={`isolate absolute z-10 top-0 -right-8 p-3 rounded-full text-m cursor-pointer transition-all hover:brightness-150 
          ${shiny ? `${theme.bg} ${theme.text}` : 'bg-white/5 text-white/60'}`}
        >
          <PiStarFourFill className="text-xl lg:text-2xl" />
        </button>
        <Image
          src={sprite}
          alt={`${shiny ? 'Shiny ' : ''}${name} image`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {shiny && (
          <small className="absolute -bottom-13 left-[50%] translate-x-[-50%] font-rajdhani text-lg uppercase text-white/60">
            (Shiny)
          </small>
        )}
      </div>
    </>
  )
}
