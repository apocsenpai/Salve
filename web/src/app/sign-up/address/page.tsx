import Form from '@/components/sign-up/address/Form'
import useUser from '@/lib/hooks/useUser'
import { redirect } from 'next/navigation'

export default function AddressSignUp() {
  const user = useUser()

  if (!user) redirect('/sign-in')

  if (user.hasAddress) redirect('/')

  if (!user.hasProfile) redirect('/sign-up/profile')

  return (
    <main className="flex min-h-screen justify-center bg-main px-6 pb-16 pt-20">
      <div className="flex w-[min(100%,_440px)] flex-col items-center">
        <img src="/images/miniLogo.svg" alt="Salve!" className="mb-10" />
        <p className="mb-10 text-center font-alt text-4xl text-alternative">
          Inscreva-se grátis e comece uma nova experiência
        </p>
        <p className="mb-8 text-center text-3xl font-bold text-emphasis">
          Dados de endereço
        </p>
        <Form token={user.token} />
      </div>
    </main>
  )
}
