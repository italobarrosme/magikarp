import { RegisterForm } from '@/modules/authentication/components/form'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function redirectToLogin() {
  'use server'
  redirect('/login')
}

export default function RegisterPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <h1 className="text-2xl font-bold text-left md:text-center md:max-w-md md:mx-auto">
        Crie uma conta para acessar nosso painel de controle
      </h1>
      <RegisterForm onSuccess={redirectToLogin} />
      <div className="flex flex-col gap-2">
        <span className="text-sm text-left md:text-center">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-sm text-primary-regular underline text-left md:text-center"
          >
            Faça login
          </Link>
        </span>
      </div>
    </section>
  )
}
