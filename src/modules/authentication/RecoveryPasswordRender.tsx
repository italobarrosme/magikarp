import { SubText } from '../common/components'
import { RecoveryPasswordForm } from './components/forms/RecoveryPasswordForm'

export default function RecoveryPasswordRender() {
  return (
    <section className="w-full h-full flex flex-col gap-6 justify-center">
      <header className="space-y-2 text-left md:text-center md:max-w-md md:mx-auto">
        <h1 className="text-2xl font-bold">Recuperar acesso à sua conta</h1>
        <SubText>
          Informe o email cadastrado e enviaremos um link para redefinir sua
          senha.
        </SubText>
      </header>

      <RecoveryPasswordForm />
    </section>
  )
}
