'use client'

import { useCallback, useState } from 'react'
import { authClient } from '../auth-client'
import type { RegisterFormInput } from '../components/forms/schemas'
import { translateAuthError } from '../utils/translateAuthError'

type UseRegisterFormLogicParams = {
  onSuccess?: (email?: string) => void | Promise<void>
  onError?: (message: string) => void
}

type UseRegisterFormLogicReturn = {
  isLoading: boolean
  serverError: string | null
  handleRegister: (data: RegisterFormInput) => Promise<void>
}

export function useRegisterFormLogic(
  params: UseRegisterFormLogicParams = {}
): UseRegisterFormLogicReturn {
  const { onError, onSuccess } = params
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleRegister = useCallback(
    async (data: RegisterFormInput) => {
      setServerError(null)
      setIsLoading(true)

      try {
        const baseURL =
          process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3002'
        const callbackURL = `${baseURL}/verify`

        const result = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
          callbackURL,
        })

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Erro ao registrar usuário'
          )
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        // Passa o email para o callback de sucesso
        await onSuccess?.(data.email)
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao registrar usuário'
        )
        setServerError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess]
  )

  return {
    isLoading,
    serverError,
    handleRegister,
  }
}
