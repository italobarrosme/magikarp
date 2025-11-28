'use server'

import { getServerSession } from '../utils/getServerSession'

/**
 * Verifica se o usuário logado tem o email verificado
 *
 * @returns {Promise<{ isVerified: boolean; email?: string; error?: string }>}
 * Retorna se o email está verificado, o email do usuário ou um erro
 */
export async function checkEmailVerification() {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return {
        isVerified: false,
        error: 'Usuário não autenticado',
      }
    }

    return {
      isVerified: session.user.emailVerified || false,
      email: session.user.email,
    }
  } catch (error) {
    console.error('[checkEmailVerification] Erro ao verificar email:', error)
    return {
      isVerified: false,
      error:
        error instanceof Error
          ? error.message
          : 'Erro ao verificar status de verificação',
    }
  }
}
