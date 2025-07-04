import { useState, useEffect, useCallback, useRef } from 'react'
import serverFetch from '@/utils/axios'

type Code = {
  id: number
  name?: string
  locality?: string
  province?: string
  phone?: string
  code: string
  email?: string
  usedAt?: string
  used: boolean
  webId: string
  User?: {
    id: number
    name: string
  }
}

export const useCodes = () => {
  const [codes, setCodes] = useState<Code[]>([])
  const [page, setPage] = useState<number | null>(0)
  const [loading, setLoading] = useState(true)
  const isFetchingRef = useRef(false)

  const getAllCodes = async () => {
    if (isFetchingRef.current || page === null) return
    isFetchingRef.current = true

    try {
      setLoading(true)
      const result = await serverFetch.get(`/codes/${page}`)
      const nuevos = result.data.data.codes

      setCodes(prev => {
        const mapa = new Map<number, Code>()
        prev.forEach(code => mapa.set(code.id, code))
        nuevos.forEach((code: Code) => mapa.set(code.id, code))
        return Array.from(mapa.values())
      })

      if (nuevos.length === 0) {
        setPage(null) // ya no hay más páginas
      } else {
        setPage(nuevos[nuevos.length - 1].id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }

  const observer = useRef<IntersectionObserver | null>(null)

  const lastCodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getAllCodes()
        }
      }, { threshold: 1.0 })

      if (node) observer.current.observe(node)
    },
    [loading]
  )

  useEffect(() => {
    getAllCodes()
  }, [])

  return {
    codes,
    page,
    loading,
    lastCodeRef
  }
}
