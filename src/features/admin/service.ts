import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import serverFetch from '@/utils/axios'
import { toast } from 'sonner'

export const createCode = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const [locality, setLocality] = useState('')
  const [province, setProvince] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleLocality = (e: ChangeEvent<HTMLInputElement>) => {
    setLocality(e.target.value)
  }
  const handleProvince = (e: ChangeEvent<HTMLInputElement>) => {
    setProvince(e.target.value)
  }
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const sendCode = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let toastId = toast.loading('Loading...', { duration: 2000 })
    try {
      const result = await serverFetch.post('/codes', {
        code,
        name,
        province,
        locality,
        phone,
        email
      })
      toast.success(result.data.data.message, { duration: 2000, id: toastId })
    } catch (error: any) {
      toast.error(error.response.data.data.message, {
        duration: 2000,
        id: toastId
      })
    }
  }
  return {
    sendCode,
    code,
    email,
    name,
    phone,
    province,
    locality,
    handleCode,
    handleEmail,
    handleLocality,
    handleName,
    handlePhone,
    handleProvince
  }
}

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
  Place?: {
    id: number
    name: string
  }
}

export const useCodes = () => {
  const [codes, setCodes] = useState<Code[]>([])
  const [page, setPage] = useState<number | null>(0)
  const lastCodeRef = useRef<HTMLDivElement | null>(null)
  const isFetchingRef = useRef(false)

  const getAllCodes = async () => {
    if (isFetchingRef.current || page === null) return

    isFetchingRef.current = true

    try {
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
    lastCodeRef
  }
}
