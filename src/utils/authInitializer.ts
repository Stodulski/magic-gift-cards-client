import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.'
import serverFetch from './axios'

export function AuthInitializer () {
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const setLoading = useAuthStore(s => s.setLoading)
  const setUnloading = useAuthStore(s => s.setUnloading)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading()
        await serverFetch.get('/auth')
        login()
        setUnloading()
      } catch (err) {
        logout()
        setUnloading()
      }
    }
    fetchSession()
  }, [])
  return null
}
