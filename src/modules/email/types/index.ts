export type EmailRecipient = {
  email: string
  name?: string
}

export type SendEmailParams = {
  to: EmailRecipient | EmailRecipient[]
  subject: string
  html: string
  from?: string
}

export type SendResetPasswordEmailParams = {
  to: string
  resetUrl: string
  userName?: string
}
