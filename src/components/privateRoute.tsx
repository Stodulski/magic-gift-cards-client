import { useAuthStore } from '../store/auth'
import { Auth } from '@/features/auth/components/auth'
import { UserRole } from '../store/auth'
import { Home } from '../features/home/components/home'
import { Admin } from '../features/admin/components/admin'
import { Dashboard } from '../features/dashboard/components/dashboard'
export function PrivateRoute () {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const role = useAuthStore(s => s.role)
  if (!isAuthenticated) return <Auth />
  switch (role) {
    case UserRole.ADMIN:
      return <Admin />
    case UserRole.DASHBOARD:
      return <Dashboard />
    case UserRole.BRANCH:
      return <Home />
    default:
      return <Auth />
  }
}
