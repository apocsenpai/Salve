import { PropsWithChildren } from 'react'

export interface TabParams {
	active: boolean;
	handleTabClick: () => void;
}

export default function Tab({
	children,
	active,
	handleTabClick,
}: PropsWithChildren<TabParams>) {
	return (
		<div className="flex w-[min(44%,_700px)] items-end">
			<div
				className={`h-10 w-10 rounded-full bg-main ${
					active && 'shadow-right-curve'
				}`}
			></div>
			<div
				className={`flex h-14 w-full items-center justify-center rounded-t-[40px] text-2xl font-bold ${
					active ? isSelected() : isNotSelected()
				}`}
				onClick={!active ? handleTabClick : undefined}
			>
				{children}
			</div>
			<div
				className={`h-10 w-10 rounded-full bg-main ${
					active && 'shadow-left-curve'
				}`}
			></div>
		</div>
	)
}

function isSelected() {
	return 'bg-alternative text-emphasis'
}

function isNotSelected() {
	return 'cursor-pointer text-alternative hover:text-emphasis transition-[color] duration-200'
}
