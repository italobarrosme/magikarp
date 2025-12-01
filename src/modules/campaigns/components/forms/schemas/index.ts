import { z } from 'zod'

/**
 * Schema de validação para o formulário de criação de campanha
 */
export const createCampaignSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres'),

  description: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional()
    .or(z.literal('')),

  fakeLink: z
    .string()
    .min(1, 'Link fictício é obrigatório')
    .url('Link fictício deve ser uma URL válida'),

  fakeMessage: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem deve ter no máximo 2000 caracteres'),

  awarenessPageContent: z
    .string()
    .max(
      5000,
      'Conteúdo da página educativa deve ter no máximo 5000 caracteres'
    )
    .optional()
    .or(z.literal('')),

  templateId: z
    .string()
    .uuid('ID do template inválido')
    .optional()
    .or(z.literal('')),
})

/**
 * Tipo inferido do schema
 */
export type CreateCampaignFormInput = z.infer<typeof createCampaignSchema>
