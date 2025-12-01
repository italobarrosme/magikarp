'use server'

import { prisma } from '../../../../prisma/lib/prisma'

/**
 * Server action para buscar todos os templates de phishing disponíveis
 *
 * @returns {Promise<Array<{ id: string; name: string; description: string | null; type: string }>>}
 * Lista de templates ou array vazio se não houver templates
 */
export async function getPhishingTemplatesAction() {
  try {
    const templates = await prisma.phishingTemplate.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return templates
  } catch (error) {
    console.error(
      '[getPhishingTemplatesAction] Erro ao buscar templates:',
      error
    )

    // Retorna array vazio em caso de erro
    return []
  }
}
