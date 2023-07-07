import Form from '@/components/sign-up/Form'
import useUser from '@/lib/hooks/useUser'
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default function SignUp() {
  const user = useUser();

  if (user) redirect('/')

  return (
    <main className="flex min-h-screen justify-center bg-main px-6 pb-16 pt-20">
      <div className="flex w-[min(100%,_440px)] flex-col items-center">
        <img src="images/miniLogo.svg" alt="Salve!" className="mb-10" />
        <p className="mb-10 text-center font-alt text-4xl text-alternative">
          Inscreva-se grátis e comece uma nova experiência
        </p>
        <p className="mb-8 text-center text-3xl font-bold text-emphasis">
          Dados de usuário
        </p>
        <Form />
        <Link href={'/sign-in'} className="group mt-3 font-light text-emphasis">
          Já tem uma conta?{' '}
          <span className="group-hover:font-bold">Entre aqui!</span>
        </Link>
      </div>
    </main>
  )
}
