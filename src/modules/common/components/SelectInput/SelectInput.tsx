'use client'

import type { SelectHTMLAttributes } from 'react'

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectInputProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> & {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

/**
 * Componente SelectInput genérico e reutilizável
 *
 * @example
 * ```tsx
 * <SelectInput
 *   label="Selecione uma opção"
 *   options={[
 *     { value: '1', label: 'Opção 1' },
 *     { value: '2', label: 'Opção 2' },
 *   ]}
 *   placeholder="Escolha uma opção"
 *   error={errors.field?.message}
 *   {...register('field')}
 * />
 * ```
 */
export function SelectInput({
  label,
  error,
  options,
  placeholder,
  id,
  name,
  disabled,
  className = '',
  ...props
}: SelectInputProps) {
  const inputId = id ?? name

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
