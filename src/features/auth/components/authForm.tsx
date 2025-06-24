import magicLogo from '../../../assets/magic_logo.webp'
import { Input } from '@/components/ui/input'
import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { login } from '../services'

export const AuthForm = () => {
  const navigate = useNavigate()
  const { handleUsername, handlePassword, sendLoginForm, password, username } =
    login()
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      await sendLoginForm(e)
      navigate('/home')
    } catch (error) {}
  }
  return (
    <form
      className='flex items-center justify-center w-full'
      onSubmit={handleSubmit}
    >
      <div className='bg-blue-700 rounded-2xl  transition-all duration-200 flex items-center justify-center w-[90%] max-w-sm flex-col p-8'>
        <img src={magicLogo} className='w-32' alt='Magic Store logo' />
        <div className='mx-auto flex w-full items-center gap-y-3 mt-8 font-semibold text-gray-500 flex-col'>
          <Input
            placeholder='Usuario'
            type='text'
            name='username'
            onChange={handleUsername}
            value={username}
            className='placeholder:text-black/70 text-black bg-white h-10'
          />
          <Input
            placeholder='Contraseña'
            type='password'
            name='password'
            onChange={handlePassword}
            value={password}
            className='placeholder:text-black/70 text-black bg-white h-10'
          />
          <Button className='w-full h-12 cursor-pointer'>Ingresar</Button>
        </div>
      </div>
    </form>
  )
}
