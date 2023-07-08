export default function ProgressiveDots({ stage }: { stage: number }) {
	return (
		<div className="flex justify-center gap-2">
			<div
				className={`h-2 w-2 ${
					stage === 1 ? 'bg-emphasis' : 'bg-alternative'
				} rounded`}
			></div>
			<div
				className={`h-2 w-2 ${
					stage === 2 ? 'bg-emphasis' : 'bg-alternative'
				} rounded`}
			></div>
			<div
				className={`h-2 w-2 ${
					stage === 3 ? 'bg-emphasis' : 'bg-alternative'
				} rounded`}
			></div>
		</div>
	)
}
