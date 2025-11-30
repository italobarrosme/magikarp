import { transporter } from '../config/nodemailer'
import { validateSmtpEnv } from '../config/smtpEnvSchema'
import { getResetPasswordEmailTemplate } from '../templates/resetPasswordTemplate'
import { getVerificationEmailTemplate } from '../templates/verificationEmailTemplate'
import type {
  SendEmailParams,
  SendResetPasswordEmailParams,
  SendVerificationEmailParams,
} from '../types'

/**
 * Serviço de envio de emails usando Nodemailer
 *
 * Requer variáveis de ambiente:
 * - SMTP_HOST: Servidor SMTP (ex: smtp.gmail.com, smtp.resend.com)
 * - SMTP_PORT: Porta SMTP (ex: 587, 465)
 * - SMTP_USER: Usuário/email para autenticação SMTP
 * - SMTP_PASS: Senha para autenticação SMTP
 * - EMAIL_FROM: Email remetente (opcional, padrão: noreply@skyi.com.br)
 */
class EmailService {
  private readonly defaultFrom: string

  constructor() {
    this.defaultFrom =
      process.env.EMAIL_FROM ||
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      'noreply@skyi.com.br'
  }

  /**
   * Envia um email genérico
   *
   * @param params - Parâmetros do email
   * @returns Resultado do envio
   */
  async sendEmail(params: SendEmailParams) {
    try {
      // Validação de configuração SMTP usando Zod
      try {
        validateSmtpEnv()
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = `[EmailService] ❌ Configuração SMTP inválida: ${error.message}`
          console.error(errorMessage)
          throw new Error(errorMessage)
        }
        throw error
      }

      const { to, subject, html, from = this.defaultFrom } = params

      console.debug('[EmailService] Enviando email para:', to)
      console.debug(`[EmailService] Assunto: ${subject}`)
      console.debug(`[EmailService] Remetente: ${from}`)

      // Converte para array se necessário
      const recipients = Array.isArray(to) ? to : [to]

      // Formata os destinatários no formato do Nodemailer
      // Nodemailer aceita: string, array de strings, ou objeto { name, address }
      const toFormatted = recipients.map((recipient) => {
        if (recipient.name) {
          return {
            name: recipient.name,
            address: recipient.email,
          }
        }
        return recipient.email
      })

      const info = await transporter.sendMail({
        from: from,
        to: toFormatted,
        subject,
        html,
      })

      console.info(
        `[EmailService] ✅ Email enviado com sucesso. Message ID: ${info.messageId}`
      )
      console.debug('[EmailService] Resposta do servidor SMTP:', {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
      })

      return {
        success: true,
        id: info.messageId,
      }
    } catch (error) {
      console.error('[EmailService] ❌ Erro ao enviar email:', error)
      if (error instanceof Error) {
        console.error(`[EmailService] Mensagem: ${error.message}`)
        if (error.stack) {
          console.error(`[EmailService] Stack: ${error.stack}`)
        }
      }
      throw error
    }
  }

  /**
   * Envia email de recuperação de senha
   *
   * @param params - Parâmetros do email de recuperação
   * @returns Resultado do envio
   */
  async sendResetPasswordEmail(params: SendResetPasswordEmailParams) {
    const { to, resetUrl, userName } = params

    const html = getResetPasswordEmailTemplate(resetUrl, userName)

    return this.sendEmail({
      to: { email: to, name: userName },
      subject: 'Recuperação de Senha',
      html,
    })
  }

  /**
   * Envia email de verificação de email
   *
   * @param params - Parâmetros do email de verificação
   * @returns Resultado do envio
   */
  async sendVerificationEmail(params: SendVerificationEmailParams) {
    const { to, verificationUrl, userName } = params

    const html = getVerificationEmailTemplate(verificationUrl, userName)

    return this.sendEmail({
      to: { email: to, name: userName },
      subject: 'Verifique seu Email',
      html,
    })
  }
}

export const emailService = new EmailService()
