import { useState, type ChangeEvent } from 'react'
import serverFetch from '@/utils/axios'
import { toast } from 'sonner'

export const createCode = () => {
  const [form, setForm] = useState({
    code: '',
    name: '',
    webId: '',
    locality: '',
    province: '',
    phone: '',
    email: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const sendCode = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let toastId = toast.loading('Loading...', { duration: 2000 })
    try {
      const result = await serverFetch.post('/codes', form)
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
    handleChange,
    form
  }
}
