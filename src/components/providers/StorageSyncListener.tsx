'use client'

import { useFavoriteStore } from '@/stores/favorite.store'
import { useEffect } from 'react'

export const StorageSyncListener = () => {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'POKENEX-FAVORITE-LIST') {
        useFavoriteStore.persist.rehydrate()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return null
}
