'use client'

import {
  type RecoveryPasswordFormInput,
  recoveryPasswordSchema,
} from '@/modules/authentication/components/forms/schemas'
import { useRecoveryPasswordLogic } from '@/modules/authentication/hooks/useRecoveryPasswordLogic'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type RecoveryPasswordFormProps = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

export function RecoveryPasswordForm({
  onError,
  onSuccess,
}: RecoveryPasswordFormProps) {
  const { register, handleSubmit, formState } =
    useForm<RecoveryPasswordFormInput>({
      resolver: zodResolver(recoveryPasswordSchema),
      defaultValues: { email: '' },
    })

  const { errors } = formState

  const { handleRecovery, isLoading, serverError, successMessage } =
    useRecoveryPasswordLogic({
      onError,
      onSuccess,
    })

  return (
    <form
      onSubmit={handleSubmit(handleRecovery)}
      className="w-full max-w-md flex flex-col gap-4 mx-auto justify-center"
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
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
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
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
        {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
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
