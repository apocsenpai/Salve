import { Save } from '@/lib/utils/protocols/saves'
import { FormEvent, useEffect, useState } from 'react'
import Header from '../../../Chat/Header'
import MessagesBox from '../../../Chat/MessagesBox'
import InputBox from '../../../Chat/InputBox'
import { Chat } from '@/lib/utils/protocols/chat'
import { toast } from 'react-toastify'
import { acceptProvider, getMessagesByChatId } from '@/lib/services/chatApi'
import Button from '@/components/Button'
import { finishSave } from '@/lib/services/saveApi'

interface ChatProps {
	chatId: number;
	save: Save;
	token: string;
	updateChatMessages: () => void;
	submitted: boolean;
}

export default function Chat({
	chatId,
	save,
	token,
	updateChatMessages,
	submitted,
}: ChatProps) {
	const [chat, setChat] = useState<Chat>()

	const [showFinalize, setShowFinalize] = useState(false)

	const [rating, setRating] = useState(5)

	const handleFinalizeModal = () => setShowFinalize(!showFinalize)

	useEffect(() => {
		async function fetchChatData() {
			try {
				const { chat } = await getMessagesByChatId(chatId, token)

				setChat(chat)
			} catch (error) {
				console.log(error)
			}
		}

		fetchChatData()
	}, [submitted, chatId])

	async function handleAcceptProviderClick() {
		try {
			await acceptProvider(chatId, token)

			toast.success('lagalaga')
		} catch (error) {
			toast.error('Não foi possível aceitar o salve!')
		}
	}

	async function handleFinalizeSave(e: FormEvent) {
		e.preventDefault()

		try {
			await finishSave(save.id, rating, token)

			if (rating <= 3) {
				toast.success(
					'Salve foi finalizado! Esperamos que o próximo seja melhor!'
				)
			} else {
				toast.success('Finalizado com sucesso! Foi um prazer te ajudar!')
			}
		} catch (error) {
			toast.error('Não foi possível finalizar o salve')
		}
	}

	if (!chat) return <></>

	return (
		<>
			<Header
				profileName={chat.provider.fullName}
				saveStatus={save.status}
				isChatRequester={true}
				handleAcceptSaveClick={handleAcceptProviderClick}
				handleFinalizeModal={handleFinalizeModal}
				isAccepted={chat.acceptedSave}
			/>
			<MessagesBox
				messages={chat.messages}
				destinataryName={chat.provider.fullName}
			/>
			<InputBox
				chatId={chatId}
				saveId={save.id}
				token={token}
				updateChatMessages={updateChatMessages}
			/>
			{showFinalize && (
				<div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center px-10 lg:px-0">
					<div
						onClick={handleFinalizeModal}
						className="fixed left-0 top-0 h-screen w-full bg-black opacity-40"
					></div>
					<form
						onSubmit={handleFinalizeSave}
						className="relative z-10 flex h-[min(100%,_220px)] w-[min(100%,_375px)] flex-col justify-between rounded-2xl bg-main"
					>
						<div className="flex w-full flex-col gap-2 px-4 py-4">
							<h3 className="mb-2 font-alt text-3xl font-bold text-alternative">
								Conte sua experiência
							</h3>
							<label
								htmlFor={'category'}
								className="text-sm font-bold text-emphasis"
							>
								Como você avalia esse Salve?
							</label>
							<select
								className="mb-2 h-12 w-full rounded border-2 border-solid px-5 focus:outline-none"
								onChange={(e) => setRating(+e.target.value)}
								required
							>
								<option value={5}>5</option>
								<option value={4}>4</option>
								<option value={3}>3</option>
								<option value={2}>2</option>
								<option value={1}>1</option>
							</select>
							<Button>Finalizar o salve!</Button>
						</div>
					</form>
				</div>
			)}
		</>
	)
}
