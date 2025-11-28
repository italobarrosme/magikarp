'use client'

import { authClient } from '@/modules/authentication/auth-client'
import type { ChangePasswordFormInput } from '@/modules/authentication/components/forms/schemas'
import { translateAuthError } from '@/modules/authentication/utils/translateAuthError'
import { useCallback, useState } from 'react'

type UseChangePasswordParams = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

type UseChangePasswordReturn = {
  isLoading: boolean
  serverError: string | null
  successMessage: string | null
  handleChangePassword: (data: ChangePasswordFormInput) => Promise<void>
}

/**
 * Hook para alterar a senha do usuário autenticado
 *
 * Este hook utiliza a API do better-auth para alterar a senha do usuário
 * que está atualmente logado, exigindo a senha atual para validação.
 *
 * @param {UseChangePasswordParams} params - Parâmetros opcionais
 * @param {() => void} params.onSuccess - Callback executado quando a senha é alterada com sucesso
 * @param {(message: string) => void} params.onError - Callback executado quando ocorre um erro
 *
 * @returns {UseChangePasswordReturn}
 * Retorna o estado de loading, erro, mensagem de sucesso e a função para alterar a senha
 *
 * @example
 * ```tsx
 * const { handleChangePassword, isLoading, serverError, successMessage } = useChangePassword({
 *   onSuccess: () => {
 *     console.log('Senha alterada com sucesso!')
 *   },
 *   onError: (error) => {
 *     console.error('Erro ao alterar senha:', error)
 *   }
 * })
 * ```
 */
export function useChangePassword(
  params: UseChangePasswordParams = {}
): UseChangePasswordReturn {
  const { onError, onSuccess } = params

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChangePassword = useCallback(
    async (data: ChangePasswordFormInput) => {
      setServerError(null)
      setSuccessMessage(null)
      setIsLoading(true)

      try {
        const result = await authClient.changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          revokeOtherSessions: false, // Mantém outras sessões ativas
        })

        if (result.error) {
          const errorMessage = translateAuthError(
            result.error,
            'Não foi possível alterar a senha'
          )
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        setSuccessMessage('Senha alterada com sucesso!')
        onSuccess?.()
      } catch (err) {
        const errorMessage = translateAuthError(
          err,
          'Erro desconhecido ao alterar senha'
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
    successMessage,
    handleChangePassword,
  }
}
