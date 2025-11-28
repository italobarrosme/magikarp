'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { authClient } from '../auth-client'

type UseRequireEmailVerificationReturn = {
  isLoading: boolean
  isVerified: boolean | null
  email: string | null
}

/**
 * Hook que verifica se o usuário logado tem o email verificado
 * e redireciona para a página de verificação se não estiver verificado
 *
 * @param redirectTo - URL para redirecionar se não estiver verificado (padrão: /verify-email)
 * @returns Estado de loading, verificação e email do usuário
 */
export function useRequireEmailVerification(
  redirectTo = '/verify-email'
): UseRequireEmailVerificationReturn {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const session = await authClient.getSession()

        if (!session?.data?.user) {
          // Se não está autenticado, redireciona para login
          router.push('/login')
          return
        }

        const user = session.data.user
        const verified = user.emailVerified || false

        setIsVerified(verified)
        setEmail(user.email || null)

        // Se não está verificado, redireciona para verificação
        if (!verified) {
          const verifyUrl = user.email
            ? `${redirectTo}?email=${encodeURIComponent(user.email)}`
            : redirectTo
          router.push(verifyUrl)
        }
      } catch (error) {
        console.error(
          '[useRequireEmailVerification] Erro ao verificar email:',
          error
        )
        setIsVerified(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkVerification()
  }, [router, redirectTo])

  return {
    isLoading,
    isVerified,
    email,
  }
}
