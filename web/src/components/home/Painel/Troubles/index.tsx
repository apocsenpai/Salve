import { PropsWithChildren, ReactNode, Ref } from 'react'
import TroubleCard from './TroubleCard'
import { Save } from '@/lib/utils/protocols/saves'

export default function Troubles({
  children,
  title,
  saves,
  troubleRef,
  updateSaves,
}: PropsWithChildren<TroublesProps>) {
  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-emphasis">
        {title}
      </h2>
      <div className="flex w-full justify-center">
        <ul
          className="scrollbar h-[550px] w-[min(100%,_541px)] overflow-auto"
          ref={troubleRef}
        >
          {saves.map((s, index) => (
            <TroubleCard key={s.id} save={s} updateSaves={updateSaves} />
          ))}
          {children}
        </ul>
      </div>
    </div>
  )
}

interface TroublesProps {
  title: ReactNode
  saves: Array<Save>
  troubleRef?: Ref<HTMLUListElement>
  updateSaves: () => void
}
