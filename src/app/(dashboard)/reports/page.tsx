import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Relatórios',
  description: 'Relatórios',
}

export default async function ReportsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <p className="text-sm text-gray-500">
        Bem-vindo aos relatórios do sistema.
      </p>
    </section>
  )
}
