import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const UserRole = {
  ADMIN: 'ADMIN',
  DASHBOARD: 'DASHBOARD',
  BRANCH: 'BRANCH'
} as const

type UserRole = typeof UserRole[keyof typeof UserRole]

type AuthState = {
  role: UserRole | null
  userId: number | null
  name: string | null
  isAuthenticated: boolean
  login: (id: number, role: UserRole, name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      userId: null,
      role: null,
      name: null,

      login: (id: number, userRole: UserRole, name: string) => {
        set({ isAuthenticated: true })
        set({ userId: id })
        set({ role: userRole })
        set({ name: name })
      },
      logout: () => {
        set({ isAuthenticated: false })
        set({ userId: null })
        set({ role: null })
        set({ name: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        role: state.role,
        name: state.name
      })
    }
  )
)
