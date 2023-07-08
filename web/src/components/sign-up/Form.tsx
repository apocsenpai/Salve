'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Button from '../Button'
import { NormalInput as Input } from '../Input'
import ProgressiveDots from './ProgressiveDots'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/services/userApi'
import formValidation from '@/lib/utils/validations/formValidation'
import { toast } from 'react-toastify'
import masks from '@/lib/utils/masks'

export default function Form() {
	const router = useRouter()

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmedPassword: '',
	})

	const [formErrors, setFormErrors] = useState({})

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		try {
			const validatedData = formValidation.user(formData)

			const { token } = await createUser(validatedData)

			const queryString = new URLSearchParams({
				token,
				redirect: '/sign-up/profile',
			})

			toast.success('Usuário cadastrado com sucesso. Falta pouco! (1/3)')

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
				placeholder={'Digite seu nome de usuário'}
				name={'username'}
				label={'Como gostaria de ser chamado?'}
				onChange={(e) => handleInputOnChange(e, 'username')}
				value={formData.username}
				error={formErrors}
				required
			/>
			<Input
				placeholder={'Digite seu email'}
				name={'email'}
				label={'Qual é o seu email?'}
				type={'email'}
				onChange={(e) => handleInputOnChange(e)}
				value={formData.email}
				error={formErrors}
				required
			/>
			<Input
				placeholder={'Digite sua senha'}
				name={'password'}
				label={'Escolha uma senha'}
				type={'password'}
				onChange={(e) => handleInputOnChange(e)}
				value={formData.password}
				error={formErrors}
				required
			/>
			<Input
				placeholder={'Digite sua senha novamente'}
				name={'confirmedPassword'}
				label={'Confirme sua senha'}
				type={'password'}
				onChange={(e) => handleInputOnChange(e)}
				value={formData.confirmedPassword}
				error={formErrors}
				required
			/>
			<ProgressiveDots stage={1} />
			<Button>Continuar a inscrição</Button>
		</form>
	)
}
