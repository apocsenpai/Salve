import api, { authorization } from './api'

export interface MessageInputData {
	saveId: number;
	message: string;
}

export async function getMessagesByChatId(chatId: number, token: string) {
	const response = await api.get(
		`/chats/${chatId}/messages`,
		authorization(token)
	)

	return response.data
}

export async function acceptProvider(chatId: number, token: string) {
	const response = await api.put(
		`/chats/${chatId}/accept`,
		{},
		authorization(token)
	)

	return response.data
}

export async function sendMessage(
	chatId: number,
	body: MessageInputData,
	token: string
) {
	const response = await api.post(
		`/chats/${chatId}/message`,
		body,
		authorization(token)
	)

	return response.data
}
