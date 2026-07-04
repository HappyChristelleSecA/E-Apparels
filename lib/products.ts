import type { Product } from "./products"

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

// Mock product categories
export const categories: ProductCategory[] = [
  {
    id: "1",
    name: "Clothing",
    slug: "clothing",
    description: "Everyday essentials and statement pieces",
    image: "/images/products/fm/blazer.png",
  },
  {
    id: "2",
    name: "Shoes",
    slug: "shoes",
    description: "Boots, sneakers, heels and loafers",
    image: "/images/products/fm/chelsea-boots.png",
  },
  {
    id: "3",
    name: "Jewelry",
    slug: "jewelry",
    description: "Fine and everyday jewelry",
    image: "/images/products/fm/gold-necklace.png",
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    description: "Bags, belts, scarves and eyewear",
    image: "/images/products/fm/crossbody-bag.png",
  },
]

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Classic Cotton Crew Tee",
    description: "Soft breathable organic cotton crew-neck tee with a relaxed everyday fit.",
    price: 32,
    originalPrice: 42,
    category: "Clothing",
    image: "/images/products/fm/tee.png",
    images: ["/images/products/fm/tee.png"],
    rating: 4.7,
    reviewCount: 214,
    inStock: true,
    featured: true,
    tags: ["tshirt","cotton","basics"],
    quantity: 120,
    lowStockThreshold: 15,
    color: "White",
    colors: ["White","Black","Navy","Sage"],
    createdAt: "2024-01-01",
    visible: true,
    gender: "Unisex",
    brand: "Everyday Co",
    sizes: ["XS","S","M","L","XL"],
  },
  {
    id: "2",
    name: "Tailored Wool Blazer",
    description: "Structured single-breasted blazer in an Italian wool blend for a sharp silhouette.",
    price: 189,
    originalPrice: 240,
    category: "Clothing",
    image: "/images/products/fm/blazer.png",
    images: ["/images/products/fm/blazer.png"],
    rating: 4.6,
    reviewCount: 96,
    inStock: true,
    featured: true,
    tags: ["blazer","formal","wool"],
    quantity: 40,
    lowStockThreshold: 6,
    color: "Charcoal",
    colors: ["Charcoal","Navy","Camel"],
    createdAt: "2024-01-02",
    visible: true,
    gender: "Men",
    brand: "Atelier North",
    sizes: ["S","M","L","XL"],
  },
  {
    id: "3",
    name: "Slim Fit Denim Jeans",
    description: "Stretch slim-fit jeans with a clean mid-wash finish and tailored leg.",
    price: 78,
    originalPrice: 98,
    category: "Clothing",
    image: "/images/products/fm/jeans.png",
    images: ["/images/products/fm/jeans.png"],
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    featured: false,
    tags: ["denim","jeans","slim"],
    quantity: 85,
    lowStockThreshold: 10,
    color: "Indigo",
    colors: ["Indigo","Black","Light Wash"],
    createdAt: "2024-01-03",
    visible: true,
    gender: "Men",
    brand: "Denim Lab",
    sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "4",
    name: "Floral Wrap Midi Dress",
    description: "Flowing wrap midi dress with a delicate floral print and adjustable tie waist.",
    price: 96,
    originalPrice: 128,
    category: "Clothing",
    image: "/images/products/fm/dress.png",
    images: ["/images/products/fm/dress.png"],
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    featured: true,
    tags: ["dress","floral","midi"],
    quantity: 55,
    lowStockThreshold: 8,
    color: "Rose",
    colors: ["Rose","Emerald","Black"],
    createdAt: "2024-01-04",
    visible: true,
    gender: "Women",
    brand: "Bloom & Co",
    sizes: ["XS","S","M","L","XL"],
  },
  {
    id: "5",
    name: "Leather Chelsea Boots",
    description: "Timeless leather Chelsea boots with elastic side panels and a durable sole.",
    price: 168,
    originalPrice: 210,
    category: "Shoes",
    image: "/images/products/fm/chelsea-boots.png",
    images: ["/images/products/fm/chelsea-boots.png"],
    rating: 4.7,
    reviewCount: 132,
    inStock: true,
    featured: true,
    tags: ["boots","leather","chelsea"],
    quantity: 48,
    lowStockThreshold: 6,
    color: "Brown",
    colors: ["Brown","Black","Tan"],
    createdAt: "2024-01-05",
    visible: true,
    gender: "Men",
    brand: "Cobbler & Sons",
    sizes: ["7","8","9","10","11","12"],
  },
  {
    id: "6",
    name: "Retro Running Sneakers",
    description: "Cushioned retro-style sneakers with a breathable mesh upper for all-day comfort.",
    price: 112,
    originalPrice: 140,
    category: "Shoes",
    image: "/images/products/fm/sneakers.png",
    images: ["/images/products/fm/sneakers.png"],
    rating: 4.6,
    reviewCount: 265,
    inStock: true,
    featured: true,
    tags: ["sneakers","running","retro"],
    quantity: 90,
    lowStockThreshold: 12,
    color: "White",
    colors: ["White","Grey","Navy"],
    createdAt: "2024-01-06",
    visible: true,
    gender: "Unisex",
    brand: "Pace Athletics",
    sizes: ["6","7","8","9","10","11"],
  },
  {
    id: "7",
    name: "Strappy Block Heels",
    description: "Elegant strappy block heels offering height with stability for events.",
    price: 128,
    originalPrice: 160,
    category: "Shoes",
    image: "/images/products/fm/heels.png",
    images: ["/images/products/fm/heels.png"],
    rating: 4.4,
    reviewCount: 88,
    inStock: true,
    featured: false,
    tags: ["heels","strappy","evening"],
    quantity: 42,
    lowStockThreshold: 5,
    color: "Nude",
    colors: ["Nude","Black","Red"],
    createdAt: "2024-01-07",
    visible: true,
    gender: "Women",
    brand: "Soirée",
    sizes: ["5","6","7","8","9","10"],
  },
  {
    id: "8",
    name: "Suede Penny Loafers",
    description: "Handcrafted suede loafers with a classic penny strap and cushioned insole.",
    price: 145,
    originalPrice: 185,
    category: "Shoes",
    image: "/images/products/fm/loafers.png",
    images: ["/images/products/fm/loafers.png"],
    rating: 4.5,
    reviewCount: 74,
    inStock: true,
    featured: false,
    tags: ["loafers","suede","smart-casual"],
    quantity: 38,
    lowStockThreshold: 5,
    color: "Tan",
    colors: ["Tan","Navy","Grey"],
    createdAt: "2024-01-08",
    visible: true,
    gender: "Men",
    brand: "Cobbler & Sons",
    sizes: ["7","8","9","10","11","12"],
  },
  {
    id: "9",
    name: "Gold Pendant Necklace",
    description: "18k gold-plated pendant necklace with a fine cable chain for everyday elegance.",
    price: 89,
    originalPrice: 120,
    category: "Jewelry",
    image: "/images/products/fm/gold-necklace.png",
    images: ["/images/products/fm/gold-necklace.png"],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    featured: true,
    tags: ["necklace","gold","pendant"],
    quantity: 60,
    lowStockThreshold: 8,
    color: "Gold",
    colors: ["Gold","Silver","Rose Gold"],
    createdAt: "2024-01-09",
    visible: true,
    gender: "Women",
    brand: "Lustre",
    sizes: ["One Size"],
  },
  {
    id: "10",
    name: "Diamond Stud Earrings",
    description: "Brilliant-cut cubic zirconia studs set in sterling silver with secure backs.",
    price: 149,
    originalPrice: 199,
    category: "Jewelry",
    image: "/images/products/fm/earrings.png",
    images: ["/images/products/fm/earrings.png"],
    rating: 4.7,
    reviewCount: 121,
    inStock: true,
    featured: true,
    tags: ["earrings","studs","sparkle"],
    quantity: 50,
    lowStockThreshold: 6,
    color: "Silver",
    colors: ["Silver","Gold"],
    createdAt: "2024-01-10",
    visible: true,
    gender: "Women",
    brand: "Lustre",
    sizes: ["One Size"],
  },
  {
    id: "11",
    name: "Sterling Silver Bracelet",
    description: "Polished sterling silver chain bracelet with an adjustable clasp.",
    price: 72,
    originalPrice: 95,
    category: "Jewelry",
    image: "/images/products/fm/bracelet.png",
    images: ["/images/products/fm/bracelet.png"],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    featured: false,
    tags: ["bracelet","silver","chain"],
    quantity: 44,
    lowStockThreshold: 5,
    color: "Silver",
    colors: ["Silver","Gold"],
    createdAt: "2024-01-11",
    visible: true,
    gender: "Unisex",
    brand: "Forge",
    sizes: ["One Size"],
  },
  {
    id: "12",
    name: "Minimalist Band Ring",
    description: "Sleek minimalist band ring crafted from hypoallergenic stainless steel.",
    price: 45,
    originalPrice: 60,
    category: "Jewelry",
    image: "/images/products/fm/ring.png",
    images: ["/images/products/fm/ring.png"],
    rating: 4.6,
    reviewCount: 98,
    inStock: true,
    featured: false,
    tags: ["ring","minimalist","band"],
    quantity: 70,
    lowStockThreshold: 10,
    color: "Gold",
    colors: ["Gold","Silver","Black"],
    createdAt: "2024-01-12",
    visible: true,
    gender: "Unisex",
    brand: "Forge",
    sizes: ["6","7","8","9","10"],
  },
  {
    id: "13",
    name: "Leather Crossbody Bag",
    description: "Compact full-grain leather crossbody bag with an adjustable strap and gold hardware.",
    price: 138,
    originalPrice: 175,
    category: "Accessories",
    image: "/images/products/fm/crossbody-bag.png",
    images: ["/images/products/fm/crossbody-bag.png"],
    rating: 4.8,
    reviewCount: 187,
    inStock: true,
    featured: true,
    tags: ["bag","leather","crossbody"],
    quantity: 52,
    lowStockThreshold: 7,
    color: "Tan",
    colors: ["Tan","Black","Burgundy"],
    createdAt: "2024-01-13",
    visible: true,
    gender: "Women",
    brand: "Carryall",
    sizes: ["One Size"],
  },
  {
    id: "14",
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV400 polarized lenses and a lightweight frame.",
    price: 68,
    originalPrice: 90,
    category: "Accessories",
    image: "/images/products/fm/sunglasses.png",
    images: ["/images/products/fm/sunglasses.png"],
    rating: 4.5,
    reviewCount: 143,
    inStock: true,
    featured: true,
    tags: ["sunglasses","aviator","polarized"],
    quantity: 95,
    lowStockThreshold: 12,
    color: "Gold",
    colors: ["Gold","Silver","Black"],
    createdAt: "2024-01-14",
    visible: true,
    gender: "Unisex",
    brand: "Solstice",
    sizes: ["One Size"],
  },
  {
    id: "15",
    name: "Wool Blend Scarf",
    description: "Soft wool-blend scarf with a subtle herringbone weave for cooler days.",
    price: 54,
    originalPrice: 72,
    category: "Accessories",
    image: "/images/products/fm/scarf.png",
    images: ["/images/products/fm/scarf.png"],
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    featured: false,
    tags: ["scarf","wool","winter"],
    quantity: 66,
    lowStockThreshold: 8,
    color: "Grey",
    colors: ["Grey","Camel","Navy"],
    createdAt: "2024-01-15",
    visible: true,
    gender: "Unisex",
    brand: "Hearth",
    sizes: ["One Size"],
  },
  {
    id: "16",
    name: "Classic Leather Belt",
    description: "Genuine leather belt with a brushed metal buckle and clean edge stitching.",
    price: 49,
    originalPrice: 65,
    category: "Accessories",
    image: "/images/products/fm/belt.png",
    images: ["/images/products/fm/belt.png"],
    rating: 4.5,
    reviewCount: 112,
    inStock: true,
    featured: false,
    tags: ["belt","leather","classic"],
    quantity: 80,
    lowStockThreshold: 10,
    color: "Brown",
    colors: ["Brown","Black"],
    createdAt: "2024-01-16",
    visible: true,
    gender: "Men",
    brand: "Carryall",
    sizes: ["S","M","L","XL"],
  },
]

