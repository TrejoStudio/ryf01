import React from "react"
import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

const notoSans = Noto_Sans({ 
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700']
});

const vamo = localFont({
  src: '../public/fonts/vamo.otf',
  variable: '--font-vamo',
});

export const metadata: Metadata = {
  title: 'Boty — Natural Skincare',
  description: 'Premium natural skincare and body care products. Glow gently with Boty.',
  generator: 'v0.app',
  keywords: ['skincare', 'natural', 'organic', 'beauty', 'body care', 'cruelty-free'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${vamo.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
