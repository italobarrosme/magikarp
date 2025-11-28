'use client'

import { useCallback, useMemo, useState } from 'react'
import { authClient } from '../auth-client'
import type { RecoveryPasswordFormInput } from '../components/forms/schemas'
import { translateAuthError } from '../utils/translateAuthError'

type UseRecoveryPasswordLogicParams = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

type UseRecoveryPasswordLogicReturn = {
  isLoading: boolean
  serverError: string | null
  successMessage: string | null
  handleRecovery: (data: RecoveryPasswordFormInput) => Promise<void>
}

const DEFAULT_SUCCESS_MESSAGE =
  'Se encontrarmos uma conta para este email, enviaremos um link para redefinir a senha.'

export function useRecoveryPasswordLogic(
  params: UseRecoveryPasswordLogicParams = {}
): UseRecoveryPasswordLogicReturn {
  const { onError, onSuccess } = params

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const redirectTo = useMemo(() => {
    const appURL = process.env.NEXT_PUBLIC_APP_URL
    return appURL ? `${appURL}/reset-password` : undefined
  }, [])

  const handleRecovery = useCallback(
    async (data: RecoveryPasswordFormInput) => {
      setServerError(null)
      setSuccessMessage(null)
      setIsLoading(true)

      try {
        const payload = {
          email: data.email,
          ...(redirectTo ? { redirectTo } : {}),
        }

        const result = await authClient.requestPasswordReset(payload)

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Não foi possível solicitar a recuperação de senha'
          )
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        setSuccessMessage(DEFAULT_SUCCESS_MESSAGE)
        onSuccess?.()
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao solicitar recuperação de senha'
        )
        setServerError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess, redirectTo]
  )

  return {
    isLoading,
    serverError,
    successMessage,
    handleRecovery,
  }
}
