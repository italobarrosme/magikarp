import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Theme, ThemeState } from '../types'

const STORAGE_KEY = 'nezuko-theme'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (parsed?.state?.theme === 'light' || parsed?.state?.theme === 'dark') {
        return parsed.state.theme
      }
    } catch {
      // Ignore parse errors
    }
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setTheme: (theme: Theme) => {
        set({ theme })
      },
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        }))
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
