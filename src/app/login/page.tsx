import { LoginForm } from '@/modules/authentication/components/forms'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acesse o sistema',
  description: 'Acesse o sistema de monitoramento e treinamento de ataques',
}

export default function LoginPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <h1 className="text-2xl font-bold text-left md:text-center">
        Faça login para continuar
      </h1>
      <LoginForm />
      <div className="flex flex-col gap-2">
        <span className="text-sm text-left md:text-center">
          Não tem uma conta?{' '}
          <Link
            href="/register"
            className="text-sm text-primary-regular underline text-left md:text-center"
          >
            Registre-se
          </Link>
        </span>
      </div>
    </section>
  )
}
