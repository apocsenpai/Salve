import api from './api'

export async function signIn(data: SignInData) {
  const response = await api.post('/auth/sign-in', data)
  return response.data
}

interface SignInData {
  login: string
  password: string
}