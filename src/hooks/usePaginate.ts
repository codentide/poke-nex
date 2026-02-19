'use client'

import { useTweaksStore } from '@/stores/tweaks.store'
import { useEffect, useMemo } from 'react'

export const usePaginate = <T>(list: T[], limit: number = 20) => {
  const current = useTweaksStore((state) => state.page)
  const setCurrent = useTweaksStore((state) => state.setPage)

  const pages = Math.ceil(list.length / limit)

  useEffect(() => {
    if (current > pages && pages > 0) setCurrent(1)
  }, [list.length, pages, current, setCurrent])

  const paginated = useMemo(() => {
    const activePage = current > pages ? 1 : current
    const start = (activePage - 1) * limit
    const end = start + limit

    return list.slice(start, end)
  }, [list, current, limit, pages])

  const next = () => setCurrent(Math.min(current + 1, pages))
  const prev = () => setCurrent(Math.max(current - 1, 1))

  return { paginated, current, pages, prev, next, setCurrent }
}
