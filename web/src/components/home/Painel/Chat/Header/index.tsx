import { AiOutlineLike } from '@react-icons/all-files/ai/AiOutlineLike'
import { GiSpiderMask } from '@react-icons/all-files/gi/GiSpiderMask'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { AiOutlineTrophy } from '@react-icons/all-files/ai/AiOutlineTrophy'
import { FaHourglassHalf } from '@react-icons/all-files/fa/FaHourglassHalf'

const saveCategoriesColors = {
  Suave: 'text-green-500',
  'Da pra aguentar': 'text-yellow-500',
  Urgente: 'text-red-600',
}

export default function Header({
  profileName,
  saveDescription,
  saveCategory,
  isChatRequester,
  handleAcceptSaveClick,
  handleFinalizeModal,
  isAccepted,
  saveStatus,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <div
        className={`flex ${
          !isChatRequester
            ? 'flex-col gap-1'
            : 'w-full items-center justify-between'
        }`}
      >
        <span className="font-alt text-xl text-emphasis">{profileName}</span>
        {isChatRequester && saveStatus == 'CREATED' && (
          <button
            onClick={() => handleAcceptSaveClick()}
            className={`flex items-center gap-2 rounded-3xl bg-emphasis px-4 py-2 font-alt font-bold text-alternative ${
              isAccepted ? 'opacity-50' : 'cursor-pointer hover:opacity-80'
            }`}
            disabled={isAccepted}
          >
            {isAccepted ? 'Aguardando resposta' : 'Aceitar salvador'}
            <div className="rounded-full bg-alternative p-1 text-xl text-emphasis">
              {isAccepted ? <AiOutlineClockCircle /> : <AiOutlineLike />}
            </div>
          </button>
        )}
        {isChatRequester && saveStatus == 'IN_PROGRESS' && (
          <button
            onClick={() => handleFinalizeModal()}
            className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-emphasis px-4 py-2 font-alt font-bold text-alternative hover:opacity-80`}
          >
            Finalizar salve
            <div className="rounded-full bg-alternative p-1 text-xl text-emphasis">
              <FaHourglassHalf />
            </div>
          </button>
        )}
        {isChatRequester && saveStatus == 'COMPLETED' && (
          <button
            onClick={() => handleAcceptSaveClick()}
            className={`flex items-center gap-2 rounded-3xl bg-emphasis px-4 py-2 font-alt font-bold text-alternative ${
              isAccepted ? 'opacity-50' : 'cursor-pointer hover:opacity-80'
            }`}
            disabled={isAccepted}
          >
            {isAccepted ? 'Aguardando resposta' : 'Aceitar salvador'}
            <div className="rounded-full bg-alternative p-1 text-xl text-emphasis">
              {isAccepted ? <AiOutlineClockCircle /> : <AiOutlineLike />}
            </div>
          </button>
        )}
        {saveDescription && (
          <span className="text-sm font-thin text-emphasis">
            Está precisando de {saveDescription}
          </span>
        )}
      </div>
      {!isChatRequester && isAccepted && saveStatus == 'CREATED' && (
        <button
          onClick={() => handleAcceptSaveClick()}
          className={`flex items-center gap-2 rounded-3xl bg-emphasis px-4 py-2 font-alt font-bold text-alternative ${
            isAccepted ? 'cursor-pointer hover:opacity-80' : 'opacity-50'
          }`}
          disabled={!isAccepted}
        >
          Iniciar Salve
          <div className="rounded-full bg-alternative p-1 text-xl text-emphasis">
            <GiSpiderMask />
          </div>
        </button>
      )}
      {!isChatRequester && isAccepted && saveStatus == 'COMPLETED' && (
        <button
          onClick={() => handleAcceptSaveClick()}
          className={`flex items-center gap-2 rounded-3xl bg-emphasis px-4 py-2 font-alt font-bold text-alternative ${
            isAccepted ? 'opacity-50' : 'cursor-pointer hover:opacity-80'
          }`}
          disabled={isAccepted}
        >
          {isAccepted ? 'Aguardando resposta' : 'Aceitar salvador'}
          <div className="rounded-full bg-alternative p-1 text-xl text-emphasis">
            {isAccepted ? <AiOutlineClockCircle /> : <AiOutlineLike />}
          </div>
        </button>
      )}
      {saveCategory && (
        <span
          className={`text-right font-bold ${saveCategoriesColors[saveCategory]}`}
        >
          {saveCategory}
        </span>
      )}
    </header>
  )
}

interface ChatHeaderProps {
  profileName: string
  handleAcceptSaveClick: () => void
  handleFinalizeModal?: () => void
  saveStatus: string
  isAccepted: boolean
  saveDescription?: string
  saveCategory?: string
  isChatRequester?: boolean
}
