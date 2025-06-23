import { getPlaces } from '../service'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export const PlacesSection = ({
  selectedPlace,
  handlePlace
}: {
  selectedPlace: string
  handlePlace: (e: string) => void
}) => {
  const { places } = getPlaces()

  return (
    <Select onValueChange={handlePlace} required>
      <SelectTrigger className='w-full bg-blue-700 min-h-12 [&>span]:text-white [&>svg]:stroke-white text-white cursor-pointer'>
        <SelectValue placeholder='Seleccione sucursal' />
      </SelectTrigger>
      <SelectContent>
        {places.length > 0 &&
          places.map((place: { id: number; name: string }) => (
            <SelectItem
              key={place.id}
              value={place.id.toString()}
              className='cursor-pointer'
            >
              {place.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
