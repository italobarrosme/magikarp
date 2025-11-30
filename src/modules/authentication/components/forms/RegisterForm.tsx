'use client'

import {
  type RegisterFormInput,
  registerSchema,
} from '@/modules/authentication/components/forms/schemas'
import { useRegisterFormLogic } from '@/modules/authentication/hooks/useRegisterFormLogic'
import { useSendVerificationEmail } from '@/modules/authentication/hooks/useSendVerificationEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../PasswordInput'

type RegisterFormProps = {
  onSuccess?: (email?: string) => void | Promise<void>
  onError?: (error: string) => void
}

export function RegisterForm({ onError }: RegisterFormProps) {
  const router = useRouter()

  const { sendVerificationEmail } = useSendVerificationEmail({
    onError: (error) => {
      console.error(
        '[RegisterForm] Erro ao enviar email de verificação:',
        error
      )
      onError?.(error)
    },
  })

  const handleSuccess = async (email?: string) => {
    if (!email) {
      router.push('/verify-email')
      return
    }

    // O better-auth já deve ter enviado o email automaticamente após o registro,
    // mas enviamos novamente como fallback caso não tenha sido enviado
    try {
      await sendVerificationEmail(email, '/verify')
      router.push(`/verify-email?email=${encodeURIComponent(email)}`)
    } catch (error) {
      // Se falhar, ainda redireciona para a página de verificação
      // O usuário pode solicitar um novo email lá
      console.error('[RegisterForm] Erro ao enviar email:', error)
      router.push(`/verify-email?email=${encodeURIComponent(email)}`)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { handleRegister, isLoading, serverError } = useRegisterFormLogic({
    onError,
    onSuccess: handleSuccess,
  })

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="w-full max-w-md flex flex-col gap-4 mx-auto justify-center"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Nome da empresa
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome da empresa"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Email de acesso
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="seu@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <PasswordInput
          label="Senha"
          error={errors.password?.message}
          placeholder="Digite sua senha"
          {...register('password')}
        />
      </div>

      <div>
        <PasswordInput
          label="Confirmar Senha"
          error={errors.confirmPassword?.message}
          placeholder="Confirme sua senha"
          {...register('confirmPassword')}
        />
      </div>

      {serverError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  )
}
