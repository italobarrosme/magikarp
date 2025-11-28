/**
 * Template HTML para email de recuperação de senha
 *
 * @param resetUrl - URL para redefinir a senha
 * @param userName - Nome do usuário (opcional)
 * @returns HTML formatado do email
 */
export function getResetPasswordEmailTemplate(
  resetUrl: string,
  userName?: string
): string {
  const greeting = userName ? `Olá, ${userName}!` : 'Olá!'

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperação de Senha</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #ffffff; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                Recuperação de Senha
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 16px; line-height: 1.5;">
                ${greeting}
              </p>
              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.5;">
                Recebemos uma solicitação para redefinir a senha da sua conta. 
                Clique no botão abaixo para criar uma nova senha:
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
                <tr>
                  <td align="center" style="padding: 0;">
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Redefinir Senha
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link -->
              <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px; line-height: 1.5;">
                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
              </p>
              <p style="margin: 0 0 24px; color: #2563eb; font-size: 14px; word-break: break-all; line-height: 1.5;">
                ${resetUrl}
              </p>
              
              <!-- Security Notice -->
              <div style="padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  <strong>⚠️ Importante:</strong> Este link expira em 1 hora. 
                  Se você não solicitou a recuperação de senha, ignore este email.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                Este é um email automático, por favor não responda.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                © ${new Date().getFullYear()} - Todos os direitos reservados
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
