/**
 * Tipos do módulo de campanhas
 */

import type { Campaign, PhishingTemplate } from '@prisma/client'

/**
 * Tipo para criação de campanha (input do formulário)
 */
export type CreateCampaignInput = {
  title: string
  description?: string
  fakeLink: string
  fakeMessage: string
  awarenessPageContent?: string
  templateId?: string
}

/**
 * Tipo para resposta da criação de campanha
 */
export type CreateCampaignResult = {
  success: boolean
  campaign?: Campaign
  error?: string
}

/**
 * Tipo para campanha com relacionamentos
 */
export type CampaignWithRelations = Campaign & {
  template?: PhishingTemplate | null
}
