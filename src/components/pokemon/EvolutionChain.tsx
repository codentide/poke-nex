import Image from 'next/image'
import { getEvolutionChain } from '@/services/pokemon.service'
import { Evolution } from '@/types'
import { BiChevronRight } from 'react-icons/bi'
import { TypeTheme } from '@/constants'
import Link from 'next/link'

interface Props {
  id?: string | number
  theme: TypeTheme
}

export const EvolutionChain = async ({ id, theme }: Props) => {
  if (!id) return null
  const { data: evolutionChain, error } = await getEvolutionChain(id)

  if (error && error.code != 404) throw new Error(JSON.stringify(error))
  if (!evolutionChain) return null

  const isEevee = evolutionChain[0].name === 'eevee'

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-4xl font-rajdhani font-semibold uppercase text-center text-white/60">
        {isEevee ? 'Eeveelutions' : 'Evolutions'}
      </h3>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
        {isEevee ? (
          <>
            <EvolutionStepCard data={evolutionChain[0]} theme={theme} />
            <div className="hidden lg:block">
              <BiChevronRight
                className={`text-5xl ${theme?.text} opacity-30`}
              />
            </div>
            <div className="lg:hidden block rotate-90">
              <BiChevronRight
                className={`text-5xl ${theme?.text} opacity-30`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {evolutionChain.slice(1).map((step) => (
                <EvolutionStepCard key={step.id} data={step} theme={theme} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-0 lg:gap-4">
            {evolutionChain.map((step, index) => (
              <div
                className="flex flex-col lg:flex-row items-center gap-4"
                key={step.id}
              >
                <EvolutionStepCard data={step} theme={theme} />
                {index < evolutionChain.length - 1 && (
                  <BiChevronRight
                    className={`text-4xl rotate-90 lg:rotate-0 ${theme?.text} opacity-30`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface StepCardProps {
  data: Evolution
  theme: TypeTheme
}

const EvolutionStepCard = ({ data, theme }: StepCardProps) => {
  const { id, name, sprite } = data
  const url = `/pokemon/${name || id}`

  return (
    <div className="group relative flex flex-col items-center gap-4">
      <Link href={url}>
        <div className="relative grid place-items-center rounded-full transition-all duration-300 ease-outgroup-hover:bg-white/10">
          <span
            className={`absolute inset-0 block rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 ${theme.bg}`}
          />
          <div className="relative aspect-square w-40 transition-transform duration-300 group-hover:scale-110 ">
            <Image
              src={sprite}
              alt={name + ' image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-center ">
        <span className="font-rajdhani text-2xl uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-rajdhani text-md text-white/40 select-none">
          N° {id.toString().padStart(4, '0')}
        </span>
      </div>
    </div>
  )
}
