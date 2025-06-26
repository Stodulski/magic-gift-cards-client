import './index.css'
import { AuthInitializer } from './utils/authInitializer'
import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { PrivateRoute } from './components/privateRoute'

function App () {
  return (
    <>
      <AuthInitializer />
      <Toaster
        closeButton
        visibleToasts={3}
        position='top-center'
        richColors
        toastOptions={{
          style: {
            padding: '1.5rem 2rem',
            fontSize: '16px',
            marginTop: '20%',
            maxWidth: '672px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            textAlign: "center"
          }
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute />} />
          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
