import {
  ButtonHTMLAttributes,
} from 'react'
import TroubleLayout from '../TroubleLayout'
import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle'

export default function AddTroubleButton({
  onClick: openModalForm,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <TroubleLayout>
      <button
        onClick={openModalForm}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg opacity-20 transition-colors duration-200 hover:bg-zinc-400"
      >
        <span className="text-5xl font-thin">
          <BsPlusCircle />
        </span>
        <span className="text-2xl font-thin">Clique para chamar um Salve!</span>
      </button>
    </TroubleLayout>
  )
}
