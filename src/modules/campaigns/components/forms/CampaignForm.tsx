'use client'

import { SelectTemplateInput } from '@/modules/campaigns/components/SelectTemplateInput'
import {
  type CreateCampaignFormInput,
  createCampaignSchema,
} from '@/modules/campaigns/components/forms/schemas'
import { useCampaignFormLogic } from '@/modules/campaigns/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type CampaignFormProps = {
  onSuccess?: (campaignId: string) => void
  onError?: (error: string) => void
}

export function CampaignForm({ onSuccess, onError }: CampaignFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCampaignFormInput>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      title: '',
      description: '',
      fakeLink: '',
      fakeMessage: '',
      awarenessPageContent: '',
      templateId: '',
    },
  })

  const handleSuccess = async (campaignId: string) => {
    await onSuccess?.(campaignId)
    router.push('/campaigns')
  }

  const { handleCreateCampaign, isLoading, serverError } = useCampaignFormLogic(
    {
      onError,
      onSuccess: handleSuccess,
    }
  )

  return (
    <form
      onSubmit={handleSubmit(handleCreateCampaign)}
      className="w-full max-w-2xl flex flex-col gap-6"
    >
      {/* Título */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Título da Campanha *
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Campanha de Phishing - Q1 2024"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Descrição
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Descreva o objetivo e contexto da campanha..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Link Fictício */}
      <div>
        <label
          htmlFor="fakeLink"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Link Fictício (URL Maliciosa Simulada) *
        </label>
        <input
          id="fakeLink"
          type="url"
          {...register('fakeLink')}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://exemplo-malicioso.com.br/phishing"
          disabled={isLoading}
        />
        {errors.fakeLink && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.fakeLink.message}
          </p>
        )}
      </div>

      {/* Mensagem Fictícia */}
      <div>
        <label
          htmlFor="fakeMessage"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Mensagem Fictícia (Texto do WhatsApp) *
        </label>
        <textarea
          id="fakeMessage"
          {...register('fakeMessage')}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Digite a mensagem que será enviada aos funcionários..."
          disabled={isLoading}
        />
        {errors.fakeMessage && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.fakeMessage.message}
          </p>
        )}
      </div>

      {/* Conteúdo da Página Educativa */}
      <div>
        <label
          htmlFor="awarenessPageContent"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
        >
          Conteúdo da Página Educativa (opcional)
        </label>
        <textarea
          id="awarenessPageContent"
          {...register('awarenessPageContent')}
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Conteúdo educacional que será exibido quando o funcionário clicar no link..."
          disabled={isLoading}
        />
        {errors.awarenessPageContent && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.awarenessPageContent.message}
          </p>
        )}
      </div>

      {/* Template */}
      <SelectTemplateInput
        label="Template (opcional)"
        error={errors.templateId?.message}
        disabled={isLoading}
        {...register('templateId')}
      />

      {/* Erro do servidor */}
      {serverError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isLoading}
          className="px-6 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Criando...' : 'Criar Campanha'}
        </button>
      </div>
    </form>
  )
}
