import serverFetch from '../../utils/axios'
import { toast } from 'sonner'

import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useAuthStore } from '../../store/auth'

export const login = () => {
  const login = useAuthStore(s => s.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const sendLoginForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let toastId = toast.loading('cargando...')
    try {
      const result = await serverFetch.post('/auth', {
        username: username.toLowerCase(),
        password: password.toLowerCase()
      })
      login(
        result.data.data.user.id,
        result.data.data.user.role,
        result.data.data.user.name
      )
      toast.success(result.data.data.message, { duration: 1500, id: toastId })
    } catch (error: any) {
      toast.error(error.response.data.data.message, {
        duration: 1500,
        id: toastId
      })
      throw new error()
    }
  }

  return {
    sendLoginForm,
    handlePassword,
    handleUsername,
    password,
    username
  }
}
