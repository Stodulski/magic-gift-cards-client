import { NavBar } from '../../../components/navBar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { redeemCode } from '../service'
import { useAuthStore } from '@/store/auth'
export const Home = () => {
  const name = useAuthStore(s=>s.name)
  const { handleCode, code, sendCode } = redeemCode()
  return (
    <main className='bg w-full h-screen'>
      <NavBar />
      <section className='w-full h-screen flex justify-center items-center '>
        <form
          className=' max-w-2xl w-[90%]  flex flex-col gap-y-1'
          onSubmit={sendCode}
        >
          <div className='w-full flex flex-col justify-center items-center'>
            <span>{name}</span>
            <h1 className='mx-auto mb-5 text-2xl'>Verificacion Magic Store</h1>
          </div>
          <div className='flex justify-center items-end flex-col sm:flex-row gap-1'>
            <input
              onChange={handleCode}
              value={code}
              name='code'
              type='text'
              required
              placeholder='Ingrese el codigo'
              className='w-full h-12  rounded-md input_home placeholder:text-white/70 text-white'
            />
          </div>
          <button className='w-full h-12 button_home  rounded-md input_home placeholder:text-white/70 text-white'>Verificar</button>
        </form>
      </section>
    </main>
  )
}
