import { ResetPasswordForm } from './components/forms/ResetPasswordForm'

export default function ResetPasswordRender() {
  return (
    <section className="w-full h-full flex flex-col gap-6 justify-center">
      <header className="space-y-2 text-left md:text-center md:max-w-md md:mx-auto">
        <h1 className="text-2xl font-bold">Redefinir Senha</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Alteração de senha para a conta de email
        </p>
      </header>

      <ResetPasswordForm />
    </section>
  )
}
