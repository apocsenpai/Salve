import { UserJwtPayload } from '@/lib/utils/protocols/resources'
import { getCookie } from 'cookies-next'
import decode from 'jwt-decode'
import Message from './Message'
import { Message as singleMessage } from '@/lib/utils/protocols/chat'

interface MessagesProps {
	messages: Array<singleMessage>;
	destinataryName: string;
}

export default function MessagesBox({
	messages,
	destinataryName,
}: MessagesProps) {
	const token = getCookie('token')?.toString() || ''

	const { profileId }: UserJwtPayload = decode(token)

	const lastMessageIndex = messages.length - 1

	return (
		<main className="scrollbar flex flex-1 flex-col gap-1 overflow-auto px-6 py-1">
			{!messages.length ? (
				<p className="flex h-full w-full items-center justify-center text-xl font-thin text-emphasis opacity-40">
					Inicie uma conversa agora mesmo :)
				</p>
			) : (
				messages.map(({ id, message, ownerId, createdAt }, index) => (
					<Message
						key={id}
						message={message}
						isCurrentUser={profileId === ownerId}
						sameUserInPreviousMessage={messages[index - 1]?.ownerId === ownerId}
						destinataryName={destinataryName}
						createdAt={createdAt}
						lastMessage={lastMessageIndex === index}
					/>
				))
			)}
		</main>
	)
}
