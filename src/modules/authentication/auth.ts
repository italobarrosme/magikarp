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
})

export default auth
