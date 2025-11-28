'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { authClient } from '../auth-client'
import type { ResetPasswordFormInput } from '../components/forms/schemas'
import { translateAuthError } from '../utils/translateAuthError'

type UseResetPasswordLogicParams = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

type UseResetPasswordLogicReturn = {
  isLoading: boolean
  serverError: string | null
  successMessage: string | null
  token: string | null
  handleResetPassword: (data: ResetPasswordFormInput) => Promise<void>
}

export function useResetPasswordLogic(
  params: UseResetPasswordLogicParams = {}
): UseResetPasswordLogicReturn {
  const { onError, onSuccess } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Pega o token da URL
  const token = searchParams.get('token')

  const handleResetPassword = useCallback(
    async (data: ResetPasswordFormInput) => {
      if (!token) {
        const errorMessage = 'Token de recuperação não encontrado'
        setServerError(errorMessage)
        onError?.(errorMessage)
        return
      }

      setServerError(null)
      setSuccessMessage(null)
      setIsLoading(true)

      try {
        const result = await authClient.resetPassword({
          token,
          newPassword: data.password,
        })

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Não foi possível redefinir a senha'
          )
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        setSuccessMessage('Senha redefinida com sucesso! Redirecionando...')
        onSuccess?.()

        // Redireciona para login após 2 segundos
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao redefinir senha'
        )
        setServerError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess, token, router]
  )

  return {
    isLoading,
    serverError,
    successMessage,
    token,
    handleResetPassword,
  }
}
