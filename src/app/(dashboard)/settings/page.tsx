import { SettingsIcon } from '@/modules/common/components'
import { LinksCards } from '@/modules/common/components/LinksCards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurações',
  description: 'Configurações',
}

const linksCards = [
  {
    label: 'Deseja alterar sua senha?',
    icon: <SettingsIcon />,
    href: '/settings/change-password',
    children: (
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Fortaleça sua segurança atualizando sua senha. Clique no botão abaixo
        para definir uma nova senha mais segura.
      </p>
    ),
  },
]

export default async function SettingsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <p className="text-sm text-gray-500">
        Bem-vindo aos configurações do sistema.
      </p>
      <LinksCards links={linksCards} />
    </section>
  )
}
