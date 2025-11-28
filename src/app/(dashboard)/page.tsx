import { SubText } from '@/modules/common/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default async function HomePage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SubText>Bem-vindo ao dashboard do sistema.</SubText>
      </div>
    </section>
  )
}
