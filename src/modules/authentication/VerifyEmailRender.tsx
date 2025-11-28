'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSendVerificationEmail } from './hooks/useSendVerificationEmail'

/**
 * Componente para exibir mensagem de verificação de email
 *
 * Este componente é exibido após o registro, informando ao usuário
 * que um email de verificação foi enviado.
 */
export default function VerifyEmailRender() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const { sendVerificationEmail, isLoading, error } = useSendVerificationEmail({
    onSuccess: () => {
      // Email reenviado com sucesso
    },
  })

  const handleResend = () => {
    if (email) {
      sendVerificationEmail(email, '/verify')
    }
  }

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Verifique seu Email</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enviamos um link de verificação para o seu email
          </p>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {email ? (
              <>
                Enviamos um email de verificação para <strong>{email}</strong>.
                Por favor, verifique sua caixa de entrada e clique no link para
                ativar sua conta.
              </>
            ) : (
              <>
                Enviamos um email de verificação. Por favor, verifique sua caixa
                de entrada e clique no link para ativar sua conta.
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {email && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
              Não recebeu o email?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Reenviando...' : 'Reenviar Email'}
            </button>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </section>
  )
}
