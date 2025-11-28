'use client'

import { ReactNode } from 'react'
import { useRequireEmailVerification } from '../hooks/useRequireEmailVerification'

type EmailVerificationGuardProps = {
  children: ReactNode
  redirectTo?: string
  fallback?: ReactNode
}

/**
 * Componente que protege rotas exigindo verificação de email
 *
 * Se o usuário não estiver com email verificado, redireciona
 * automaticamente para a página de verificação.
 *
 * @example
 * ```tsx
 * <EmailVerificationGuard>
 *   <ProtectedContent />
 * </EmailVerificationGuard>
 * ```
 */
export function EmailVerificationGuard({
  children,
  redirectTo = '/verify-email',
  fallback,
}: EmailVerificationGuardProps) {
  const { isLoading, isVerified } = useRequireEmailVerification(redirectTo)

  // Mostra loading enquanto verifica
  if (isLoading) {
    return (
      fallback || (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Verificando...
            </p>
          </div>
        </div>
      )
    )
  }

  // Se não está verificado, o hook já redirecionou
  // Mas ainda renderiza o fallback enquanto redireciona
  if (!isVerified) {
    return (
      fallback || (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Redirecionando para verificação de email...
            </p>
          </div>
        </div>
      )
    )
  }

  // Se está verificado, renderiza o conteúdo
  return <>{children}</>
}
