import Link from 'next/link'

type RecoveryPasswordLinkProps = {
  href: string
  children: React.ReactNode
}

export const RecoveryPasswordLink = ({
  href,
  children,
}: RecoveryPasswordLinkProps) => {
  return (
    <Link
      href={href}
      className="text-sm text-primary-regular underline text-left md:text-center"
    >
      {children}
    </Link>
  )
}
