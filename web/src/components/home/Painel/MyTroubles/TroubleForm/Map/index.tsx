import { LocationCoordinates } from '@/lib/utils/protocols/geolocation'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useMemo, useState } from 'react'

export default function Map({ handleMapAddressChange, disabled }: MapProps) {
  const [coords, setCoords] = useState<LocationCoordinates>({
    position: { lat: 0, lng: 0 },
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const currentCoords = {
          position: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        }
        setCoords(currentCoords)

        handleMapAddressChange(currentCoords)
      },
      (e) => console.log(e),
      {
        enableHighAccuracy: true,
      },
    )
  }, [])

  const changeMarkerPosition = async (e: google.maps.MapMouseEvent) => {
    const { latLng } = e
    const currentLocation = latLng
      ? { position: { lat: latLng.lat(), lng: latLng.lng() } }
      : coords

    setCoords(currentLocation)

    handleMapAddressChange(currentLocation)
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="relative">
      <GoogleMap
        zoom={15}
        center={coords.position}
        mapContainerClassName="w-full h-80 rounded-lg"
        onClick={(e) => changeMarkerPosition(e)}
      >
        <Marker
          position={coords.position}
          title={'Arraste para o local correto, caso precise.'}
          icon={'/images/map-pin.png'}
          onDragEnd={(e) => changeMarkerPosition(e)}
          draggable
        />
      </GoogleMap>
      <div
        className={`absolute left-0 top-0 h-80 w-full rounded-lg bg-zinc-600 opacity-40 ${
          disabled ? '' : 'hidden'
        }`}
      ></div>
    </div>
  )
}
interface MapProps {
  handleMapAddressChange: (currentLocation: LocationCoordinates) => void
  disabled: boolean
}
