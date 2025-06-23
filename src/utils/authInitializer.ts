import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.'
import serverFetch from './axios'

export function AuthInitializer () {
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await serverFetch.get('/auth')
        login()
      } catch (err) {
        logout()
      }
    }
    fetchSession()
  }, [])
  return null
}
