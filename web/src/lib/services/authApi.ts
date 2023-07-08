import api from './api'

interface SignInData {
	login: string;
	password: string;
}

export async function signIn(data: SignInData) {
	const response = await api.post('/auth/sign-in', data)
	return response.data
}
