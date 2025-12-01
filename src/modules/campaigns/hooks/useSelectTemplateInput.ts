'use client'

import { useEffect, useState } from 'react'
import { getPhishingTemplatesAction } from '../actions'

type PhishingTemplate = {
  id: string
  name: string
  description: string | null
  type: string
}

type UseSelectTemplateInputReturn = {
  templates: PhishingTemplate[]
  isLoading: boolean
  error: string | null
}

/**
 * Hook responsável por buscar e gerenciar a lista de templates de phishing.
 *
 * Este hook faz a busca dos templates através da server action e gerencia
 * o estado de loading e erros.
 *
 * @returns {UseSelectTemplateInputReturn} Templates, estado de loading e erros
 */
export function useSelectTemplateInput(): UseSelectTemplateInputReturn {
  const [templates, setTemplates] = useState<PhishingTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTemplates() {
      setIsLoading(true)
      setError(null)

      try {
        const fetchedTemplates = await getPhishingTemplatesAction()
        setTemplates(fetchedTemplates)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro desconhecido ao buscar templates'
        setError(errorMessage)
        console.error('[useSelectTemplateInput] Erro:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return {
    templates,
    isLoading,
    error,
  }
}
