'use client'

import { useCallback, useState } from 'react'
import { authClient } from '../auth-client'
import type { LoginFormInput } from '../components/forms/schemas'
import { translateAuthError } from '../utils/translateAuthError'

type UseLoginFormLogicParams = {
  onSuccess?: () => void | Promise<void>
  onError?: (message: string) => void
}

type UseLoginFormLogicReturn = {
  isLoading: boolean
  serverError: string | null
  handleLogin: (data: LoginFormInput) => Promise<void>
}

export function useLoginFormLogic(
  params: UseLoginFormLogicParams = {}
): UseLoginFormLogicReturn {
  const { onError, onSuccess } = params
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleLogin = useCallback(
    async (data: LoginFormInput) => {
      setServerError(null)
      setIsLoading(true)

      try {
        const result = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        })

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Erro ao fazer login'
          )
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        await onSuccess?.()
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao fazer login'
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
    handleLogin,
  }
}
