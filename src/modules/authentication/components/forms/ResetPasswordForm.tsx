'use client'

import {
  type ResetPasswordFormInput,
  resetPasswordSchema,
} from '@/modules/authentication/components/forms/schemas'
import { useResetPasswordLogic } from '@/modules/authentication/hooks/useResetPasswordLogic'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../PasswordInput'

type ResetPasswordFormProps = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

export function ResetPasswordForm({
  onError,
  onSuccess,
}: ResetPasswordFormProps) {
  const { register, handleSubmit, formState } = useForm<ResetPasswordFormInput>(
    {
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    }
  )

  const { errors } = formState

  const { handleResetPassword, isLoading, serverError, successMessage, token } =
    useResetPasswordLogic({
      onError,
      onSuccess,
    })

  // Se não tiver token, mostra mensagem
  if (!token) {
    return (
      <div className="w-full max-w-md flex flex-col gap-4 mx-auto justify-center">
        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Token de recuperação não encontrado. Por favor, solicite um novo
            link de recuperação.
          </p>
        </div>
        <Link
          href="/recovery-password"
          className="text-center text-sm text-blue-600 dark:text-blue-400 underline font-medium"
        >
          Solicitar novo link de recuperação
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="w-full max-w-md flex flex-col gap-4 mx-auto justify-center"
    >
      <div className="space-y-2">
        <PasswordInput
          label="Nova Senha"
          error={errors.password?.message}
          {...register('password')}
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      <div className="space-y-2">
        <PasswordInput
          label="Confirmar Nova Senha"
          error={errors.confirmPassword?.message}
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

      {successMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            {successMessage}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
      </button>

      <div className="text-sm text-left md:text-center text-zinc-500 dark:text-zinc-400">
        Lembrou da senha?{' '}
        <Link
          href="/login"
          className="text-primary-regular underline font-medium"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  )
}
