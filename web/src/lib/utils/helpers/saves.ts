import { Save } from '../protocols/saves'

export function getRequesterName(save: Save, profileId: number) {
  return save.requester.id === profileId ? 'Você' : save.requester.fullName
}

export function getOfferingName(save: Save, profileId: number) {
  if (save.provider)
    return save.provider.id === profileId ? 'Você' : save.provider.fullName

  return save.status === 'CREATED' ? 'Pendente' : 'Você'
}

export function formatAddressToString(save: Save) {
  const { cep, city, complement, neighborhood, street, state, number } =
    save.address

  return `Rua ${street}, ${number} - ${neighborhood}, ${city} - ${state}, ${cep}${
    complement ? ` ( ${complement} )` : ''
  }`
}

export function getSaveStatus(save: Save) {
  switch (save.status) {
    case 'CREATED':
      return 'Aguardando o salve...'

    case 'IN_PROGRESS':
      return 'Em andamento'

    case 'COMPLETED':
      return 'Fechada'
  }
}

export const saveCategoriesColors = {
  Suave: 'text-green-500',
  'Da pra aguentar': 'text-yellow-500',
  Urgente: 'text-red-600',
}
