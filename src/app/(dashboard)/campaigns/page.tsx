import { SubText } from '@/modules/common/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campanhas',
  description: 'Campanhas',
}

export default async function CampaignsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Campanhas</h1>
      <SubText>Bem-vindo aos campanhas do sistema.</SubText>
    </section>
  )
}
