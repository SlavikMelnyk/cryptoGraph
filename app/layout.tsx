import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crypto Chart',
  description: 'Bitcoin and Solana price chart',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

