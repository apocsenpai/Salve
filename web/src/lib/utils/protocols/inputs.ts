export interface ProfileForm {
  fullName: string
  cpf: string
  birthday: string
  phoneNumber: string
  gender: string
}

export interface UserForm {
  username: string
  email: string
  password: string
  confirmedPassword: string
}

export interface AddressForm {
  cep: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  city: string
  state: string
  nickname?: string
  latitude: number
  longitude: number
}

export interface SaveForm {
  description: string
  categoryId: number
  cost: number
  address: AddressForm
}
