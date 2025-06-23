import { useEffect, useState, type ChangeEvent } from 'react'
import serverFetch from '@/utils/axios'
import { toast } from 'sonner'
export const getPlaces = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const result = await serverFetch.get('/places')
        setPlaces(result.data.data.places)
      } catch (error) {
        const result = await serverFetch.get('/places')
        setPlaces(result.data.data.places)
      }
    }
    fetchPlaces()
  }, [])
  return { places }
}

export const redeemCode = () => {
  const [code, setCode] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')

  const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  const handlePlace = (e: string) => {
    setSelectedPlace(e)
  }

  const sendCode = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let toastId = toast.loading('Loading...')

    try {
      const options = {
        code: code.toLocaleLowerCase(),
        placeId: selectedPlace
      }
      if (selectedPlace === '')
        return toast.error('Seleccione sucursal.', {
          duration: 200,
          id: toastId
        })
      const result = await serverFetch.put('/codes', options)
      toast.success(result.data.data.message, {
        id: toastId,
        duration: Infinity
      })
    } catch (error: any) {
      toast.error(error.response.data.data.message, {
        duration: Infinity,
        id: toastId
      })
    }
  }
  return { sendCode, code, selectedPlace, handleCode, handlePlace }
}
