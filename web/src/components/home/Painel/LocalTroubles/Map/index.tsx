import { formatAddressToString } from '@/lib/utils/helpers/saves'
import { LocationCoordinates } from '@/lib/utils/protocols/geolocation'
import { Save } from '@/lib/utils/protocols/saves'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import Range from '../Range'
import debounce from 'lodash/debounce'
import { toast } from 'react-toastify'

interface MapProps {
	handleMapAddressChange: (
		currentLocation: LocationCoordinates,
		range: number
	) => void;
	nearbySaves: Array<Save> | undefined;
	submitted: boolean;
}

export default function Map({
	handleMapAddressChange,
	nearbySaves,
	submitted,
}: MapProps) {
	const [coords, setCoords] = useState<LocationCoordinates>({
		position: { lat: 0, lng: 0 },
	})

	const [activeRange, setActiveRange] = useState(500)

	function handleRangeChange(range: number) {
		setActiveRange(range)

		handleChangeAddressDebounce(range)
	}

	const handleChangeAddressDebounce = debounce(
		(range: number) => handleMapAddressChange(coords, range),
		300
	)

	useEffect(() => {
		if (!coords.position.lat && !coords.position.lng) {
			navigator.geolocation.getCurrentPosition(
				async (location) => {
					const currentCoords = {
						position: {
							lat: location.coords.latitude,
							lng: location.coords.longitude,
						},
					}
					setCoords(currentCoords)

					handleMapAddressChange(currentCoords, activeRange)
				},
				(e) =>
					toast.info('Habilite a localização atual para aproveitar nosso app'),
				{
					enableHighAccuracy: true,
				}
			)
		} else {
			setTimeout(() => {
				handleMapAddressChange(coords, activeRange)
			}, 2000)
		}
	}, [submitted])

	const changeMarkerPosition = async (e: google.maps.MapMouseEvent) => {
		const { latLng } = e
		const currentLocation = latLng
			? { position: { lat: latLng.lat(), lng: latLng.lng() } }
			: coords

		setCoords(currentLocation)

		handleMapAddressChange(currentLocation, activeRange)
	}

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
	})

	if (!isLoaded || !nearbySaves) return <div>Loading...</div>

	return (
		<div className="flex flex-1 flex-col gap-4">
			<Range handleRangeChange={handleRangeChange} activeRange={activeRange} />
			<GoogleMap
				zoom={15}
				center={coords.position}
				mapContainerClassName="w-full h-full rounded-lg"
				onClick={(e) => changeMarkerPosition(e)}
			>
				{nearbySaves.map((save) => (
					<Marker
						key={save.id}
						position={{
							lat: save.address.latitude,
							lng: save.address.longitude,
						}}
						title={formatAddressToString(save)}
						icon={'/images/map-pin.png'}
					/>
				))}
				<Marker
					zIndex={10}
					position={coords.position}
					title={'Arraste para o local correto, caso precise.'}
					icon={'/images/map-pin-current.png'}
					onDragEnd={(e) => changeMarkerPosition(e)}
					draggable
				/>
			</GoogleMap>
		</div>
	)
}
