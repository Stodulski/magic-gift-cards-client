import './index.css'
import { AuthInitializer } from './utils/authInitializer'
import { Auth } from './features/auth/components/auth'
import { Toaster } from 'sonner'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useAuthStore } from './store/auth.'
import { Home } from './features/home/components/home'
import { Admin } from './features/admin/components/admin'

function App () {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const loading = useAuthStore(s => s.loading)
  return (
    <>
      <AuthInitializer />
      <Toaster
        closeButton
        visibleToasts={1}
        position='top-center'
        richColors
        toastOptions={{
          style: {
            padding: '2rem',
            fontSize: '20px',
            marginTop: '20%'
          }
        }}
      />
      <BrowserRouter>
        <Routes>
          {!loading && isAuthenticated ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/admin' element={<Admin />} />
            </>
          ) : (
            <Route path='/' element={<Auth />} />
      
          )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
