import { InputHTMLAttributes } from 'react'
import { EyeIcon, EyeSlashIcon } from './Icons'
import { usePasswordInput } from './usePasswordInput'

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const PasswordInput = ({
  label,
  error,
  ...props
}: PasswordInputProps) => {
  const { showPassword, setShowPassword, type } = usePasswordInput()

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={props.id}
        type={type}
        {...props}
        className="w-full px-4 py-2 rounded-lg border placeholder:text-zinc-500/30 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-2/3 -translate-y-1/2"
      >
        {type === 'text' ? <EyeIcon /> : <EyeSlashIcon />}
      </button>
    </div>
  )
}
