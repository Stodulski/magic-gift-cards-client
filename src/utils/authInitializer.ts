import { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/auth'
import serverFetch from './axios'

export function AuthInitializer () {
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const hasRun = useRef(false)
  useEffect(() => {
    if (hasRun.current) return
    const fetchSession = async () => {
      try {
        hasRun.current = true
        const result = await serverFetch.get('/auth')
        login(
          result.data.data.user.id,
          result.data.data.user.role,
          result.data.data.user.name
        )
      } catch (err) {
        logout()
      }
    }
    fetchSession()
  }, [])
  return null
}
