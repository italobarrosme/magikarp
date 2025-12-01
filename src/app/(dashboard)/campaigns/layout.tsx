import { SubText, TitleText } from '@/modules/common/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campanhas',
  description: 'Campanhas',
}

type Props = {
  children: React.ReactNode
}

export default async function CampaignsLayout({ children }: Props) {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <TitleText>Campanhas</TitleText>
      <SubText>Bem-vindo aos campanhas do sistema.</SubText>
      {children}
    </section>
  )
}
