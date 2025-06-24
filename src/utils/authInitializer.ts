import { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/auth'
import serverFetch from './axios'

export function AuthInitializer () {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const hasRun = useRef(false)
  useEffect(() => {
    if (hasRun.current) return
    const fetchSession = async () => {
      try {
        hasRun.current = true
        console.log('a')
        const result = await serverFetch.get('/auth')
        login(
          result.data.data.user.id,
          result.data.data.user.role,
          result.data.data.user.name
        )
      } catch (err) {
        localStorage.removeItem('auth-storage')
        logout()
      }
    }
    fetchSession()
  }, [isAuthenticated])
  return null
}
