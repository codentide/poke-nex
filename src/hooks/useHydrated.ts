'use client'

import { useEffect, useState } from 'react'

/**
 * Hook para verificar si el componente ya se encuentra montado en el cliente.
 * Útil para evitar errores de hidratación al usar storage o APIs del navegador.
 */
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Este código solo se ejecuta una vez que el componente se monta en el navegador
    setHydrated(true)
  }, [])

  return hydrated
}
