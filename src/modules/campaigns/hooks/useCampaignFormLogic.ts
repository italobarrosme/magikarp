'use client'

import { useCallback, useState } from 'react'
import { createCampaignAction } from '../actions'
import type { CreateCampaignFormInput } from '../components/forms/schemas'
import type { CreateCampaignResult } from '../types'

type UseCampaignFormLogicParams = {
  onSuccess?: (campaignId: string) => void | Promise<void>
  onError?: (message: string) => void
}

type UseCampaignFormLogicReturn = {
  isLoading: boolean
  serverError: string | null
  handleCreateCampaign: (data: CreateCampaignFormInput) => Promise<void>
}

/**
 * Hook responsável por gerenciar a lógica do formulário de criação de campanha.
 *
 * Este hook faz a chamada para a server action e gerencia o estado
 * de loading e erros do formulário.
 *
 * @param {UseCampaignFormLogicParams} params - Parâmetros do hook
 * @returns {UseCampaignFormLogicReturn} Funções e estado do formulário
 */
export function useCampaignFormLogic(
  params: UseCampaignFormLogicParams = {}
): UseCampaignFormLogicReturn {
  const { onError, onSuccess } = params
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleCreateCampaign = useCallback(
    async (data: CreateCampaignFormInput) => {
      setServerError(null)
      setIsLoading(true)

      try {
        // Normaliza campos opcionais vazios para undefined
        const campaignData = {
          title: data.title.trim(),
          description: data.description?.trim() || undefined,
          fakeLink: data.fakeLink.trim(),
          fakeMessage: data.fakeMessage.trim(),
          awarenessPageContent: data.awarenessPageContent?.trim() || undefined,
          templateId: data.templateId?.trim() || undefined,
        }

        const result: CreateCampaignResult =
          await createCampaignAction(campaignData)

        if (!result.success || !result.campaign) {
          const errorMessage = result.error || 'Erro ao criar campanha'
          setServerError(errorMessage)
          onError?.(errorMessage)
          return
        }

        // Sucesso - chama callback e limpa erros
        await onSuccess?.(result.campaign.id)
        setServerError(null)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro desconhecido ao criar campanha'
        setServerError(errorMessage)
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [onError, onSuccess]
  )

  return {
    isLoading,
    serverError,
    handleCreateCampaign,
  }
}
