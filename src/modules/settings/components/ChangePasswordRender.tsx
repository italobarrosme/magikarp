'use client'

import { ChangePasswordForm } from './ChangePasswordForm'

/**
 * Componente container para alteração de senha nas configurações
 *
 * Este componente renderiza o formulário de alteração de senha
 * diretamente no dashboard, permitindo que o usuário altere
 * sua senha fornecendo a senha atual e uma nova senha.
 *
 * @example
 * ```tsx
 * <ChangePasswordRender />
 * ```
 */
export const ChangePasswordRender = () => {
  return (
    <div className="flex flex-col gap-4 max-w-md p-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Alterar Senha
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Digite sua senha atual e escolha uma nova senha
        </p>
      </div>
      <ChangePasswordForm />
    </div>
  )
}
