import { Save } from '@/lib/utils/protocols/saves'
import { useEffect, useState } from 'react'
import { getSaveChatList } from '@/lib/services/saveApi'
import { ChatListItem } from '@/lib/utils/protocols/chat'
import Chat from './Chat'
import ChatListCard from './Chat/ChatListCard'

const saveCategoriesColors = {
  Suave: 'text-green-500',
  'Da pra aguentar': 'text-yellow-500',
  Urgente: 'text-red-600',
}

export default function ChatPlatform({
  save,
  closeChat,
  token,
}: ChatPlatformProps) {
  const [chatList, setChatList] = useState<Array<ChatListItem>>([])

  const [currentChatId, setCurrentChatId] = useState(0)

  const updateChatMessages = () => setSubmitted(!submitted)

  const [submitted, setSubmitted] = useState(false)

  const changeActiveChat = (id: number) => setCurrentChatId(id)

  useEffect(() => {
    async function fetchChatList() {
      try {
        const { chatList } = await getSaveChatList(save.id, token)

        if (!currentChatId) setCurrentChatId(chatList[0]?.id || currentChatId)

        setChatList(chatList)

        setTimeout(async () => {
          updateChatMessages()
        }, 1000)

      } catch (error) {
        console.log(error)
      }
    }

    fetchChatList()
  }, [submitted])

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center px-10 lg:px-0">
      <div
        onClick={closeChat}
        className="fixed left-0 top-0 h-screen w-full bg-black opacity-40"
      ></div>
      <div className="relative z-10 grid h-[560px] w-[min(100%,_1200px)] grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] justify-between rounded-2xl bg-alternative">
        <div className="flex flex-col border-r">
          <div className="border-b px-4 py-2 font-bold">
            <p className="mb-1 font-alt text-2xl text-emphasis">
              {save.description}
            </p>
            <p className={`${saveCategoriesColors[save.category.name]}`}>
              {save.category.name}
            </p>
          </div>
          <ul className="scrollbar h-5/6 overflow-auto">
            {chatList.map((chat, index) => (
              <ChatListCard
                key={chat.id}
                chat={chat}
                changeActiveChat={changeActiveChat}
                isActive={currentChatId === chat.id}
              />
            ))}
          </ul>
        </div>
        <div className="flex h-[560px] flex-col justify-between">
          {currentChatId && (
            <Chat
              chatId={currentChatId}
              token={token}
              save={save}
              updateChatMessages={updateChatMessages}
              submitted={submitted}
            />
          )}
        </div>
      </div>
    </div>
  )
}

interface ChatPlatformProps {
  closeChat: () => void
  save: Save
  token: string
  updateSaves: () => void
}
