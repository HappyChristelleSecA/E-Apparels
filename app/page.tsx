"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { SearchAutocomplete } from "@/components/products/search-autocomplete"
import { getFeaturedProducts, searchProducts } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { FaShoppingBag, FaShieldAlt, FaTruck, FaStar, FaArrowRight } from "react-icons/fa"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return featuredProducts
    }
    // Search within featured products only
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
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-fashion.jpg"
            alt="Premium fashion collection"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">
            Elevate Your Style with <span style={{ color: '#c8875c' }}>E-Apparels</span>
          </h1>

          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your premium destination for curated fashion. Discover trending clothing, accessories, and footwear from
            top brands at unbeatable prices.
          </p>

          <div className="mb-8 max-w-md mx-auto">
            <div className="bg-card rounded-lg p-4 border border-border/50 shadow-lg">
              <SearchAutocomplete
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search for products..."
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-card text-primary hover:bg-card/90">
              <Link href="/products" className="no-underline">
                <FaShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trending Now</h2>
            <p className="text-muted-foreground text-lg mb-8">Our most popular picks this season</p>
          </div>

          {searchQuery.trim() && filteredProducts.length === 0 ? (
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
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose E-Apparels?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <FaShieldAlt className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
                <p className="text-muted-foreground">
                  Your payments and personal data are protected with industry-leading encryption.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FaTruck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Express Shipping</h3>
                <p className="text-muted-foreground">
                  Standard and express delivery options to get your fashion picks fast.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FaStar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Premium Brands</h3>
                <p className="text-muted-foreground">Handpicked fashion from trusted designers and premium labels.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Refresh Your Wardrobe?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of fashion-forward shoppers and discover your next favorite look.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
