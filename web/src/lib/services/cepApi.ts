import api from './api'

export async function getCep(cep: string) {
  const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
  
  return response.data
}
