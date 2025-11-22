import auth from '@/modules/authentication/auth'
import { toNextJsHandler } from 'better-auth/next-js'

// Força o uso do Node.js runtime ao invés do Edge Runtime
export const runtime = 'nodejs'

export const { GET, POST } = toNextJsHandler(auth.handler)
