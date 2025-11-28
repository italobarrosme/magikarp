'use client'

import { useTheme } from '@/modules/theme/hooks/useTheme'
import type { Theme } from '@/modules/theme/types'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

/**
 * Botão fixo no canto inferior esquerdo para alternar entre dark e light mode.
 *
 * @example
 * ```tsx
 * <ButtonThemeToggle />
 * ```
 */
export function ButtonThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const fallbackTheme: Theme = 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  const resolvedTheme = mounted ? theme : fallbackTheme
  const switchIcon =
    resolvedTheme === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed cursor-pointer bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-surface p-3 text-primary shadow-lg transition-colors hover:bg-surface-hover active:bg-surface"
      aria-label={`Alternar para modo ${
        resolvedTheme === 'dark' ? 'claro' : 'escuro'
      }`}
    >
      <Icon icon={switchIcon} className="h-6 w-6" />
    </button>
  )
}
