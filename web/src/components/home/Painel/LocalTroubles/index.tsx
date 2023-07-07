import Troubles from '../Troubles'
import Map from './Map'
import { LocationCoordinates } from '@/lib/utils/protocols/geolocation'
import { useState } from 'react'
import { Save } from '@/lib/utils/protocols/saves'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'
import { getSavesByCurrentLocation } from '@/lib/services/saveApi'

export default function LocalTroubles() {
  const token = getCookie('token')?.toString() || ''

  const [saves, setSaves] = useState<Array<Save>>([])

  const [submitted, setSubmitted] = useState(false)

  const updateSaves = () => setSubmitted(!submitted)

  async function handleMapAddressChange(
    currentLocation: LocationCoordinates,
    range: number,
  ) {
    try {
      const { nearbySaves } = (await getSavesByCurrentLocation(
        currentLocation,
        range,
        token,
      )) as { nearbySaves: Array<Save> }

      setSaves(nearbySaves)
    } catch (error) {
      toast.error('Não foi possivel os perrengues')
    }
  }

  return (
    <div className="grid h-[calc(100%-40px)] grid-cols-2 gap-x-4">
      <Troubles title={<></>} saves={saves} updateSaves={updateSaves}>
        {!saves.length && (
          <div className="flex h-[550px] items-center justify-center opacity-40">
            <p className="w-10/12 text-center text-2xl font-thin text-emphasis">
              Nenhum perrengue no local por enquanto!
            </p>
          </div>
        )}
      </Troubles>
      <Map
        handleMapAddressChange={handleMapAddressChange}
        nearbySaves={saves}
        submitted={submitted}
      />
    </div>
  )
}
