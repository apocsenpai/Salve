const profile: ErrorsCategories = {
  fullName: 'Digite somente letras e espaços',
  cpf: 'CPF inválido',
  birthday: 'Digite uma data válida',
  phoneNumber: 'Digite um número válido',
}

const user: ErrorsCategories = {
  username: 'Digite somente letras sem espaços',
  email: 'Digite um email válido',
  password: 'Sua senha deve ter no mínimo 8 caracteres',
  confirmedPassword: 'As senhas não coincidem',
}

const address: ErrorsCategories = {
  cep: 'Digite um CEP válido!',
  neighborhood: 'Digite um bairro válido',
  street: 'Digite uma rua válida',
  number: 'Digite um número válido',
  complement: 'Digite um complemento válido',
  city: 'Digite uma cidade válida',
  state: 'Digite um estado válido',
  nickname: 'Digite um apelido válido',
}

export interface ErrorsCategories {
  [key: string]: string
}

interface Errors {
  [key: string]: ErrorsCategories
}

const ErrorMessages: Errors = { profile, user, address }

export default ErrorMessages
