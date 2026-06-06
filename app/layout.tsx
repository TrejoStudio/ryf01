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
  title: 'RyF - Partes y Equipos',
  description: 'Premium natural skincare and body care products. Glow gently with Boty.',
  generator: 'v0.app',
  keywords: ['skincare', 'natural', 'organic', 'beauty', 'body care', 'cruelty-free'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
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
