import RecoveryPasswordRender from '@/modules/authentication/RecoveryPasswordRender'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar senha',
  description:
    'Recuperar senha do sistema de monitoramento e treinamento de ataques',
}

export default function RecoveryPasswordPage() {
  return <RecoveryPasswordRender />
}
