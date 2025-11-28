import { SubText } from '@/modules/common/components'
import { ChangePasswordRender } from '@/modules/settings/components/ChangePasswordRender'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alterar Senha',
  description: 'Configurações',
}

export default async function ChangePasswordPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Alterar Senha</h1>
      <SubText>Bem-vindo a alteração de senha do sistema.</SubText>
      <ChangePasswordRender />
    </section>
  )
}
