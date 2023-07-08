import { getSaveCategories } from '@/lib/services/saveApi'
import { SaveCategory } from '@/lib/utils/protocols/saves'
import { getCookie } from 'cookies-next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface OptionProps {
	data: { id: number, name: string, cost: number };
	activeCategory: number;
	setActiveCategory: Dispatch<SetStateAction<number>>;
	handleSelectChange: (cost: number, categoryId: number) => void;
}

export default function Select({
	handleSelectChange,
}: {
	handleSelectChange: (cost: number, categoryId: number) => void,
}) {
	const token = getCookie('token')

	const [categories, setCategories] = useState<Array<SaveCategory>>()
	const [activeCategory, setActiveCategory] = useState(0)

	useEffect(() => {
		if (typeof token !== 'string') return

		const fetchCategories = async () => {
			const result = await getSaveCategories(token)

			setCategories(result.categories)
		}

		fetchCategories()
	}, [])

	if (!categories) return <></>

	return (
		<div className="flex w-full flex-col gap-2">
			<label htmlFor={'category'} className="text-sm font-bold text-emphasis">
				Qual dificuldade?
			</label>
			<div className="flex w-full justify-between gap-1">
				{categories.map((data) => (
					<Option
						key={data.id}
						data={data}
						setActiveCategory={setActiveCategory}
						handleSelectChange={handleSelectChange}
						activeCategory={activeCategory}
					/>
				))}
			</div>
		</div>
	)
}

function Option({
	data,
	activeCategory,
	setActiveCategory,
	handleSelectChange,
}: OptionProps) {
	const { id, name, cost } = data

	const handleOnClick = () => {
		setActiveCategory(id)
		handleSelectChange(cost, id)
	}

	return (
		<div
			onClick={!(activeCategory === id) ? handleOnClick : undefined}
			className={`flex h-10 flex-1 items-center  justify-center rounded-md font-bold ${
				activeCategory === id
					? 'bg-emphasis text-alternative'
					: 'cursor-pointer text-alternative hover:text-emphasis'
			}`}
		>
			{name}
		</div>
	)
}
