'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { authClient } from './auth-client'

/**
 * Componente para processar o token de verificação de email
 *
 * Este componente é exibido quando o usuário clica no link de verificação
 * no email. Ele processa o token e verifica o email do usuário.
 */
export default function VerifyEmailTokenRender() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'invalid'
  >('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      // O better-auth processa o token automaticamente via URL
      // Verificamos se há erro na query string
      const error = searchParams.get('error')

      if (error === 'invalid_token') {
        setStatus('invalid')
        setErrorMessage('Token inválido ou expirado')
        return
      }

      // Se não há erro, o token foi verificado com sucesso
      // O better-auth redireciona automaticamente, mas podemos verificar a sessão
      try {
        const session = await authClient.getSession()
        if (session?.data?.user?.emailVerified) {
          setStatus('success')
          // Redireciona para login após 2 segundos
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          setStatus('error')
          setErrorMessage('Falha ao verificar o email')
        }
      } catch (err) {
        setStatus('error')
        setErrorMessage(
          err instanceof Error ? err.message : 'Erro ao verificar email'
        )
      }
    }

    verifyEmail()
  }, [searchParams, router])

  if (status === 'loading') {
    return (
      <section className="w-full h-full flex flex-col gap-4 justify-center">
        <div className="w-full max-w-md mx-auto text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            Verificando seu email...
          </p>
        </div>
      </section>
    )
  }

  if (status === 'success') {
    return (
      <section className="w-full h-full flex flex-col gap-4 justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Email Verificado!</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Seu email foi verificado com sucesso. Redirecionando para o
              login...
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-700 dark:text-emerald-300 text-center">
              ✅ Verificação concluída com sucesso!
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-blue-600 dark:text-blue-400 underline"
            >
              Ir para o login
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Erro na Verificação</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Não foi possível verificar seu email
          </p>
        </div>

        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {errorMessage || 'Token inválido ou expirado'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
            O link de verificação pode ter expirado ou já foi usado.
          </p>
          <Link
            href="/verify-email"
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors text-center"
          >
            Solicitar Novo Link
          </Link>
        </div>

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
