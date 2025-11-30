import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '../../../prisma/lib/prisma'
import { emailService } from '../email'

export const auth = betterAuth({
  baseURL:
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    'http://localhost:3002',
  basePath: '/api/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        await emailService.sendResetPasswordEmail({
          to: user.email,
          resetUrl: url,
          userName: user.name || undefined,
        })

        console.info(
          `[better-auth] Email de recuperação enviado para ${user.email}`
        )
      } catch (error) {
        console.error(
          `[better-auth] Erro ao enviar email de recuperação para ${user.email}:`,
          error
        )
        // Não lança o erro para não quebrar o fluxo, apenas loga
        // O better-auth continuará o processo mesmo se o email falhar
      }
    },
    onPasswordReset: async ({ user }) => {
      console.info(`[better-auth] Senha redefinida para ${user.email}`)
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        console.info(
          `[better-auth] Tentando enviar email de verificação para ${user.email}`
        )
        console.debug(`[better-auth] URL de verificação: ${url}`)

        const response = await emailService.sendVerificationEmail({
          to: user.email,
          verificationUrl: url,
          userName: user.name || undefined,
        })

        if (response?.success) {
          console.info(
            `[better-auth] ✅ Email de verificação enviado com sucesso para ${user.email}`
          )
          console.debug(`[better-auth] Message ID: ${response.id}`)
        } else {
          console.error(
            `[better-auth] ❌ Falha ao enviar email de verificação para ${user.email}. Resposta:`,
            response
          )
        }
      } catch (error) {
        console.error(
          `[better-auth] ❌ Erro ao enviar email de verificação para ${user.email}:`,
          error
        )
        if (error instanceof Error) {
          console.error(`[better-auth] Mensagem de erro: ${error.message}`)
          console.error(`[better-auth] Stack: ${error.stack}`)
        }
        // Não lança o erro para não quebrar o fluxo, apenas loga
        // O better-auth continuará o processo mesmo se o email falhar
      }
    },
  },
})

export default auth
