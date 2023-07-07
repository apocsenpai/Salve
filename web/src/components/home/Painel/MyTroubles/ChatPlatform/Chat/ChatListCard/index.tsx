import { ChatListItem } from '@/lib/utils/protocols/chat'

export default function ChatListCard({
  chat,
  changeActiveChat,
  isActive,
}: ChatListCardProps) {
  return (
    <div
      onClick={!isActive ? () => changeActiveChat(chat.id) : undefined}
      className={`border-b px-6 py-4 ${
        isActive
          ? 'bg-dark-main text-alternative'
          : 'cursor-pointer text-emphasis hover:bg-zinc-200'
      }`}
    >
      <p className="text-alt mb-1 text-xl font-bold">
        {chat.provider.fullName}
      </p>
      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-thin italic">
        {chat.lastMessage}
      </p>
    </div>
  )
}

interface ChatListCardProps {
  chat: ChatListItem
  changeActiveChat: (id: number) => void
  isActive: boolean
}
