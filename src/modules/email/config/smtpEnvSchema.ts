import { z } from 'zod'

/**
 * Schema de validação para variáveis de ambiente SMTP
 *
 * Valida todas as variáveis necessárias para configuração do servidor SMTP
 * usado pelo Nodemailer para envio de emails.
 *
 * Variáveis obrigatórias:
 * - SMTP_HOST: Servidor SMTP (ex: smtp.gmail.com, smtp.resend.com)
 * - SMTP_PORT: Porta SMTP (ex: 587, 465)
 * - SMTP_USER: Usuário/email para autenticação SMTP
 * - SMTP_PASS: Senha para autenticação SMTP
 *
 * Variáveis opcionais:
 * - SMTP_SECURE: true/false para SSL/TLS (padrão: false, ou true se porta for 465)
 * - SMTP_FROM: Email remetente (opcional, pode usar SMTP_USER como fallback)
 * - EMAIL_FROM: Email remetente alternativo (opcional)
 */
export const smtpEnvSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP_HOST é obrigatório'),
  SMTP_PORT: z
    .string()
    .min(1, 'SMTP_PORT é obrigatório')
    .transform((val) => Number(val))
    .pipe(z.number().int().positive().max(65535)),
  SMTP_USER: z.string().min(1, 'SMTP_USER é obrigatório'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS é obrigatório'),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === 'true')),
  SMTP_FROM: z.string().email().optional(),
  EMAIL_FROM: z.string().email().optional(),
})

/**
 * Tipo TypeScript inferido do schema
 */
export type SmtpEnv = z.infer<typeof smtpEnvSchema>

/**
 * Valida e retorna as variáveis de ambiente SMTP
 *
 * @throws {z.ZodError} Se as variáveis obrigatórias não estiverem configuradas
 * @returns Objeto com as variáveis SMTP validadas
 *
 * @example
 * ```ts
 * try {
 *   const smtpConfig = validateSmtpEnv();
 *   console.log('SMTP configurado:', smtpConfig.SMTP_HOST);
 * } catch (error) {
 *   console.error('Erro na configuração SMTP:', error);
 * }
 * ```
 */
export function validateSmtpEnv(): SmtpEnv {
  const env = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_FROM: process.env.SMTP_FROM,
    EMAIL_FROM: process.env.EMAIL_FROM,
  }

  return smtpEnvSchema.parse(env)
}

/**
 * Valida as variáveis de ambiente SMTP de forma segura (não lança erro)
 *
 * @returns Objeto com resultado da validação e dados (se válidos)
 *
 * @example
 * ```ts
 * const result = safeValidateSmtpEnv();
 * if (result.success) {
 *   console.log('SMTP configurado:', result.data.SMTP_HOST);
 * } else {
 *   console.error('Erros:', result.error.errors);
 * }
 * ```
 */
export function safeValidateSmtpEnv():
  | { success: true; data: SmtpEnv }
  | { success: false; error: z.ZodError } {
  const env = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_FROM: process.env.SMTP_FROM,
    EMAIL_FROM: process.env.EMAIL_FROM,
  }

  const result = smtpEnvSchema.safeParse(env)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, error: result.error }
}
