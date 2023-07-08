import { PropsWithChildren, useState } from 'react'
import TroubleLayout from '../TroubleLayout'
import { Save } from '@/lib/utils/protocols/saves'
import {
	formatAddressToString,
	getOfferingName,
	getRequesterName,
	getSaveStatus,
} from '@/lib/utils/helpers/saves'
import Chat from '../../Chat'
import { HiOutlineChatAlt2 } from '@react-icons/all-files/hi/HiOutlineChatAlt2'
import { getCookie } from 'cookies-next'
import decode from 'jwt-decode'
import { UserJwtPayload } from '@/lib/utils/protocols/resources'
import ChatPlatform from '../../MyTroubles/ChatPlatform'

interface TroubleProps {
	save: Save;
	updateSaves: () => void;
}

export default function TroubleCard({
	save,
	updateSaves,
}: PropsWithChildren<TroubleProps>) {
	const [chatVisible, setChatVisible] = useState(false)

	const token = getCookie('token')?.toString() || ''

	const { profileId }: UserJwtPayload = decode(token)

	const saveCategoriesColors = {
		Suave: 'text-green-500',
		'Da pra aguentar': 'text-yellow-500',
		Urgente: 'text-red-600',
	}

	const toggleChatVisible = () => setChatVisible(!chatVisible)

	return (
		<>
			<TroubleLayout>
				<div
					className="group relative flex h-full w-full cursor-pointer flex-col items-start justify-between rounded-lg p-5 hover:bg-zinc-200"
					onClick={toggleChatVisible}
				>
					<h3 className="font-alt text-2xl font-bold text-emphasis">
						{save.description}
					</h3>
					<span
						className={`absolute right-2 top-2 font-bold ${
							saveCategoriesColors[save.category.name]
						}`}
					>
						{save.category.name}
					</span>
					<div className="flex w-full flex-wrap justify-between gap-2">
						<span className="font-sans text-base text-emphasis">
							<span className="font-bold">Solicitante: </span>
							<span className="font-light">
								{getRequesterName(save, profileId)}
							</span>
						</span>
						<span className="font-sans text-base text-emphasis">
							<span className="font-bold">Salvador: </span>
							<span className="font-light">
								{getOfferingName(save, profileId)}
							</span>
						</span>
					</div>
					<div className="w-full">
						<span className="font-sans text-base text-emphasis">
							<span className="font-bold">Endereço: </span>
							<span className="font-light">{formatAddressToString(save)}</span>
						</span>
					</div>
					<div className="flex w-full items-center justify-between">
						<span className="font-sans text-base text-emphasis">
							<span className="font-bold">Status: </span>
							<span className="font-light">{getSaveStatus(save)}</span>
						</span>
						<span
							className="cursor-pointer text-xl text-emphasis group-hover:text-dark-main"
							onClick={toggleChatVisible}
						>
							<HiOutlineChatAlt2 />
						</span>
					</div>
				</div>
			</TroubleLayout>
			{chatVisible && save.requester.id !== profileId && (
				<Chat
					save={save}
					closeChat={toggleChatVisible}
					token={token}
					updateSaves={updateSaves}
				/>
			)}
			{chatVisible && save.requester.id === profileId && (
				<ChatPlatform
					save={save}
					closeChat={toggleChatVisible}
					token={token}
					updateSaves={updateSaves}
				/>
			)}
		</>
	)
}
