'use client'

import { useRouter } from 'next/navigation'
import ProgressiveDots from '../ProgressiveDots'
import Button from '@/components/Button'
import { NormalInput as Input } from '@/components/Input'
import { ChangeEvent, FormEvent, useState } from 'react'
import formValidation from '@/lib/utils/validations/formValidation'
import { toast } from 'react-toastify'
import masks from '@/lib/utils/masks'
import { getCep } from '@/lib/services/cepApi'
import { SelectInput } from './Select'
import { createAddress } from '@/lib/services/userApi'
import { getLatitudeAndLogitudeByAddress } from '@/lib/services/geolocationApi'

export default function Form({ token }: { token: string }) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    cep: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    nickname: 'home',
  })
  const [formErrors, setFormErrors] = useState({})

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const validatedData = formValidation['address'](formData)

      const { lat: latitude, lng: longitude } =
        await getLatitudeAndLogitudeByAddress(validatedData)

      const { token: newToken } = await createAddress(
        { ...validatedData, latitude, longitude },
        token,
      )

      const queryString = new URLSearchParams({
        token: newToken,
        redirect: '/',
      })

      toast.success('Finalizamos o seu cadastro! Seja bem-vinde!')

      router.push(`/auth/cookies/token?${queryString}`)
    } catch (error: any) {
      toast.error('Alguns dados estão incorretos')
      setFormErrors(error)
    }
  }

  async function handleCepChanges(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    const cepWithoutMask = value.replace('-', '')

    if (cepWithoutMask.length !== 8) return

    try {
      const newDataValues = {
        ...formData,
        [name]: value,
      }

      const cepData = await getCep(cepWithoutMask)

      if (cepData.erro) throw new Error('CEP não encontrado')

      setFormData({
        ...newDataValues,
        street: cepData.logradouro,
        city: cepData.localidade,
        neighborhood: cepData.bairro,
        state: cepData.uf,
      })
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  function handleInputOnChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string | undefined = undefined,
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
      <div className="flex gap-2">
        <Input
          placeholder={`99999-999`}
          name={'cep'}
          label={'CEP'}
          onChange={(e) => {
            handleInputOnChange(e, 'cep')
            handleCepChanges(e)
          }}
          value={formData.cep}
          error={formErrors}
          required
        />
        <Input
          placeholder={`Informe o estado`}
          name={'state'}
          label={'Estado'}
          onChange={(e) => handleInputOnChange(e)}
          value={formData.state}
          error={formErrors}
          required
        />
      </div>
      <Input
        placeholder={`Informe sua cidade`}
        name={'city'}
        label={'Cidade'}
        onChange={(e) => handleInputOnChange(e)}
        value={formData.city}
        error={formErrors}
        required
      />
      <Input
        placeholder={`Informe sua rua`}
        name={'street'}
        label={'Rua'}
        onChange={(e) => handleInputOnChange(e)}
        value={formData.street}
        error={formErrors}
        required
      />
      <div className="flex gap-2">
        <Input
          placeholder={`Digite o bairro`}
          name={'neighborhood'}
          label={'Bairro'}
          onChange={(e) => handleInputOnChange(e)}
          value={formData.neighborhood}
          error={formErrors}
          required
        />
        <Input
          placeholder={`999`}
          name={'number'}
          label={'Número'}
          onChange={(e) => handleInputOnChange(e, 'number')}
          value={formData.number}
          error={formErrors}
          required
        />
      </div>
      <Input
        placeholder={`(opicional)`}
        name={'complement'}
        label={'Complemento'}
        onChange={(e) => handleInputOnChange(e)}
        value={formData.complement}
      />
      <SelectInput
        placeholder={`Selecione o apelido do endereço`}
        name={'nickname'}
        label={'Esse endereço é de onde?'}
        onChange={(e) => handleInputOnChange(e)}
        required
      />
      {formData.nickname !== 'home' && formData.nickname !== 'work' && (
        <Input
          placeholder={`Digite o apelido desejado`}
          name={'nickname'}
          label={'Qual será o apelido?'}
          onChange={(e) => handleInputOnChange(e)}
          value={formData.nickname}
          error={formErrors}
          required
        />
      )}
      <ProgressiveDots stage={3} />
      <Button>Inscrever-se</Button>
    </form>
  )
}
