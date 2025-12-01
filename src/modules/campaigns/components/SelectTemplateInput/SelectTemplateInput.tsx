'use client'

import { useSelectTemplateInput } from '@/modules/campaigns/hooks'
import { SelectInput } from '@/modules/common/components'
import type { SelectHTMLAttributes } from 'react'

type SelectTemplateInputProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> & {
  label?: string
  error?: string
}

/**
 * Componente SelectTemplateInput para seleção de templates de phishing
 *
 * Este componente busca automaticamente os templates disponíveis
 * e exibe em um select para o usuário escolher.
 */
export function SelectTemplateInput({
  label = 'Template (opcional)',
  error,
  disabled,
  ...props
}: SelectTemplateInputProps) {
  const { templates, isLoading } = useSelectTemplateInput()

  // Transforma templates em opções para o SelectInput
  const options =
    templates.map((template) => ({
      value: template.id,
      label: template.description
        ? `${template.name} - ${template.description}`
        : template.name,
    })) || []

  // Se estiver carregando ou não houver templates, mostra placeholder apropriado
  const placeholder =
    isLoading || templates.length === 0
      ? 'Nenhum template disponível'
      : 'Selecione um template (opcional)'

  return (
    <SelectInput
      label={label}
      error={error}
      options={options}
      placeholder={placeholder}
      disabled={disabled || isLoading || templates.length === 0}
      {...props}
    />
  )
}
