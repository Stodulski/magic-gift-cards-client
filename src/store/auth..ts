import { create } from 'zustand'

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
  logout: () =>
    set(() => ({
      isAuthenticated: false
    }))
}))
