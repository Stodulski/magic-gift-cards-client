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
            <Input
              onChange={handleCode}
              value={code}
              name='code'
              type='text'
              required
              placeholder='Ingrese el codigo'
              className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
            />
          </div>
          <Button className='h-10 cursor-pointer'>Verificar</Button>
        </form>
      </section>
    </main>
  )
}
