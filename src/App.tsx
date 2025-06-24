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
        visibleToasts={1}
        position='top-center'
        richColors
        toastOptions={{
          style: {
            padding: '2rem',
            fontSize: '18px',
            marginTop: '20%',
            width: "90%",
            maxWidth: "672px"
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
