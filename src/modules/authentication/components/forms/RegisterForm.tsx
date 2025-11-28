'use client'

import {
  type RegisterFormInput,
  registerSchema,
} from '@/modules/authentication/components/forms/schemas'
import { useRegisterFormLogic } from '@/modules/authentication/hooks/useRegisterFormLogic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type RegisterFormProps = {
  onSuccess?: (email?: string) => void | Promise<void>
  onError?: (error: string) => void
}

export function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
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
    onSuccess,
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
          Nome
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Seu nome completo"
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
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mínimo 8 caracteres"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Confirmar Senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a senha novamente"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
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
