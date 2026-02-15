"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import {
  type CartState,
  calculateCartTotal,
  calculateItemCount,
  getCartFromStorage,
  saveCartToStorage,
  clearUserCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil,
  validateCartStock,
} from "@/lib/cart"
import type { Product } from "@/lib/products"
import { useAuth } from "@/hooks/use-auth"

interface CartContextType extends CartState {
  isLoaded: boolean
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  validateStock: () => { removedItems: any[]; updatedItems: any[] }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const items = getCartFromStorage(user?.id)
    setCartState({
      items,
      total: calculateCartTotal(items),
      itemCount: calculateItemCount(items),
      isOpen: false,
    })
    setIsLoaded(true)
  }, [user?.id])

  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cartState.items, user?.id)
    }
  }, [cartState.items, isLoaded, user?.id])

  useEffect(() => {
    if (!user && isLoaded) {
      setCartState((prev) => ({
        ...prev,
        items: [],
        total: 0,
        itemCount: 0,
      }))
    }
  }, [user, isLoaded])

  const addToCart = (product: Product, quantity = 1) => {
    setCartState((prev) => {
      const newItems = addToCartUtil(prev.items, product, quantity)
      const newTotal = calculateCartTotal(newItems)
      const newItemCount = calculateItemCount(newItems)

      return {
        ...prev,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
        isOpen: newItems.length > prev.items.length,
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartState((prev) => {
      const newItems = removeFromCartUtil(prev.items, productId)
      return {
        ...prev,
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartState((prev) => {
      const newItems = updateCartItemQuantityUtil(prev.items, productId, quantity)
      return {
        ...prev,
        items: newItems,
        total: calculateCartTotal(newItems),
        itemCount: calculateItemCount(newItems),
      }
    })
  }

  const clearCart = () => {
    setCartState((prev) => ({
      ...prev,
      items: clearCartUtil(),
      total: 0,
      itemCount: 0,
    }))
    clearUserCart(user?.id)
  }

  const toggleCart = () => {
    setCartState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
  }

  const validateStock = () => {
    const { validItems, removedItems, updatedItems } = validateCartStock(cartState.items)

    if (removedItems.length > 0 || updatedItems.length > 0) {
      setCartState((prev) => ({
        ...prev,
        items: validItems,
        total: calculateCartTotal(validItems),
        itemCount: calculateItemCount(validItems),
      }))
    }

    return { removedItems, updatedItems }
  }

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        validateStock,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