let allProductsCache: Product[] | null = null

// Bump this version whenever product data (images, names, etc.) changes in source code.
// This forces localStorage to discard stale cached products.
const PRODUCTS_DATA_VERSION = "fm-1"

export const getAllProducts = (): Product[] => {
  if (typeof window !== "undefined" && allProductsCache === null) {
    // Check if stored data version matches the current code version
    const storedVersion = localStorage.getItem("eapparels_products_version")

    if (storedVersion !== PRODUCTS_DATA_VERSION) {
      // Version mismatch — clear stale product data and use fresh static products
      localStorage.removeItem("eapparels_products")
      localStorage.setItem("eapparels_products_version", PRODUCTS_DATA_VERSION)
      allProductsCache = [...products]
      return allProductsCache
    }

    // Initialize cache on first access in browser
    try {
      const stored = localStorage.getItem("eapparels_products")
      if (stored) {
        const parsedProducts = JSON.parse(stored)
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          allProductsCache = parsedProducts
          return allProductsCache
        }
      }
    } catch {
      // ignore
    }

    // Fallback to static products
    allProductsCache = [...products]
  }

  return allProductsCache || products
}

export const getVisibleProducts = (): Product[] => {
  return getAllProducts().filter((product) => product.visible !== false)
}

export const getProductById = (id: string): Product | undefined => {
  const allProducts = getAllProducts()
  return allProducts.find((product) => product.id === id)
}

