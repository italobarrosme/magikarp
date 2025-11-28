'use client'

import {
  type ChangePasswordFormInput,
  changePasswordSchema,
} from '@/modules/authentication/components/forms/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useChangePassword } from '../hooks/useChangePassword'

type ChangePasswordFormProps = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

/**
 * Componente presentational para o formulário de alteração de senha
 *
 * Este componente renderiza apenas a interface do formulário,
 * delegando a lógica de negócio para o hook useChangePassword.
 *
 * @example
 * ```tsx
 * <ChangePasswordForm
 *   onSuccess={() => console.log('Senha alterada!')}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 */
export function ChangePasswordForm({
  onError,
  onSuccess,
}: ChangePasswordFormProps) {
  const { register, handleSubmit, formState, reset } =
    useForm<ChangePasswordFormInput>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    })

  const { errors } = formState

  const { handleChangePassword, isLoading, serverError, successMessage } =
    useChangePassword({
      onError,
      onSuccess: () => {
        reset() // Limpa o formulário após sucesso
        onSuccess?.()
      },
    })

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="w-full flex flex-col gap-4"
    >
      <div className="space-y-2">
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Senha Atual
        </label>
        <input
          id="currentPassword"
          type="password"
          {...register('currentPassword')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite sua senha atual"
          disabled={isLoading}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Nova Senha
        </label>
        <input
          id="newPassword"
          type="password"
          {...register('newPassword')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mínimo 8 caracteres"
          disabled={isLoading}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Confirmar Nova Senha
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          {...register('confirmNewPassword')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a nova senha novamente"
          disabled={isLoading}
        />
        {errors.confirmNewPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.confirmNewPassword.message}
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
        {isLoading ? 'Alterando...' : 'Alterar Senha'}
      </button>
    </form>
  )
}
