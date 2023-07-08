import LocalTroubles from './LocalTroubles'
import MyTroubles from './MyTroubles'

export default function Painel({ myTroubles }: { myTroubles: boolean }) {
	return (
		<div className="h-[calc(100%-56px)] w-full flex-col rounded-3xl bg-alternative px-10 py-10">
			{myTroubles ? <MyTroubles /> : <LocalTroubles />}
		</div>
	)
}
