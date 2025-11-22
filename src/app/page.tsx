import { UserInfo } from '@/modules/authentication/components/UserInfo'

export default async function Home() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full justify-end">
        <UserInfo />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Bem-vindo ao dashboard do sistema.
        </p>
      </div>
    </section>
  )
}
