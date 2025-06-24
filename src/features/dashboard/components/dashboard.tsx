import { useCodes } from '../services'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { NavBar } from '@/components/navBar'

export const Dashboard = () => {
  const { codes, lastCodeRef, loading } = useCodes()
  const isLast = codes[codes.length - 1]
  return (
    <>
      <NavBar />
      <main className='w-full pt-32 items-center flex flex-col '>
        <h1 className='text-xl w-[90vw] mb-0.25 bg-zinc-900 text-white px-10 py-3 max-w-2xl font-semibold'>
          {loading
            ? 'Cargando...'
            : codes.length > 0
            ? 'Lista de codigos'
            : 'No hay codigos'}
        </h1>
        <Accordion type='single' collapsible className=' flex flex-col'>
          {codes.length > 0 &&
            codes.map(code => (
              <AccordionItem
                key={code.id}
                ref={isLast ? lastCodeRef : null}
                value={code.code}
                className='w-[90vw] bg-zinc-900 px-10 max-w-2xl text-white'
              >
                <AccordionTrigger className='w-full cursor-pointer font-normal'>
                  {code.code.toLocaleUpperCase()} -
                  {code.used
                    ? ` USADO EN ${code.User?.name.toLocaleUpperCase()}`
                    : ' NO USADO'}
                </AccordionTrigger>
                <AccordionContent>
                  <span className='font-bold'>Pedido: </span>
                  {code.webId ? code.webId : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'>Nombre: </span>
                  {code.name ? code.name : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'> Email: </span>
                  {code.email ? code.email : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'>Telefono: </span>
                  {code.phone ? code.phone : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'>Localidad: </span>
                  {code.locality ? code.locality : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'>Provincia: </span>{' '}
                  {code.province ? code.province : '-'}
                </AccordionContent>
                <AccordionContent>
                  <span className='font-bold'>Fecha de uso: </span>
                  {code.usedAt ? code.usedAt : '-'}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </main>
    </>
  )
}
