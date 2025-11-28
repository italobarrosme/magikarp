'use client'

import { RegisterForm } from '@/modules/authentication/components/forms'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegisterSuccess = (email?: string) => {
    // Redireciona para a página de verificação de email
    const verifyUrl = email
      ? `/verify-email?email=${encodeURIComponent(email)}`
      : '/verify-email'
    router.push(verifyUrl)
  }

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <h1 className="text-2xl font-bold text-left md:text-center md:max-w-md md:mx-auto">
        Crie uma conta para acessar nosso painel de controle
      </h1>
      <RegisterForm onSuccess={handleRegisterSuccess} />
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
