export function formatGeocoderResultToAddress(
	geocoderResult: google.maps.GeocoderResult
) {
	const { address_components: addressComponents } = geocoderResult

	const [
		streetNumber,
		route,
		sublocality,
		cityData,
		stateData,
		_country,
		zipCode,
	] = addressComponents

	const address = {
		number: streetNumber.short_name,
		street: route.short_name.split(' ').slice(1).join(' '),
		neighborhood: sublocality.short_name,
		city: cityData.short_name,
		state: stateData.short_name,
		cep: zipCode.short_name,
	}

	return address
}