export const refreshProductsCache = (): void => {
  if (typeof window !== "undefined") {
    allProductsCache = null // Reset cache to force reload
  }
}

export const getProductsByCategory = (category: string): Product[] => {
  return getVisibleProducts().filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export const getFeaturedProducts = (): Product[] => {
  return getVisibleProducts().filter((product) => product.featured)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return getVisibleProducts().filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export const getSearchSuggestions = (query: string, limit = 5): string[] => {
  if (!query || query.length < 2) return []

  const lowercaseQuery = query.toLowerCase()
  const suggestions = new Set<string>()

  // Add product names that match
  getVisibleProducts().forEach((product) => {
    if (product.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(product.name)
    }
  })

  // Add categories that match
  categories.forEach((category) => {
    if (category.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(category.name)
    }
  })

  // Add tags that match
  getVisibleProducts().forEach((product) => {
    product.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(tag)
      }
    })
  })

  return Array.from(suggestions).slice(0, limit)
}

export const searchProductsEnhanced = (query: string): { products: Product[]; highlightTerm: string } => {
  if (!query) return { products: getVisibleProducts(), highlightTerm: "" }

  const lowercaseQuery = query.toLowerCase()
  const results = getVisibleProducts().filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(lowercaseQuery)
    const descriptionMatch = product.description.toLowerCase().includes(lowercaseQuery)
    const tagMatch = product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    const categoryMatch = product.category.toLowerCase().includes(lowercaseQuery)

    return nameMatch || descriptionMatch || tagMatch || categoryMatch
  })

  // Sort by relevance (name matches first, then description, then tags)
  results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(lowercaseQuery)
    const bNameMatch = b.name.toLowerCase().includes(lowercaseQuery)

    if (aNameMatch && !bNameMatch) return -1
    if (!aNameMatch && bNameMatch) return 1

    // If both or neither match name, sort by rating
    return b.rating - a.rating
  })

  return { products: results, highlightTerm: query }
}

