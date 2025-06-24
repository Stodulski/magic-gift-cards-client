import { useState, type ChangeEvent } from 'react'
import serverFetch from '@/utils/axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth'
export const redeemCode = () => {
  const userId = useAuthStore(s => s.userId)
  const [code, setCode] = useState('')

  const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const sendCode = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let toastId = toast.loading('Loading...')

    try {
      const options = {
        code: code.toLocaleLowerCase(),
        userId: userId
      }

      const result = await serverFetch.put('/codes', options)
      toast.success(result.data.data.message, {
        id: toastId,
        duration: Infinity
      })
    } catch (error: any) {
      toast.error(error.response.data.data.message, {
        duration: Infinity,
        id: toastId
      })
    }
  }
  return { sendCode, code, handleCode}
}
