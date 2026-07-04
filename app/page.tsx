"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/products/product-card"
import { SearchAutocomplete } from "@/components/products/search-autocomplete"
import { getFeaturedProducts, searchProducts, categories } from "@/lib/products"
import type { Product } from "@/lib/products"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FaShoppingBag, FaShieldAlt, FaTruck, FaStar, FaArrowRight, FaLeaf } from "react-icons/fa"

const categoryImages: Record<string, string> = {
  clothing: "/images/products/fm/blazer.png",
  shoes: "/images/products/fm/chelsea-boots.png",
  jewelry: "/images/products/fm/gold-necklace.png",
  accessories: "/images/products/fm/crossbody-bag.png",
}

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

      {/* Hero Section - asymmetric editorial split */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center py-16 lg:py-24">
            {/* Left copy column */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
                <FaLeaf className="h-3.5 w-3.5 text-primary" />
                New Season Collection
              </div>
              <h1 className="font-heading text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-balance mb-6">
                Fashion that <span className="text-primary">fits</span> your every moment.
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg text-pretty mb-8 leading-relaxed">
                Curated clothing, shoes, jewelry, and accessories — thoughtfully selected for quality, comfort, and
                everyday style.
              </p>

              <div className="max-w-md mb-8">
                <SearchAutocomplete
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search clothing, shoes, jewelry..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/products" className="no-underline">
                    <FaShoppingBag className="mr-2 h-5 w-5" />
                    Shop the Collection
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-bold font-heading">4</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">100%</p>
                  <p className="text-sm text-muted-foreground">Curated picks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">Free</p>
                  <p className="text-sm text-muted-foreground">Shipping over $75</p>
                </div>
              </div>
            </div>

            {/* Right image collage column */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[3/4]">
                  <img
                    src="/images/products/fm/dress.png"
                    alt="Floral wrap midi dress"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-square">
                    <img
                      src="/images/products/fm/heels.png"
                      alt="Strappy block heel sandals"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-primary aspect-[3/2] flex flex-col justify-center p-6">
                    <p className="text-primary-foreground/70 text-xs uppercase tracking-widest mb-1">Featured</p>
                    <p className="text-primary-foreground font-heading text-xl font-bold leading-tight">
                      Timeless jewelry, everyday shine
                    </p>
                    <Link
                      href="/products?category=Jewelry"
                      className="text-primary-foreground/90 text-sm mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all no-underline"
                    >
                      Explore <FaArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground text-lg">Find exactly what you&apos;re looking for.</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/products">
                Browse all <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group relative rounded-2xl overflow-hidden bg-secondary aspect-[4/5] no-underline"
              >
                <img
                  src={categoryImages[category.slug] || category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-background font-heading text-xl font-bold mb-0.5">{category.name}</h3>
                  <p className="text-background/80 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">Handpicked</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Our most-loved pieces, chosen just for you.</p>
          </div>

          {!productsLoaded ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(8)].map((_, i) => (
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
              <p className="text-muted-foreground text-lg mb-4">No featured products found for &quot;{searchQuery}&quot;</p>
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/products">
                View All Products
                <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust strip - horizontal */}
      <section className="py-14 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="flex items-center gap-4 sm:px-6 pt-4 sm:pt-0 first:pt-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaShieldAlt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">Secure Shopping</h3>
                <p className="text-muted-foreground text-sm">Protected payments, always.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:px-6 pt-4 sm:pt-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaTruck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">Reliable shipping partners.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:px-6 pt-4 sm:pt-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaStar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">Quality Curated</h3>
                <p className="text-muted-foreground text-sm">Trusted brands and pieces.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-primary overflow-hidden px-8 py-16 lg:px-16 lg:py-20 text-center">
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
                Ready to find your fit?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
                Join thousands of shoppers and discover your next favorite piece today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth">Create an Account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