export const getFilterCounts = (baseProducts: Product[] = getVisibleProducts()) => {
  const counts = {
    categories: {} as Record<string, number>,
    priceRanges: {
      "0-25": 0,
      "25-50": 0,
      "50-100": 0,
      "100-200": 0,
      "200+": 0,
    },
    ratings: {
      "4+": 0,
      "3+": 0,
      "2+": 0,
      "1+": 0,
    },
    colors: {} as Record<string, number>,
    genders: {} as Record<string, number>,
    sizes: {} as Record<string, number>,
    brands: {} as Record<string, number>,
    inStock: 0,
    onSale: 0,
    outOfOrder: 0,
  }

  baseProducts.forEach((product) => {
    // Category counts
    counts.categories[product.category] = (counts.categories[product.category] || 0) + 1

    // Color counts
    if (product.colors) {
      product.colors.forEach((color) => {
        counts.colors[color] = (counts.colors[color] || 0) + 1
      })
    } else if (product.color) {
      counts.colors[product.color] = (counts.colors[product.color] || 0) + 1
    }

    // Price range counts
    if (product.price <= 25) counts.priceRanges["0-25"]++
    else if (product.price <= 50) counts.priceRanges["25-50"]++
    else if (product.price <= 100) counts.priceRanges["50-100"]++
    else if (product.price <= 200) counts.priceRanges["100-200"]++
    else counts.priceRanges["200+"]++

    // Rating counts
    if (product.rating >= 4) counts.ratings["4+"]++
    if (product.rating >= 3) counts.ratings["3+"]++
    if (product.rating >= 2) counts.ratings["2+"]++
    if (product.rating >= 1) counts.ratings["1+"]++

    // Gender counts
    if (product.gender) {
      counts.genders[product.gender] = (counts.genders[product.gender] || 0) + 1
    }

    // Size counts
    if (product.sizes) {
      product.sizes.forEach((size) => {
        counts.sizes[size] = (counts.sizes[size] || 0) + 1
      })
    }

    // Brand counts
    if (product.brand) {
      counts.brands[product.brand] = (counts.brands[product.brand] || 0) + 1
    }

    // Stock and sale counts
    if (product.inStock) counts.inStock++
    if (product.originalPrice && product.originalPrice > product.price) counts.onSale++
    if (product.outOfOrder) counts.outOfOrder++
  })

  return counts
}

