'use server'

import { getServerSession } from '@/modules/authentication/utils/getServerSession'
import { prisma } from '../../../../prisma/lib/prisma'
import type { CreateCampaignInput, CreateCampaignResult } from '../types'

/**
 * Server action para criar uma nova campanha
 *
 * Esta action manipula o Prisma para criar a campanha no banco de dados,
 * associando-a à empresa do usuário logado.
 *
 * @param {CreateCampaignInput} data - Dados da campanha a ser criada
 * @returns {Promise<CreateCampaignResult>} Resultado da criação
 */
export async function createCampaignAction(
  data: CreateCampaignInput
): Promise<CreateCampaignResult> {
  try {
    // Verifica se o usuário está autenticado
    const session = await getServerSession()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Usuário não autenticado',
      }
    }

    const userId = session.user.id

    // Valida se templateId foi fornecido e se existe
    if (data.templateId) {
      const template = await prisma.phishingTemplate.findUnique({
        where: { id: data.templateId },
      })

      if (!template) {
        return {
          success: false,
          error: 'Template não encontrado',
        }
      }
    }

    // Cria a campanha
    const campaign = await prisma.campaign.create({
      data: {
        title: data.title,
        description: data.description || null,
        fakeLink: data.fakeLink,
        fakeMessage: data.fakeMessage,
        awarenessPageContent: data.awarenessPageContent || null,
        status: 'draft',
        companyId: userId,
        createdById: userId,
        templateId: data.templateId || null,
      },
    })

    return {
      success: true,
      campaign,
    }
  } catch (error) {
    console.error('[createCampaignAction] Erro ao criar campanha:', error)

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao criar campanha',
    }
  }
}
