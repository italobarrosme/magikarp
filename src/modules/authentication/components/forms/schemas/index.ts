import { z } from 'zod'

/**
 * Schema de validação para o formulário de login
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

/**
 * Schema de validação para o formulário de recuperação de senha
 */
export const recoveryPasswordSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
})

/**
 * Schema de validação para o formulário de registro
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

/**
 * Schema de validação para o formulário de reset de senha
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

/**
 * Schema de validação para o formulário de alteração de senha
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(1, 'Nova senha é obrigatória')
      .min(8, 'Nova senha deve ter pelo menos 8 caracteres'),
    confirmNewPassword: z
      .string()
      .min(1, 'Confirmação de nova senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As novas senhas não coincidem',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  })

/**
 * Tipos inferidos dos schemas
 */
export type LoginFormInput = z.infer<typeof loginSchema>
export type RegisterFormInput = z.infer<typeof registerSchema>
export type RecoveryPasswordFormInput = z.infer<typeof recoveryPasswordSchema>
export type ResetPasswordFormInput = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormInput = z.infer<typeof changePasswordSchema>
