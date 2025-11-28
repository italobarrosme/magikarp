import Link from 'next/link'
import { HorizontalCard } from '../HorizontalCard'

type LinkCard = {
  label: string
  href?: string
  icon: React.ReactNode
  children: React.ReactNode
}

type LinksCardsProps = {
  links: LinkCard[]
}

export const LinksCards = ({ links }: LinksCardsProps) => {
  return (
    <HorizontalCard>
      {links.map((link) => (
        <Link
          href={link.href ?? '#'}
          key={link.label}
          className="flex flex-row gap-4 items-center justify-between w-full rounded-lg"
        >
          {link.icon}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm">{link.label}</span>
            {link.children}
          </div>
        </Link>
      ))}
    </HorizontalCard>
  )
}
