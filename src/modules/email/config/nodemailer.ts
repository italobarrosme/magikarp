import nodemailer from 'nodemailer'
import { safeValidateSmtpEnv } from './smtpEnvSchema'

/**
 * Configuração do cliente Nodemailer para envio de emails
 *
 * Usa validação Zod para garantir que todas as variáveis de ambiente
 * necessárias estejam configuradas corretamente.
 *
 * Requer variáveis de ambiente:
 * - SMTP_HOST: Servidor SMTP (ex: smtp.gmail.com, smtp.resend.com)
 * - SMTP_PORT: Porta SMTP (ex: 587, 465)
 * - SMTP_USER: Usuário/email para autenticação SMTP
 * - SMTP_PASS: Senha para autenticação SMTP
 * - SMTP_SECURE: true/false para SSL/TLS (opcional, padrão: false ou true se porta 465)
 *
 * Variáveis opcionais:
 * - SMTP_FROM: Email remetente (opcional)
 * - EMAIL_FROM: Email remetente alternativo (opcional)
 */
export const createTransporter = () => {
  const validation = safeValidateSmtpEnv()

  if (!validation.success) {
    const missingVars = validation.error.errors.map((err) => {
      const path = err.path.join('.')
      return `${path}: ${err.message}`
    })

    console.error(
      '[Nodemailer] ❌ Variáveis SMTP não configuradas ou inválidas:'
    )
    missingVars.forEach((msg) => {
      console.error(`[Nodemailer]   - ${msg}`)
    })
    console.error(
      '[Nodemailer] Configure as variáveis de ambiente para habilitar o envio de emails.'
    )
  } else {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } =
      validation.data
    // Porta 465 sempre requer SSL/TLS (secure: true)
    // Porta 587 usa STARTTLS (secure: false)
    // Se SMTP_SECURE estiver definido, usa o valor, senão detecta pela porta
    const secure = SMTP_SECURE !== undefined ? SMTP_SECURE : SMTP_PORT === 465

    console.info('[Nodemailer] ✅ Configuração SMTP validada com sucesso')
    console.debug('[Nodemailer] Configuração:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      user: SMTP_USER ? `${SMTP_USER.substring(0, 3)}***` : undefined,
    })

    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Opções adicionais para melhor compatibilidade com servidores SMTP
      tls: {
        // Não rejeitar certificados não autorizados (útil para desenvolvimento)
        // Em produção, deve ser true para segurança
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
      // Adiciona opções de debug em desenvolvimento
      ...(process.env.NODE_ENV === 'development' && {
        debug: true,
        logger: true,
      }),
    })
  }

  // Retorna um transporter "vazio" se a validação falhar
  // Isso permite que o código continue, mas o envio falhará com erro claro
  return nodemailer.createTransport({
    host: undefined,
    port: 587,
    secure: false,
    auth: {
      user: undefined,
      pass: undefined,
    },
  })
}

export const transporter = createTransporter()
