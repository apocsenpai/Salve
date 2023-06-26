import api, { authorization } from './api'

export async function getMessagesByChatId(chatId: number, token: string) {
  const response = await api.get(
    `/chats/${chatId}/messages`,
    authorization(token),
  )

  return response.data
}

export async function acceptProvider(chatId: number, token: string) {
  const response = await api.put(
    `/chats/${chatId}/accept`,
    authorization(token),
  )

  return response.data
}
