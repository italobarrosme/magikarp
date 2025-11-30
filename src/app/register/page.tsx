'use client'

import { RegisterForm } from '@/modules/authentication/components/forms'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />
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
    </>
  )
}
