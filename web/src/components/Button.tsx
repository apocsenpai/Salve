import { ButtonHTMLAttributes } from 'react'

export default function Button({
	children,
	onClick,
	type,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			onClick={onClick}
			type={type}
			className="h-12 w-full rounded bg-emphasis font-alt text-xl text-alternative transition-all hover:opacity-90"
		>
			{children}
		</button>
	)
}
