import { useState, useRef, useEffect } from 'react'
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
  const lastCodeRef = useRef<HTMLDivElement | null>(null)
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
      setPage(nuevos[nuevos.length - 1].id)
    } catch (error) {
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getAllCodes()
        }
      },
      { threshold: 1.0 }
    )

    const node = lastCodeRef.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [lastCodeRef.current]) // importante: si cambia el nodo, re-observar

  useEffect(() => {
    getAllCodes()
  }, [])

  return {
    codes,
    lastCodeRef,
    loading
  }
}
