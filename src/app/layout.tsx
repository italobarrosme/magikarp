import '@/styles/globals.css'

import { Providers } from '@/providers'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Sistema de Monitoramento e Treinamento de Ataques',
  description: '',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="w-full bg-primary-foreground p-4 text-text transition-colors duration-200 dark:bg-neutral-dark dark:text-neutral-white">
        <Providers>
          <main className="grid grid-cols-12 grid-flow-row gap-4 min-h-[calc(100vh-5rem)]">
            <div className="col-start-2 col-span-10 w-full h-full">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
