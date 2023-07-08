'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProgressiveDots from '../ProgressiveDots'
import Button from '@/components/Button'
import { NormalInput as Input } from '@/components/Input'
import GenderOptions from './GenderOptions'
import masks from '@/lib/utils/masks'
import { toast } from 'react-toastify'
import { createProfile } from '@/lib/services/userApi'
import formValidation from '@/lib/utils/validations/formValidation'

export default function Form({ token }: { token: string }) {
	const router = useRouter()

	const [formData, setFormData] = useState({
		fullName: '',
		cpf: '',
		birthday: '',
		phoneNumber: '',
		gender: '',
	})
	const [formErrors, setFormErrors] = useState({})

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		try {
			const validatedData = formValidation.profile(formData)

			const { token: newToken } = await createProfile(validatedData, token)

			const queryString = new URLSearchParams({
				token: newToken,
				redirect: '/sign-up/address',
			})

			toast.success('Perfil cadastrado com sucesso. Falta pouco! (2/3)')

			router.push(`/auth/cookies/token?${queryString}`)
		} catch (error: any) {
			toast.error('Alguns dados estão incorretos')
			setFormErrors(error)
		}
	}

	function handleInputOnChange(
		e: ChangeEvent<HTMLInputElement>,
		key: string | undefined = undefined
	) {
		setFormErrors({ ...formErrors, [e.target.name]: false })

		if (key)
			return setFormData({
				...formData,
				[e.target.name]: masks[key](e.target.value),
			})

		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
			<Input
				placeholder={'Digite seu nome completo'}
				name={'fullName'}
				label={'Qual é o seu nome?'}
				onChange={(e) => handleInputOnChange(e)}
				value={formData.fullName}
				error={formErrors}
				required
			/>
			<Input
				placeholder={'Digite seu CPF'}
				name={'cpf'}
				label={'Informe o seu CPF'}
				onChange={(e) => handleInputOnChange(e, 'cpf')}
				value={formData.cpf}
				error={formErrors}
				required
			/>
			<div className="flex gap-2">
				<Input
					placeholder={'dd/mm/yyyy'}
					name={'birthday'}
					label={'Quando você nasceu?'}
					onChange={(e) => handleInputOnChange(e, 'date')}
					value={formData.birthday}
					error={formErrors}
					required
				/>
				<Input
					placeholder={'(99) 99999 - 9999'}
					name={'phoneNumber'}
					label={'Digite seu telefone'}
					onChange={(e) => handleInputOnChange(e, 'phoneNumber')}
					value={formData.phoneNumber}
					error={formErrors}
					required
				/>
			</div>
			<GenderOptions
				gender={formData.gender}
				onChange={(e) => handleInputOnChange(e)}
			/>
			<ProgressiveDots stage={2} />
			<Button>Continuar a inscrição</Button>
		</form>
	)
}
