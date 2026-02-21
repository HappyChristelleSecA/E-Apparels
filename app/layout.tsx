import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Nunito } from "next/font/google"
import { CartProvider } from "@/hooks/use-cart"
import { WishlistProvider } from "@/hooks/use-wishlist"
import { Footer } from "@/components/layout/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "E-Apparels - Modern E-Commerce",
  description: "Your trusted online shopping destination",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} antialiased`}>
      <body className="font-sans">
        <ErrorBoundary>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
