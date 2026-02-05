'use client'

import { useEffect, useMemo } from 'react'
import { DisplayError } from '@/types'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const errorData: Partial<DisplayError> = useMemo(() => {
    try {
      return JSON.parse(error.message)
    } catch {
      return { message: error.message }
    }
  }, [error.message])

  useEffect(() => {
    console.error(`[CRASH-REPORT]`, errorData)
  }, [errorData])

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 font-rajdhani ">
      <h2 className="text-6xl font-bold text-red-400 uppercase tracking-tighter">
        System Failure
      </h2>

      <div className="my-4 max-w-lg">
        <p className="text-white/50 text-xl font-medium font-rajdhani">
          {errorData.message || 'An unexpected error occurred.'}
        </p>
        {errorData.code && (
          <p className="text-white/30 text-md mt-2 uppercase tracking-widest">
            Fault Code: {errorData.code}
          </p>
        )}
        {errorData.context && (
          <p className="text-white/20 text-xs uppercase mt-1">
            Trace: {errorData.context}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => reset()}
        className="px-8 py-2 rounded-md border border-white/10 hover:border-red-400/40 hover:text-white transition-all uppercase font-rajdhani text-xl bg-white/5 text-white/60 cursor-pointer"
      >
        Restart System
      </button>
    </main>
  )
}
