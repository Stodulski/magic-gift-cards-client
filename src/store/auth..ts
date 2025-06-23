import { create } from 'zustand'
import serverFetch from '../utils/axios'
type AuthState = {
  isAuthenticated: boolean
  loading: boolean
  login: () => void
  logout: () => void
  setLoading: () => void
  setUnloading: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  loading: false,

  setLoading: () =>
    set(() => ({
      loading: true
    })),
  setUnloading: () =>
    set(() => ({
      loading: false
    })),

  login: () =>
    set(() => ({
      isAuthenticated: true
    })),
  logout: async () =>
    set(() => ({
      isAuthenticated: false
    })
      await serverFetch.delete('/auth')
       )
    
}))
