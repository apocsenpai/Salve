import validateCpf from './validateCpf'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
	profileNameMatch,
	dateMatch,
	phoneMatch,
	userNameMatch,
	emailMatch,
	passwordMatch,
	alphaNumMatch,
	numericMatch,
	cepMatch,
} from '../constants/regex'
import { AddressForm, ProfileForm, UserForm } from '../protocols/inputs'

dayjs.extend(customParseFormat)

export function checkErrorsUserForm(user: UserForm) {
	const errorsDataForm = {
		username: !userNameMatch.test(user.username),
		email: !emailMatch.test(user.email),
		password: !passwordMatch.test(user.password),
		confirmedPassword: !(user.password === user.confirmedPassword),
	}

	const errorDataFormHasTrue = Object.values(errorsDataForm).some(
		(value) => value
	)

	return {
		hasError: errorDataFormHasTrue,
		errorsDataForm: { ...errorsDataForm, category: 'user' },
	}
}

export function checkErrorsAddressForm(address: AddressForm) {
	const errorsDataForm = {
		cep: !cepMatch.test(address.cep),
		neighborhood: !alphaNumMatch.test(address.neighborhood),
		street: !alphaNumMatch.test(address.street),
		number: !numericMatch.test(address.number),
		city: !alphaNumMatch.test(address.city),
		state: !alphaNumMatch.test(address.state),
		nickname: !alphaNumMatch.test(address.state),
	}

	const errorDataFormHasTrue = Object.values(errorsDataForm).some(
		(value) => value
	)

	return {
		hasError: errorDataFormHasTrue,
		errorsDataForm: { ...errorsDataForm, category: 'address' },
	}
}

export function checkErrorsProfileForm(profile: ProfileForm) {
	const errorsDataForm = {
		fullName: !profileNameMatch.test(profile.fullName),
		cpf: !validateCpf(profile.cpf),
		birthday: !(
			dateMatch.test(profile.birthday) &&
			dayjs(profile.birthday, 'DD/MM/YYYY', true).isValid()
		),
		phoneNumber: !phoneMatch.test(profile.phoneNumber),
	}

	const errorDataFormHasTrue = Object.values(errorsDataForm).some(
		(value) => value
	)

	return {
		hasError: errorDataFormHasTrue,
		errorsDataForm: { ...errorsDataForm, category: 'profile' },
	}
}
