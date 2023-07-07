import { getSaveChat, startSave } from '@/lib/services/saveApi'
import { Save } from '@/lib/utils/protocols/saves'
import { useEffect, useState } from 'react'
import Header from './Header'
import MessagesBox from './MessagesBox'
import InputBox from './InputBox'
import { Chat } from '@/lib/utils/protocols/chat'
import { toast } from 'react-toastify'

export default function Chat({
  closeChat,
  save,
  token,
  updateSaves,
}: ChatProps) {
  const [chat, setChat] = useState<Chat>()

  const [submitted, setSubmitted] = useState(false)

  const updateChatMessages = () => setSubmitted(!submitted)

  useEffect(() => {
    async function fetchChatData() {
      try {
        const { chat } = await getSaveChat(save.id, token)

        if (chat) {
          setTimeout(async () => {
            updateChatMessages()
          }, 1000)
        }

        setChat(chat)
      } catch (error) {
        console.log(error)
      }
    }

    fetchChatData()
  }, [submitted])

  async function handleStartSaveClick() {
    try {
      await startSave(save.id, token)

      updateSaves()

      toast.success('lagalaga')
    } catch (error) {
      toast.error('Não foi possível aceitar o salve!')
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center px-10 lg:px-0">
      <div
        onClick={closeChat}
        className="fixed left-0 top-0 h-screen w-full bg-black opacity-40"
      ></div>
      <div className="relative z-10 flex h-[560px] w-[min(100%,_1200px)] flex-col justify-between rounded-2xl bg-white">
        <Header
          profileName={save.requester.fullName}
          saveCategory={save.category.name}
          saveDescription={save.description}
          isChatRequester={false}
          handleAcceptSaveClick={handleStartSaveClick}
          isAccepted={chat ? chat.acceptedSave : false}
          saveStatus={save.status}
        />
        <MessagesBox
          messages={chat?.messages || []}
          destinataryName={save.requester.fullName}
        />
        <InputBox
          chatId={chat?.id || 0}
          saveId={save.id}
          token={token}
          updateChatMessages={updateChatMessages}
        />
      </div>
    </div>
  )
}

interface ChatProps {
  closeChat: () => void
  save: Save
  token: string
  updateSaves: () => void
}
