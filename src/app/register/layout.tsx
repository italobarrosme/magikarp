import { Metadata } from 'next'

type RegisterLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Registre-se no sistema',
  description:
    'Crie uma conta para acessar o sistema de monitoramento e treinamento de ataques',
}

export default async function RegisterLayout({
  children,
}: RegisterLayoutProps) {
  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center">
      <h1 className="text-2xl font-bold text-left md:text-center md:max-w-md md:mx-auto">
        Crie uma conta para acessar nosso painel de controle
      </h1>
      {children}
    </section>
  )
}