export const filterProducts = (
  products: Product[],
  filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    minRating?: number
    outOfOrder?: boolean
    color?: string
    gender?: string
    size?: string
    brand?: string
  },
): Product[] => {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false
    if (filters.minPrice && product.price < filters.minPrice) return false
    if (filters.maxPrice && product.price > filters.maxPrice) return false
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false
    if (filters.minRating && product.rating < filters.minRating) return false
    if (filters.outOfOrder !== undefined && product.outOfOrder !== filters.outOfOrder) return false

    // Color filtering logic
    if (filters.color) {
      const hasColor = product.colors ? product.colors.includes(filters.color) : product.color === filters.color
      if (!hasColor) return false
    }

    // Gender filtering logic
    if (filters.gender && product.gender !== filters.gender) return false

    // Size filtering logic
    if (filters.size) {
      const hasSize = product.sizes ? product.sizes.includes(filters.size) : false
      if (!hasSize) return false
    }

    // Brand filtering logic
    if (filters.brand && product.brand !== filters.brand) return false

    return true
  })
}

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products]

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "popularity":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case "newest":
      return sorted.sort((a, b) => {
        const aDate = new Date(a.createdAt || "")
        const bDate = new Date(b.createdAt || "")
        return bDate.getTime() - aDate.getTime()
      })
    case "discount":
      return sorted.sort((a, b) => {
        const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0
        const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0
        return bDiscount - aDiscount
      })
    case "name":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export const getProductWithInventory = (
  id: string,
): (Product & { availableQuantity: number; isLowStock: boolean }) | undefined => {
  const product = getProductById(id)
  if (!product) return undefined

  // Import inventory functions dynamically to avoid circular dependency
  const { getAvailableQuantity, isLowStock } = require("./inventory")

  return {
    ...product,
    availableQuantity: getAvailableQuantity(id),
    isLowStock: isLowStock(id),
  }
}

export const getProductsWithInventory = (): Array<Product & { availableQuantity: number; isLowStock: boolean }> => {
  const { getAvailableQuantity, isLowStock } = require("./inventory")

  return getVisibleProducts().map((product) => ({
    ...product,
    availableQuantity: getAvailableQuantity(product.id),
    isLowStock: isLowStock(product.id),
  }))
}
