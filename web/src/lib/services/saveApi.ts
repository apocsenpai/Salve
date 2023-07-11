import { LocationCoordinates } from '../utils/protocols/geolocation'
import { SaveForm } from '../utils/protocols/inputs'
import { SaveCategories } from '../utils/protocols/saves'
import api, { authorization } from './api'

export async function getSaveCategories(
	token: string
): Promise<SaveCategories> {
	const response = await api.get('/saves/categories', authorization(token))
	return response.data
}

export async function createSave(save: SaveForm, token: string) {
	const response = await api.post('/saves', { ...save }, authorization(token))
	return response.data
}

export async function getMySaves(token: string) {
	const response = await api.get('/saves/me/active', authorization(token))

	return response.data
}

export async function getSavesByCurrentLocation(
	currentLocation: LocationCoordinates,
	range: number,
	token: string
) {
	const { lat, lng } = currentLocation.position

	const queryLocation = new URLSearchParams({
		latitude: lat.toString(),
		longitude: lng.toString(),
		range: range.toString(),
	}).toString()

	const response = await api.get(
		`/saves?${queryLocation}`,
		authorization(token)
	)

	return response.data
}

export async function getSaveChat(saveId: number, token: string) {
	const response = await api.get(`/saves/${saveId}/chat`, authorization(token))

	return response.data
}

export async function getSaveChatList(saveId: number, token: string) {
	const response = await api.get(
		`/saves/${saveId}/chat/list`,
		authorization(token)
	)

	return response.data
}

export async function startSave(saveId: number, token: string) {
	const response = await api.put(
		`/saves/${saveId}/start`,
		{},
		authorization(token)
	)

	return response.data
}

export async function finishSave(
	saveId: number,
	rating: number,
	token: string
) {
	const response = await api.put(
		`/saves/${saveId}/finish`,
		{ rating },
		authorization(token)
	)

	return response.data
}
