import { NavBar } from '@/components/navBar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCode } from '../service'

import { Dashboard } from './dashboard'
export const Admin = () => {
  const {
    sendCode,
    code,
    email,
    name,
    phone,
    province,
    locality,
    handleCode,
    handleEmail,
    handleLocality,
    handleName,
    handlePhone,
    handleProvince
  } = createCode()
  return (
    <main className=' w-full min-h-screen'>
      <NavBar />
      <section className='bg w-full h-screen flex justify-center items-center '>
        <form
          className=' max-w-2xl w-[90%]  flex flex-col gap-y-1'
          onSubmit={sendCode}
        >
          <div className='flex justify-center items-end flex-col gap-1'>
            <Input
              name='code'
              type='text'
              onChange={handleCode}
              value={code}
              required
              placeholder='Ingrese el codigo...'
              className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
            />
            <Input
              name='email'
              type='email'
              onChange={handleEmail}
              value={email}
              required
              placeholder='Ingrese email...'
              className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
            />
            <div className='flex flex-col sm:flex-row w-full gap-1'>
              <Input
                name='name'
                type='text'
                onChange={handleName}
                value={name}
                required
                placeholder='Ingrese nombre...'
                className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
              />
              <Input
                name='phone'
                type='phone'
                onChange={handlePhone}
                value={phone}
                required
                placeholder='Ingrese telefono...'
                className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
              />
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-1'>
              <Input
                name='locality'
                type='text'
                onChange={handleLocality}
                value={locality}
                required
                placeholder='Ingrese localidad...'
                className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
              />
              <Input
                name='province'
                type='text'
                onChange={handleProvince}
                value={province}
                required
                placeholder='Ingrese provincia...'
                className='w-full h-12 bg-blue-700 placeholder:text-white/70 text-white'
              />
            </div>
          </div>
          <Button className='h-10 cursor-pointer'>Crear codigo</Button>
        </form>
      </section>
      <Dashboard />
    </main>
  )
}
