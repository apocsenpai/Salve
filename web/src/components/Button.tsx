import { ButtonHTMLAttributes } from 'react'

export default function Button({
  children,
  onClick,
  type
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={onClick} type={type} className="h-12 w-full bg-emphasis text-alternative rounded font-alt text-xl hover:opacity-90 transition-all">
      {children}
    </button>
  )
}
