import { useCodes } from '../service'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export const Dashboard = () => {
  const { codes, lastCodeRef } = useCodes()
  const isLast = codes[codes.length - 1]
  return (
    <section className='w-full border-t pt-15 gap-5 flex flex-col mb-10 justify-center items-center '>
      <h1 className='text-2xl font-bold'>
        {codes.length > 0 ? 'Lista de codigos' : 'No hay codigos'}
      </h1>
      <Accordion type='single' collapsible className='gap-2 flex flex-col'>
        {codes.length > 0 &&
          codes.map(code => (
            <AccordionItem
              key={code.id}
              ref={isLast ? lastCodeRef : null}
              value={code.code}
              className='w-[90vw] bg-zinc-900 px-10 rounded-md  max-w-2xl text-white'
            >
              <AccordionTrigger className='w-full  cursor-pointer'>
                {code.code} - Usado: {code.used ? `SI - ${code.usedAt}` : 'NO'}
              </AccordionTrigger>
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
                <span className='font-bold'>Franquicia: </span>
                {code.Place?.name ? code.Place?.name : '-'}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </section>
  )
}
