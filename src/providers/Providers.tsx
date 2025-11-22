import { ButtonThemeToggle } from '@/modules/theme/components/ButtonThemeToggle'
import { ThemeProvider } from '@/modules/theme/components/ThemeProvider'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

/**
 * Componente responsável por renderizar todos os providers da aplicação.
 *
 * Centraliza a lógica de providers em um único lugar, facilitando a manutenção.
 *
 * @example
 * ```tsx
 * <Providers>
 *   <App />
 * </Providers>
 * ```
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ThemeProvider />
      <ButtonThemeToggle />
      {children}
    </>
  )
}
