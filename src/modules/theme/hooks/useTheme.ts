import { useThemeStore } from '../store/useThemeStore'
/**
 * Hook customizado para gerenciar o tema da aplicação.
 *
 * Retorna o tema atual e funções para alterá-lo.
 *
 * @example
 * ```tsx
 * const { theme, setTheme, toggleTheme } = useTheme()
 *
 * // Alternar entre light e dark
 * toggleTheme()
 *
 * // Definir tema específico
 * setTheme('dark')
 * ```
 */
export function useTheme() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
