import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '../../../prisma/lib/prisma'

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
      console.info(
        `[better-auth] Reset password solicitado para ${user.email}. Link: ${url}`
      )
    },
    onPasswordReset: async ({ user }) => {
      console.info(`[better-auth] Senha redefinida para ${user.email}`)
    },
  },
})

export default auth
