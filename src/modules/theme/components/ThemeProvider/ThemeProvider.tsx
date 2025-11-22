'use client'

import { useLayoutEffect } from 'react'
import { useThemeStore } from '../../store/useThemeStore'

/**
 * Provider de tema que aplica a classe 'dark' no elemento <html>
 * e o atributo data-theme para manter consistência com o CSS.
 *
 * Este componente deve ser usado no layout raiz da aplicação.
 *
 * Usa useLayoutEffect para aplicar o tema de forma síncrona antes da pintura.
 */
export function ThemeProvider() {
  const theme = useThemeStore((state) => state.theme)

  useLayoutEffect(() => {
    const htmlElement = document.documentElement

    if (theme === 'dark') {
      htmlElement.classList.add('dark')
      htmlElement.setAttribute('data-theme', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      htmlElement.removeAttribute('data-theme')
    }
  }, [theme])

  return null
}
