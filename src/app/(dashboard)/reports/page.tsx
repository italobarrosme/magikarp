import { SubText } from '@/modules/common/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Relatórios',
  description: 'Relatórios',
}

export default async function ReportsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <SubText>Bem-vindo aos relatórios do sistema.</SubText>
    </section>
  )
}
