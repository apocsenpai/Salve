import { PropsWithChildren } from 'react'

export default function TroubleLayout({ children }: PropsWithChildren) {
  return (
    <li className="mb-2 h-64 rounded-lg border border-solid shadow-[0px_0px_6px_rgba(15,80,46,0.25)]">
      {children}
    </li>
  )
}
