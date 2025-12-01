import { CreateCampaignRender } from '@/modules/campaigns'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campanhas',
  description: 'Campanhas',
}

export default async function CampaignsPage() {
  return (
    <>
      <CreateCampaignRender />
    </>
  )
}
