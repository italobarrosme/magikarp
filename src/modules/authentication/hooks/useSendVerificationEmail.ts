'use client'

import { useCallback, useState } from 'react'
import { authClient } from '../auth-client'
import { translateAuthError } from '../utils/translateAuthError'

type UseSendVerificationEmailParams = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

type UseSendVerificationEmailReturn = {
  isLoading: boolean
  error: string | null
  sendVerificationEmail: (email: string, callbackURL?: string) => Promise<void>
}

/**
 * Hook para enviar email de verificação
 *
 * Este hook permite enviar um email de verificação para um usuário
 * usando o método do better-auth.
 *
 * @returns {UseSendVerificationEmailReturn}
 * Retorna o estado de loading, erro e a função para enviar o email
 */
export function useSendVerificationEmail(
  params: UseSendVerificationEmailParams = {}
): UseSendVerificationEmailReturn {
  const { onError, onSuccess } = params
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendVerificationEmail = useCallback(
    async (email: string, callbackURL?: string) => {
      setError(null)
      setIsLoading(true)

      try {
        const result = await authClient.sendVerificationEmail({
          email,
          callbackURL: callbackURL || '/',
        })

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Erro ao enviar email de verificação'
          )
          setError(errorMessage)
          onError?.(errorMessage)
          return
        }

        onSuccess?.()
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao enviar email de verificação'
        )
        setError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess]
  )

  return {
    isLoading,
    error,
    sendVerificationEmail,
  }
}
