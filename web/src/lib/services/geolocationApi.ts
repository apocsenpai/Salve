import { LocationCoordinates } from '../utils/protocols/geolocation'
import { AddressForm } from '../utils/protocols/inputs'
import api from './api'

export async function getGeocoderByCoordinates(latLng: string) {
  const queryString = new URLSearchParams({
    region: 'br',
    language: 'pt-BR',
    location_type: 'ROOFTOP',
    latlng: latLng,
    result_type: 'street_address',
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  }).toString()

  const response = (
    await api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?${queryString}`,
    )
  ).data as google.maps.GeocoderResponse

  return response.results[0]
}

export async function getLatitudeAndLogitudeByAddress(address: AddressForm) {
  const queryAddress = Object.keys(address)
    .map((key: string) => address[key])
    .join('+')

  const queryString = new URLSearchParams({
    address: queryAddress,
    language: 'pt-BR',
    location_type: 'ROOFTOP',
    result_type: 'street_address',
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  }).toString()

  const response = (
    await api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?${queryString}`,
    )
  ).data.results[0].geometry.location as { lat: number; lng: number }

  return response
}
