'use client'

import { useRouter } from 'next/navigation'
import Button from '../Button'
import { InterativeInput as Input } from '../Input'
import { ChangeEvent, FormEvent, useState } from 'react'
import { signIn } from '@/lib/services/authApi'
import { toast } from 'react-toastify'

export default function Form() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const { token } = await signIn(formData)

      const queryString = new URLSearchParams({
        token,
        redirect: '/',
      })

      toast.success('Seja bem-vindo!')

      router.push(`/auth/cookies/token?${queryString}`)
    } catch (error: any) {
      console.log(error)
      toast.error('Email ou senha inválidos!')
    }
  }

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="w-full">
        <Input
          placeholder={`E-mail ou nome de usuário`}
          name={'login'}
          onChange={(e) => handleInputOnChange(e)}
          value={formData.login}
          required
        />
        <Input
          placeholder={`Senha`}
          type={'password'}
          name={'password'}
          onChange={(e) => handleInputOnChange(e)}
          value={formData.password}
          required
        />
        <p className=" flex items-center gap-1 ">
          <input
            type="checkbox"
            className="border-1 h-3 w-3 cursor-pointer rounded accent-emphasis"
            id="remind"
          />
          <label
            className="cursor-pointer text-xs text-emphasis"
            htmlFor="remind"
          >
            Lembrar-me
          </label>
        </p>
      </div>
      <Button>Entrar</Button>
    </form>
  )
}
