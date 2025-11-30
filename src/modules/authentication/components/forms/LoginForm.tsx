'use client'

import {
  type LoginFormInput,
  loginSchema,
} from '@/modules/authentication/components/forms/schemas'
import { useLoginFormLogic } from '@/modules/authentication/hooks/useLoginFormLogic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../PasswordInput'
import { RecoveryPasswordLink } from '../RecoveryPasswordLink'

type LoginFormProps = {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleLogin, isLoading, serverError } = useLoginFormLogic({
    onError,
    onSuccess: async () => {
      await onSuccess?.()
      router.push('/')
    },
  })

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="w-full max-w-md flex flex-col gap-4 mx-auto justify-center"
    >
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
          className="w-full px-4 py-2 rounded-lg placeholder:text-zinc-500/30 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          placeholder="sua senha"
          {...register('password')}
        />
        <RecoveryPasswordLink href="/recovery-password">
          <p className="text-sm text-primary-regular underline text-right mt-1">
            Esqueceu sua senha?
          </p>
        </RecoveryPasswordLink>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
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
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
