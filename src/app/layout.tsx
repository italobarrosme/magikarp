import '@/styles/globals.css'

import { NavbarAuthUser } from '@/modules/auth/components/Navbar'
import { Providers } from '@/providers'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Nezuko 3',
  description: 'Nezuko 3',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col items-center justify-center bg-primary-foreground p-4 text-text transition-colors duration-200 dark:bg-neutral-dark dark:text-neutral-white">
        <Providers>
          <NavbarAuthUser user={null} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
