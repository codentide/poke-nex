'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error capturado:', error)
  }, [error])

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h2 className="font-rajdhani text-6xl font-bold text-red-400 uppercase">
        System Failure
      </h2>
      <p className="text-white/50 text-md my-4 max-w-md">
        We apologize, there was a technical issue retrieving the Pokémon data.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-6 py-2 rounded-md border border-white/10 hover:text-white transition-colors uppercase font-rajdhani text-xl bg-white/5
         text-white/60 cursor-pointer"
      >
        Try Again
      </button>
    </main>
  )
}
