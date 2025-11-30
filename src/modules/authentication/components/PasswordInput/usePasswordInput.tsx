import { useMemo, useState } from 'react'

type UsePasswordInputReturn = {
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  type: 'text' | 'password'
}

export const usePasswordInput = (): UsePasswordInputReturn => {
  const [showPassword, setShowPassword] = useState(false)

  return useMemo(
    () => ({
      showPassword,
      setShowPassword,
      type: showPassword ? 'text' : 'password',
    }),
    [showPassword]
  )
}
