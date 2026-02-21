"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { SearchAutocomplete } from "@/components/products/search-autocomplete"
import { getFeaturedProducts, searchProducts } from "@/lib/products"
import type { Product } from "@/lib/products"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FaShoppingBag, FaShieldAlt, FaTruck, FaStar, FaArrowRight } from "react-icons/fa"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [productsLoaded, setProductsLoaded] = useState(false)

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts())
    setProductsLoaded(true)
  }, [])

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return featuredProducts
    }
    const searchResults = searchProducts(searchQuery)
    return searchResults.filter((product) => featuredProducts.some((fp) => fp.id === product.id))
  }, [searchQuery, featuredProducts])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium mb-4">
                New Season Collection
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">
                Style That Speaks For Itself
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                Discover curated fashion essentials with unbeatable quality and prices. From everyday basics to
                statement pieces.
              </p>

              <div className="mb-8 max-w-md mx-auto lg:mx-0">
                <div className="bg-background/10 backdrop-blur-md rounded-lg p-3 border border-primary-foreground/20">
                  <SearchAutocomplete
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder="Search for products..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/products" className="no-underline">
                    <FaShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 hidden lg:flex justify-center">
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="bg-primary-foreground/10 rounded-2xl h-48 flex items-center justify-center border border-primary-foreground/10">
                  <FaShoppingBag className="h-16 w-16 text-primary-foreground/30" />
                </div>
                <div className="bg-primary-foreground/10 rounded-2xl h-48 mt-8 flex items-center justify-center border border-primary-foreground/10">
                  <FaStar className="h-16 w-16 text-primary-foreground/30" />
                </div>
                <div className="bg-primary-foreground/10 rounded-2xl h-48 -mt-8 flex items-center justify-center border border-primary-foreground/10">
                  <FaTruck className="h-16 w-16 text-primary-foreground/30" />
                </div>
                <div className="bg-primary-foreground/10 rounded-2xl h-48 flex items-center justify-center border border-primary-foreground/10">
                  <FaShieldAlt className="h-16 w-16 text-primary-foreground/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg mb-8">Check out our most popular items</p>
          </div>

          {!productsLoaded ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded w-1/3" />
                    <div className="h-10 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery.trim() && filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No featured products found for "{searchQuery}"</p>
              <Button
                variant="outline"
                onClick={() => router.push(`/products?search=${encodeURIComponent(searchQuery)}`)}
              >
                Search all products instead
              </Button>
            </div>
          ) : (
            <>
              {searchQuery.trim() && (
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Found {filteredProducts.length} featured product{filteredProducts.length !== 1 ? "s" : ""}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                View All Products
                <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose E-Apparels?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            We deliver an experience, not just products.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaShieldAlt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Secure Shopping</h3>
                <p className="text-muted-foreground text-sm">
                  Your data and payments are protected with industry-leading security.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaTruck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Get your orders delivered quickly with our reliable shipping partners.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaStar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Quality Products</h3>
                <p className="text-muted-foreground text-sm">
                  Carefully curated products from trusted brands and sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover your next favorite product.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
