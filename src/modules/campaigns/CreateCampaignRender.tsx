import { Card } from '@/modules/common/components'
import { TitleText } from '@/modules/common/components/TitleText/TitleText'
import { CampaignForm } from './components/forms'

export const CreateCampaignRender = () => {
  return (
    <Card>
      <TitleText>Criar Nova Campanha</TitleText>
      <CampaignForm />
    </Card>
  )
}
