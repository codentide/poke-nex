import { useMemo, useState } from 'react'

export const usePaginate = <T>(list: T[], limit: number = 20) => {
  const [current, setCurrent] = useState<number>(1)
  const [prevList, setPrevList] = useState(list)
  const pages = Math.ceil(list.length / limit)

  // Auxiliar para saber cuando cambia la lista y resetear el current
  if (list !== prevList) {
    setPrevList(list)
    setCurrent(1)
  }

  const paginated = useMemo(() => {
    const baseStart = (current - 1) * limit
    const start = baseStart >= list.length ? 0 : baseStart
    const end = start + limit
    return list.slice(start, end)
  }, [list, current, limit])

  const next = () => setCurrent((prev) => Math.min(prev + 1, pages))
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 1))

  return { paginated, current, pages, prev, next, setCurrent }
}
