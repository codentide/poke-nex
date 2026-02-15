'use client'

import { RiRefreshLine } from "react-icons/ri"
import { EffectivityResults } from "./EffectivityResults"
import { useMemo, useState } from "react"
import { getEffectivities } from "@/lib/utils"
import { PokeType } from "@/types"
import { TypeSelector } from "./TypeSelector"

export const TypeCalculator = () => {

  const [selectedTypes, setSelectedTypes] = useState<PokeType['name'][]>([])
  const [isSpinning, setIsSpinning] = useState(false)

  const handleToggle = (type: PokeType['name']) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type)
      }
      if (prev.length >= 2) {
        return [prev[1], type]
      }
      return [...prev, type]
    })
  }

  const resetSelection = () => {
    if (isSpinning) return
    setSelectedTypes([])
    setIsSpinning(true)
    setTimeout(() => setIsSpinning(false), 600)
  }

  const effectivities = useMemo(() => {
    return getEffectivities(selectedTypes)
  }, [selectedTypes])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <section className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-zinc-500 whitespace-nowrap font-rajdhani">
                Type Selection
              </h2>
      
              <button 
                onClick={resetSelection}
                title="Reset selection"
                className="group relative text-zinc-600 hover:text-lime-500 transition-colors cursor-pointer p-1"
              >
                <RiRefreshLine 
                  className={`text-[30px] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSpinning ? 'rotate-[360deg] scale-110 text-lime-400' : 'rotate-0 scale-100'} group-hover:scale-110 active:scale-90`} 
                />
              </button>
            </div>
            <div className="h-[1px] flex-1 bg-zinc-900" />
            <TypeSelector selectedTypes={selectedTypes} onToggle={handleToggle} />
          </section>

          <section className="lg:col-span-5 space-y-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-zinc-500 whitespace-nowrap font-rajdhani mb-6.5">
              Effectiveness
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
            
            <div className="relative">
                <EffectivityResults multipliers={effectivities.multipliers} />
            </div>
          </section>
        </div>    
    )
}