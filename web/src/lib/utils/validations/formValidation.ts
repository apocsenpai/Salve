import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { AddressForm, ProfileForm, UserForm, SaveForm } from '../protocols/inputs'
import {
  checkErrorsAddressForm,
  checkErrorsProfileForm,
  checkErrorsUserForm,
} from './checkFormErrors'

dayjs.extend(customParseFormat)

function validateProfileForm(profile: ProfileForm) {
  const { hasError, errorsDataForm } = checkErrorsProfileForm(profile)

  if (hasError) throw errorsDataForm

  const validatedForm = {
    ...profile,
    birthday: dayjs(profile.birthday, 'DD/MM/YYYY', true).toDate(),
  }

  return validatedForm
}

function validateUserForm(user: UserForm) {
  const { hasError, errorsDataForm } = checkErrorsUserForm(user)

  if (hasError) throw errorsDataForm

  const validatedForm = {
    username: user.username,
    email: user.email,
    password: user.password,
  }

  return validatedForm
}

function validateAddressForm(address: AddressForm) {
  const { hasError, errorsDataForm } = checkErrorsAddressForm(address)

  if (hasError) throw errorsDataForm

  return address
}

function validateSaveForm(save: SaveForm, currentCoins: number) {

  if(!save.cost) throw new Error('Selecione o nível do perrengue!')
  
  if(save.cost > currentCoins) throw new Error('Saldo insuficiente!')


  return save;
}

export default {
  profile: validateProfileForm,
  user: validateUserForm,
  address: validateAddressForm,
  save: validateSaveForm
}
