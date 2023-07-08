import api, { authorization } from './api'

interface UserData {
	username: string;
	email: string;
	password: string;
}

interface ProfileData {
	fullName: string;
	cpf: string;
	birthday: Date;
	phoneNumber: string;
	gender: string;
}

interface AddressData {
	cep: string;
	neighborhood: string;
	street: string;
	number: string;
	complement?: string;
	city: string;
	state: string;
	nickname?: string;
	latitude: number;
	longitude: number;
}

export async function createUser(data: UserData) {
	const response = await api.post('/users/sign-up', data)
	return response.data
}

export async function createProfile(data: ProfileData, token: string) {
	const response = await api.post(
		'/users/sign-up/profile',
		data,
		authorization(token)
	)
	return response.data
}

export async function createAddress(data: AddressData, token: string) {
	const response = await api.post(
		'/users/sign-up/address',
		data,
		authorization(token)
	)
	return response.data
}
