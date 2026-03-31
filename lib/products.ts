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
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "/images/categories/electronics.jpg",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Trendy clothing and accessories",
    image: "/images/categories/fashion.jpg",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home and garden",
    image: "/images/categories/home.jpg",
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    description: "Sports equipment and fitness gear",
    image: "/images/categories/sports.jpg",
  },
  {
    id: "5",
    name: "Books",
    slug: "books",
    description: "Books for every reader",
    image: "/images/categories/books.jpg",
  },
  {
    id: "6",
    name: "Food & Beverages",
    slug: "food-beverages",
    description: "Gourmet food and premium beverages",
    image: "/images/categories/food.jpg",
  },
]

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    image: "/images/products/headphones.jpg",
    images: [
      "/images/products/headphones.jpg",
    ],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    featured: true,
    tags: ["wireless", "bluetooth", "noise-cancelling"],
    quantity: 50,
    lowStockThreshold: 10,
    color: "Black",
    colors: ["Black", "White", "Silver"],
    createdAt: "2023-01-01",
    visible: true,
    gender: "Man",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    price: 299.99,
    category: "Electronics",
    image: "/images/products/smartwatch.jpg",
    images: ["/images/products/smartwatch.jpg"],
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    featured: true,
    tags: ["smartwatch", "fitness", "gps"],
    quantity: 30,
    lowStockThreshold: 5,
    color: "Black",
    colors: ["Black", "Silver", "Rose Gold"],
    createdAt: "2023-01-02",
    visible: true,
    gender: "Man",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    originalPrice: 39.99,
    category: "Fashion",
    image: "/images/products/tshirt.jpg",
    images: ["/images/products/tshirt.jpg"],
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    featured: false,
    tags: ["organic", "cotton", "sustainable"],
    quantity: 20,
    lowStockThreshold: 5,
    color: "White",
    colors: ["White", "Black", "Gray", "Navy", "Red"],
    createdAt: "2023-01-03",
    visible: true,
    gender: "Woman",
  },
  {
    id: "4",
    name: "Modern Table Lamp",
    description: "Sleek and modern table lamp with adjustable brightness and USB charging port.",
    price: 79.99,
    category: "Home & Garden",
    image: "/images/products/lamp.jpg",
    images: ["/images/products/lamp.jpg"],
    rating: 4.2,
    reviewCount: 56,
    inStock: true,
    featured: false,
    tags: ["lamp", "modern", "usb-charging"],
    quantity: 15,
    lowStockThreshold: 3,
    color: "White",
    colors: ["White", "Black", "Gold"],
    createdAt: "2023-01-04",
    visible: true,
    gender: "Man",
  },
  {
    id: "5",
    name: "Yoga Mat Premium",
    description: "High-quality non-slip yoga mat perfect for all types of yoga and exercise.",
    price: 49.99,
    category: "Sports",
    image: "/images/products/yogamat.jpg",
    images: ["/images/products/yogamat.jpg"],
    rating: 4.6,
    reviewCount: 174,
    inStock: true,
    featured: true,
    tags: ["yoga", "exercise", "non-slip"],
    quantity: 10,
    lowStockThreshold: 2,
    color: "Purple",
    colors: ["Purple", "Blue", "Pink", "Green", "Black"],
    createdAt: "2023-01-05",
    visible: true,
    gender: "Woman",
  },
  {
    id: "6",
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to modern JavaScript programming with practical examples.",
    price: 34.99,
    category: "Books",
    image: "/images/products/jsbook.jpg",
    images: ["/images/products/jsbook.jpg"],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    featured: false,
    tags: ["javascript", "programming", "guide"],
    quantity: 5,
    lowStockThreshold: 1,
    color: "Yellow",
    colors: ["Yellow"],
    createdAt: "2023-01-06",
    visible: true,
    gender: "Man",
  },
  {
    id: "7",
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 24.99,
    originalPrice: 34.99,
    category: "Electronics",
    image: "/images/products/charger.jpg",
    images: ["/images/products/charger.jpg"],
    rating: 4.1,
    reviewCount: 67,
    inStock: true,
    featured: false,
    tags: ["wireless", "charger", "qi-enabled"],
    quantity: 25,
    lowStockThreshold: 5,
    color: "Black",
    colors: ["Black", "White"],
    createdAt: "2023-01-07",
    visible: true,
    gender: "Woman",
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    description: "Stylish designer sunglasses with UV protection and polarized lenses.",
    price: 149.99,
    category: "Fashion",
    image: "/images/products/sunglasses.jpg",
    images: ["/images/products/sunglasses.jpg"],
    rating: 4.4,
    reviewCount: 91,
    inStock: false,
    featured: false,
    tags: ["sunglasses", "designer", "uv-protection"],
    quantity: 0,
    lowStockThreshold: 1,
    color: "Brown",
    colors: ["Brown", "Black", "Gold"],
    createdAt: "2023-01-08",
    visible: true,
    gender: "Women",
  },
  {
    id: "9",
    name: "Professional Camera Lens",
    description: "High-quality 50mm prime lens for professional photography with excellent bokeh.",
    price: 899.99,
    originalPrice: 1099.99,
    category: "Electronics",
    image: "/images/products/cameralens.jpg",
    images: ["/images/products/cameralens.jpg"],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    featured: true,
    tags: ["camera", "lens", "photography", "professional"],
    quantity: 8,
    lowStockThreshold: 2,
    color: "Black",
    colors: ["Black"],
    createdAt: "2023-01-09",
    visible: true,
    gender: "Man",
  },
  {
    id: "10",
    name: "Luxury Leather Handbag",
    description: "Handcrafted genuine leather handbag with elegant design and premium quality.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Fashion",
    image: "/images/products/handbag.jpg",
    images: ["/images/products/handbag.jpg"],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true,
    tags: ["handbag", "leather", "luxury", "fashion"],
    quantity: 12,
    lowStockThreshold: 3,
    color: "Brown",
    colors: ["Brown", "Black", "Tan"],
    createdAt: "2023-01-10",
    visible: true,
    gender: "Women",
  },
  {
    id: "11",
    name: "Smart Home Security Camera",
    description: "4K wireless security camera with night vision and motion detection.",
    price: 179.99,
    category: "Electronics",
    image: "/images/products/securitycam.jpg",
    images: ["/images/products/securitycam.jpg"],
    rating: 4.4,
    reviewCount: 234,
    inStock: true,
    featured: false,
    tags: ["security", "camera", "smart-home", "4k"],
    quantity: 18,
    lowStockThreshold: 5,
    color: "White",
    colors: ["White", "Black"],
    createdAt: "2023-01-11",
    visible: true,
    gender: "Man",
  },
  {
    id: "12",
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic office chair with lumbar support and adjustable height.",
    price: 449.99,
    originalPrice: 599.99,
    category: "Home & Garden",
    image: "/images/products/officechair.jpg",
    images: ["/images/products/officechair.jpg"],
    rating: 4.7,
    reviewCount: 167,
    inStock: true,
    featured: true,
    tags: ["office", "chair", "ergonomic", "furniture"],
    quantity: 6,
    lowStockThreshold: 2,
    color: "Black",
    colors: ["Black", "Gray", "White"],
    createdAt: "2023-01-12",
    visible: true,
    gender: "Woman",
  },
  {
    id: "13",
    name: "Professional Tennis Racket",
    description: "High-performance tennis racket used by professional players worldwide.",
    price: 249.99,
    category: "Sports",
    image: "/images/products/tennisracket.jpg",
    images: ["/images/products/tennisracket.jpg"],
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    featured: false,
    tags: ["tennis", "racket", "professional", "sports"],
    quantity: 14,
    lowStockThreshold: 3,
    color: "Red",
    colors: ["Red", "Blue", "Black"],
    createdAt: "2023-01-13",
    visible: true,
    gender: "Man",
  },
  {
    id: "14",
    name: "Artisan Chocolate Box",
    description: "Handcrafted premium chocolates made with finest ingredients from around the world.",
    price: 49.99,
    category: "Food & Beverages",
    image: "/images/products/chocolate.jpg",
    images: ["/images/products/chocolate.jpg"],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    featured: true,
    tags: ["chocolate", "artisan", "premium", "handcrafted"],
    quantity: 19,
    lowStockThreshold: 4,
    color: "Brown",
    colors: ["Brown"],
    createdAt: "2023-01-14",
    visible: true,
    gender: "Woman",
  },
  {
    id: "15",
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches for gaming enthusiasts.",
    price: 159.99,
    originalPrice: 199.99,
    category: "Electronics",
    image: "/images/products/keyboard.jpg",
    images: ["/images/products/keyboard.jpg"],
    rating: 4.5,
    reviewCount: 145,
    inStock: true,
    featured: false,
    tags: ["keyboard", "gaming", "mechanical", "rgb"],
    quantity: 22,
    lowStockThreshold: 5,
    color: "Black",
    colors: ["Black", "White"],
    createdAt: "2023-01-15",
    visible: true,
    gender: "Man",
  },
  {
    id: "16",
    name: "Silk Scarf Collection",
    description: "Luxurious silk scarf with hand-painted artistic design, perfect for any occasion.",
    price: 89.99,
    category: "Fashion",
    image: "/images/products/silkscarf.jpg",
    images: ["/images/products/silkscarf.jpg"],
    rating: 4.6,
    reviewCount: 73,
    inStock: true,
    featured: false,
    tags: ["scarf", "silk", "luxury", "artistic"],
    quantity: 16,
    lowStockThreshold: 4,
    color: "Blue",
    colors: ["Blue", "Red", "Green", "Purple"],
    createdAt: "2023-01-16",
    visible: true,
    gender: "Women",
  },
  {
    id: "17",
    name: "Indoor Plant Collection",
    description: "Beautiful collection of low-maintenance indoor plants perfect for home decoration.",
    price: 39.99,
    category: "Home & Garden",
    image: "/images/products/plants.jpg",
    images: ["/images/products/plants.jpg"],
    rating: 4.3,
    reviewCount: 198,
    inStock: true,
    featured: false,
    tags: ["plants", "indoor", "decoration", "low-maintenance"],
    quantity: 28,
    lowStockThreshold: 6,
    color: "Green",
    colors: ["Green"],
    createdAt: "2023-01-17",
    visible: true,
    gender: "Man",
  },
  {
    id: "18",
    name: "Fitness Resistance Bands Set",
    description: "Complete set of resistance bands for full-body workouts at home or gym.",
    price: 34.99,
    originalPrice: 49.99,
    category: "Sports",
    image: "/images/products/resistancebands.jpg",
    images: ["/images/products/resistancebands.jpg"],
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    featured: false,
    tags: ["fitness", "resistance-bands", "workout", "home-gym"],
    quantity: 31,
    lowStockThreshold: 7,
    color: "Multi",
    colors: ["Multi", "Black", "Red"],
    createdAt: "2023-01-18",
    visible: true,
    gender: "Woman",
  },
  {
    id: "19",
    name: "Gift Card Collection",
    description: "Digital gift cards available in various denominations for the perfect gift.",
    price: 50.0,
    category: "Food & Beverages",
    image: "/images/products/giftcard.jpg",
    images: ["/images/products/giftcard.jpg"],
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    featured: false,
    tags: ["gift-card", "digital", "present", "versatile"],
    quantity: 100,
    lowStockThreshold: 10,
    color: "Gold",
    colors: ["Gold", "Silver"],
    createdAt: "2023-01-19",
    visible: true,
    gender: "Man",
  },
  {
    id: "20",
    name: "Vintage Vinyl Record Player",
    description: "Classic turntable with modern features, perfect for vinyl enthusiasts.",
    price: 399.99,
    originalPrice: 499.99,
    category: "Electronics",
    image: "/images/products/recordplayer.jpg",
    images: ["/images/products/recordplayer.jpg"],
    rating: 4.7,
    reviewCount: 87,
    inStock: true,
    featured: true,
    tags: ["turntable", "vinyl", "vintage", "music"],
    quantity: 9,
    lowStockThreshold: 2,
    color: "Wood",
    colors: ["Wood", "Black", "White"],
    createdAt: "2023-01-20",
    visible: true,
    gender: "Man",
  },
]

let allProductsCache: Product[] | null = null

// Bump this version whenever product data (images, names, etc.) changes in source code.
// This forces localStorage to discard stale cached products.
const PRODUCTS_DATA_VERSION = "3"

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
