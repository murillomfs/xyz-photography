import type { Metadata } from 'next'

import { AppContextProvider } from '@/contexts/app-context'

import './globals.css'

export const metadata: Metadata = {
  title: 'XYZ Photography',
  description: 'A Wild Dev Challenge'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
