import Form from '@/components/sign-in/Form'
import useUser from '@/lib/hooks/useUser'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const user = useUser()

  if (user) redirect('/')

  return (
    <main className="grid min-h-screen grid-cols-[minmax(600px,_2fr)_minmax(300px,_1fr)] lg:grid-cols-1">
      <div className="flex flex-col items-start justify-center gap-12 bg-dark-main px-20 lg:hidden">
        <img src="images/mainLogo.svg" alt="Salve!" />
        <p className="flex flex-col gap-1 text-3xl text-alternative">
          <span>Quando imprevistos ocorrerem,</span>
          <span>tudo o que você precisa é de um Salve!</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center bg-main px-6 ">
        <div className="flex w-[min(100%,_440px)] flex-col items-center">
          <img src="images/miniLogo.svg" alt="Salve!" className="mb-10" />
          <Form />
          <Link
            href={'/sign-up'}
            className="group mt-3 font-light text-emphasis"
          >
            Primeira vez?{' '}
            <span className="group-hover:font-bold">Registre-se agora!</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
