import nodemailer from 'nodemailer'

/**
 * Configuração do cliente Nodemailer para envio de emails
 *
 * Requer variáveis de ambiente:
 * - SMTP_HOST: Servidor SMTP (ex: smtp.gmail.com, smtp.resend.com)
 * - SMTP_PORT: Porta SMTP (ex: 587, 465)
 * - SMTP_USER: Usuário/email para autenticação SMTP
 * - SMTP_PASS: Senha para autenticação SMTP
 * - SMTP_SECURE: true para SSL/TLS (opcional, padrão: false)
 *
 * Para desenvolvimento/teste, pode usar variáveis opcionais:
 * - SMTP_FROM: Email remetente (opcional)
 */
export const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  if (!host || !user || !pass) {
    console.warn(
      '[Nodemailer] Variáveis SMTP não configuradas. Emails não serão enviados.'
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })
}

export const transporter = createTransporter()
