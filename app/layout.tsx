import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Heyama - Gestion d\'objets',
  description:
    'Application moderne de gestion et organisation d\'objets avec synchronisation temps réel',
  keywords: ['objets', 'gestion', 'organisation', 'collection'],
  authors: [{ name: 'Ulrich Zangue' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Toaster position="top-right" theme="light" />
        {children}
      </body>
    </html>
  )
}
