"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaCreditCard, FaLock, FaCheckCircle, FaTag, FaExclamationTriangle, FaShoppingCart, FaTruck } from "react-icons/fa"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { createOrder } from "@/lib/orders"
import { getShippingMethodById, calculateShippingCost } from "@/lib/shipping"
import type { DiscountApplication } from "@/lib/discounts"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShippingMethodSelector } from "@/components/cart/shipping-method-selector"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentMethod {
  id: string
  type: "card"
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
  cardholderName: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  orderTotal: number
  appliedDiscounts?: DiscountApplication[]
  selectedShippingMethodId?: string
  onShippingMethodChange?: (methodId: string) => void
}

const STORAGE_KEY = "eapparels_payment_methods"

export function PaymentModal({
  isOpen,
  onClose,
  orderTotal,
  appliedDiscounts = [],
  selectedShippingMethodId = "standard",
  onShippingMethodChange,
}: PaymentModalProps) {
  const { items, clearCart, validateStock } = useCart()
  const { user } = useAuth()
  const [step, setStep] = useState<"review" | "delivery" | "payment" | "preview" | "success">("review")
  const [isProcessing, setIsProcessing] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState("")
  const [purchasedItems, setPurchasedItems] = useState<typeof items>([])
  const [stockValidationError, setStockValidationError] = useState<{ removedItems: any[]; updatedItems: any[] } | null>(
    null,
  )

  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null)
  const [paymentMode, setPaymentMode] = useState<"saved" | "new">("new")
  const [saveNewCard, setSaveNewCard] = useState(false)

  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const methods = JSON.parse(stored) as PaymentMethod[]
          setSavedPaymentMethods(methods)

          // Auto-select default payment method if available
          const defaultMethod = methods.find((m) => m.isDefault)
          if (defaultMethod) {
            setSelectedPaymentMethodId(defaultMethod.id)
            setPaymentMode("saved")
            autoFillPaymentData(defaultMethod)
          } else if (methods.length > 0) {
            setSelectedPaymentMethodId(methods[0].id)
            setPaymentMode("saved")
            autoFillPaymentData(methods[0])
          } else {
            setPaymentMode("new")
          }
        } catch {
          setPaymentMode("new")
        }
      } else {
        setPaymentMode("new")
      }
    }
  }, [])

  const autoFillPaymentData = (method: PaymentMethod) => {
    setPaymentData({
      cardNumber: `•••• •••• •••• ${method.last4}`,
      expiryDate: `${method.expiryMonth.toString().padStart(2, "0")}/${method.expiryYear.toString().slice(-2)}`,
      cvv: "•••",
      cardholderName: method.cardholderName,
      billingAddress: "",
      city: "",
      zipCode: "",
    })
  }

  const handlePaymentMethodSelect = (value: string) => {
    if (value === "new") {
      setPaymentMode("new")
      setSelectedPaymentMethodId(null)
      // Clear form for new card entry
      setPaymentData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        billingAddress: "",
        city: "",
        zipCode: "",
      })
    } else {
      setPaymentMode("saved")
      setSelectedPaymentMethodId(value)
      // Auto-fill form with selected card
      const selectedMethod = savedPaymentMethods.find((m) => m.id === value)
      if (selectedMethod) {
        autoFillPaymentData(selectedMethod)
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const generateReceiptNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    let result = ""

    for (let i = 0; i < 3; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    result += "-"
    for (let i = 0; i < 4; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    result += "-"
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length))
    }

    return result
  }

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.13
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalDiscountAmount = appliedDiscounts.reduce((sum, discount) => sum + discount.discountAmount, 0)
  const shippingCost = calculateShippingCost(selectedShippingMethodId, subtotal)
  const tax = calculateTax(subtotal - totalDiscountAmount)
  const total = orderTotal

  const isCartEmpty = items.length === 0 || subtotal === 0

  const savePaymentMethod = (cardData: typeof paymentData) => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      last4: cardData.cardNumber.replace(/\s/g, "").slice(-4),
      brand: "Visa", // In a real app, detect card brand from number
      expiryMonth: Number.parseInt(cardData.expiryDate.split("/")[0]),
      expiryYear: 2000 + Number.parseInt(cardData.expiryDate.split("/")[1]),
      isDefault: savedPaymentMethods.length === 0,
      cardholderName: cardData.cardholderName,
    }

    const updatedMethods = [...savedPaymentMethods, newMethod]
    setSavedPaymentMethods(updatedMethods)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMethods))
  }

  const processPayment = async () => {
    if (isCartEmpty || !user) {
      return
    }

    const stockResult = validateStock()
    if (stockResult.removedItems.length > 0 || stockResult.updatedItems.length > 0) {
      setStockValidationError(stockResult)
      return
    }

    setIsProcessing(true)

    setPurchasedItems([...items])

    if (paymentMode === "new" && saveNewCard && paymentData.cardNumber && paymentData.cardholderName) {
      savePaymentMethod(paymentData)
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const receipt = generateReceiptNumber()
    setReceiptNumber(receipt)

    try {
      const orderItems = items.map((item) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      }))

      const shippingMethod = getShippingMethodById(selectedShippingMethodId)

      const newOrder = createOrder({
        userId: user.id,
        items: orderItems,
        subtotal: subtotal - totalDiscountAmount,
        tax: tax,
        total: total,
        shippingAddress: {
          name: deliveryData.fullName || user.name || "Customer",
          street: deliveryData.street || "123 Main St",
          city: deliveryData.city || "New York",
          state: deliveryData.state || "NY",
          zipCode: deliveryData.zipCode || "10001",
          country: deliveryData.country || "USA",
        },
        appliedDiscounts: appliedDiscounts.map((d) => ({ code: d.discountCode, amount: d.discountAmount })),
        shippingMethod: shippingMethod
          ? {
              id: shippingMethod.id,
              name: shippingMethod.name,
              cost: shippingCost,
              estimatedDays: shippingMethod.estimatedDays,
            }
          : undefined,
      })

      if (user.email) {
        const baseUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

        try {
          const emailResponse = await fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "payment-confirmation",
              email: user.email,
              orderDetails: {
                orderId: newOrder.id,
                userName: user.name || "Customer",
                total: `$${total.toFixed(2)}`,
                items: orderItems.map((item) => ({
                  name: item.product.name,
                  quantity: item.quantity,
                  price: `$${item.price.toFixed(2)}`,
                })),
                shippingAddress: `${newOrder.shippingAddress.name}, ${newOrder.shippingAddress.street}, ${newOrder.shippingAddress.city}, ${newOrder.shippingAddress.state} ${newOrder.shippingAddress.zipCode}`,
                trackingUrl: `${baseUrl}/dashboard/orders/${newOrder.id}`,
              },
            }),
          })

          await emailResponse.json()
        } catch {
          // Email sending failed silently
        }
      }
    } catch {
      // Order creation error handled silently
    }

    setStep("success")
    clearCart()
    setIsProcessing(false)
  }

  const downloadReceipt = () => {
    const itemsForReceipt = purchasedItems.length > 0 ? purchasedItems : items
    const receiptSubtotal = itemsForReceipt.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const receiptTax = calculateTax(receiptSubtotal - totalDiscountAmount)
    const receiptTotal = total

    let cardLast4 = "****"
    if (paymentMode === "saved" && selectedPaymentMethodId) {
      const selectedMethod = savedPaymentMethods.find((m) => m.id === selectedPaymentMethodId)
      if (selectedMethod) {
        cardLast4 = selectedMethod.last4
      }
    } else if (paymentData.cardNumber) {
      cardLast4 = paymentData.cardNumber.slice(-4)
    }

    const receiptData = {
      receiptNumber,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      subtotal: receiptSubtotal.toFixed(2),
      discounts: totalDiscountAmount.toFixed(2),
      tax: receiptTax.toFixed(2),
      total: receiptTotal.toFixed(2),
      paymentMethod: `**** **** **** ${cardLast4}`,
      status: "PAID",
    }

    let receiptText = `
E-APPARELS RECEIPT
================
Receipt #: ${receiptData.receiptNumber}
Date: ${receiptData.date}
Time: ${receiptData.time}

ITEMS PURCHASED:
----------------
`

    itemsForReceipt.forEach((item) => {
      receiptText += `${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}\n`
    })

    receiptText += `
----------------
Subtotal: $${receiptData.subtotal}
`

    if (appliedDiscounts.length > 0) {
      receiptText += `Discounts Applied:\n`
      appliedDiscounts.forEach((discount) => {
        receiptText += `  ${discount.discountCode}: -$${discount.discountAmount.toFixed(2)}\n`
      })
      receiptText += `Total Discounts: -$${receiptData.discounts}\n`
    }

    receiptText += `Tax (13%): $${receiptData.tax}
Total: $${receiptData.total}

Payment Method: ${receiptData.paymentMethod}
Status: ${receiptData.status}

Thank you for shopping with E-Apparels!
================
    `

    const blob = new Blob([receiptText], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `E-Apparels-Receipt-${receiptNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const printReceipt = () => {
    const itemsForReceipt = purchasedItems.length > 0 ? purchasedItems : items
    const receiptSubtotal = itemsForReceipt.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const receiptTax = calculateTax(receiptSubtotal - totalDiscountAmount)
    const receiptTotal = total

    let cardLast4 = "****"
    if (paymentMode === "saved" && selectedPaymentMethodId) {
      const selectedMethod = savedPaymentMethods.find((m) => m.id === selectedPaymentMethodId)
      if (selectedMethod) {
        cardLast4 = selectedMethod.last4
      }
    } else if (paymentData.cardNumber) {
      cardLast4 = paymentData.cardNumber.slice(-4)
    }

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const discountSection =
      appliedDiscounts.length > 0
        ? `
      <div class="discounts">
        <h4>Discounts Applied:</h4>
        ${appliedDiscounts
          .map(
            (discount) => `
          <div class="item">
            <span>${discount.discountCode}</span>
            <span>-$${discount.discountAmount.toFixed(2)}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>E-Apparels Receipt - ${receiptNumber}</title>
          <style>
            body { font-family: monospace; max-width: 400px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .discounts { margin: 10px 0; padding: 10px; background: #f0f0f0; }
            .total-section { border-top: 1px solid #000; padding-top: 10px; margin-top: 10px; }
            .total { font-weight: bold; font-size: 1.1em; }
            .footer { text-align: center; margin-top: 20px; border-top: 2px solid #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>E-APPARELS RECEIPT</h2>
            <p>Receipt #: ${receiptNumber}</p>
            <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="items">
            <h3>ITEMS PURCHASED:</h3>
            ${itemsForReceipt
              .map(
                (item) => `
              <div class="item">
                <span>${item.product.name} x${item.quantity}</span>
                <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            `,
              )
              .join("")}
          </div>
          
          ${discountSection}
          
          <div class="total-section">
            <div class="item">
              <span>Subtotal:</span>
              <span>$${receiptSubtotal.toFixed(2)}</span>
            </div>
            ${
              appliedDiscounts.length > 0
                ? `
              <div class="item">
                <span>Total Discounts:</span>
                <span>-$${totalDiscountAmount.toFixed(2)}</span>
              </div>
            `
                : ""
            }
            <div class="item">
              <span>Tax (13%):</span>
              <span>$${receiptTax.toFixed(2)}</span>
            </div>
            <div class="item total">
              <span>Total:</span>
              <span>$${receiptTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Payment Method: **** **** **** ${cardLast4}</p>
            <p>Status: PAID</p>
            <p>Thank you for shopping with E-Apparels!</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(receiptHTML)
    printWindow.document.close()
    printWindow.print()
  }

  const handleClose = () => {
    setStep("review")
    setPurchasedItems([])
    setStockValidationError(null)
    setDeliveryData({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    })
    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      zipCode: "",
    })
    setReceiptNumber("")
    setSaveNewCard(false)
    onClose()
  }

  const displayItems = purchasedItems.length > 0 ? purchasedItems : items
  const displaySubtotal = displayItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const displayShippingCost = calculateShippingCost(selectedShippingMethodId, displaySubtotal)
  const displayTax = calculateTax(displaySubtotal - totalDiscountAmount)
  const displayTotal = displaySubtotal - totalDiscountAmount + displayTax + displayShippingCost
  const shippingMethod = getShippingMethodById(selectedShippingMethodId)

  const isPaymentValid = () => {
    if (paymentMode === "saved") {
      return selectedPaymentMethodId !== null
    } else {
      return paymentData.cardNumber && paymentData.cardholderName
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === "review" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FaShoppingCart className="h-5 w-5" />
                Review Your Order
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {isCartEmpty ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Your cart is empty. Please add items before proceeding to payment.
                    </p>
                    <Button onClick={handleClose} className="w-full">
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Items in Your Order</h3>
                      <div className="space-y-3 max-h-[200px] overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {onShippingMethodChange && (
                    <ShippingMethodSelector
                      selectedMethodId={selectedShippingMethodId}
                      onMethodChange={onShippingMethodChange}
                      subtotal={subtotal}
                    />
                  )}

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-medium">Shipping</span>
                            {shippingMethod && (
                              <span className="text-xs text-muted-foreground">
                                {shippingMethod.name} ({shippingMethod.estimatedDays})
                              </span>
                            )}
                          </div>
                          <span>
                            {shippingCost === 0 && shippingMethod && shippingMethod.price > 0 ? (
                              <div className="text-right">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  FREE
                                </Badge>
                                <div className="text-xs text-muted-foreground line-through">
                                  ${shippingMethod.price.toFixed(2)}
                                </div>
                              </div>
                            ) : (
                              `$${shippingCost.toFixed(2)}`
                            )}
                          </span>
                        </div>

                        {appliedDiscounts.map((discount) => (
                          <div key={discount.discountId} className="flex justify-between items-center text-green-600">
                            <div className="flex items-center space-x-1">
                              <FaTag className="h-3 w-3" />
                              <span className="text-sm">{discount.discountCode}</span>
                            </div>
                            <span>-${discount.discountAmount.toFixed(2)}</span>
                          </div>
                        ))}

                        <div className="flex justify-between items-center">
                          <span className="font-medium">Tax (13%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">Total Amount</span>
                          <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                      Back to Cart
                    </Button>
                    <Button onClick={() => setStep("delivery")} className="flex-1">
                      Continue to Delivery
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : step === "delivery" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FaTruck className="h-5 w-5" />
                Delivery Information
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="deliveryName">Full Name</Label>
                    <Input
                      id="deliveryName"
                      placeholder="Enter your full name"
                      value={deliveryData.fullName}
                      onChange={(e) => setDeliveryData((prev) => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryPhone">Phone Number</Label>
                    <Input
                      id="deliveryPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={deliveryData.phone}
                      onChange={(e) => setDeliveryData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryStreet">Street Address</Label>
                    <Input
                      id="deliveryStreet"
                      placeholder="123 Main Street"
                      value={deliveryData.street}
                      onChange={(e) => setDeliveryData((prev) => ({ ...prev, street: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryCity">City</Label>
                      <Input
                        id="deliveryCity"
                        placeholder="New York"
                        value={deliveryData.city}
                        onChange={(e) => setDeliveryData((prev) => ({ ...prev, city: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryState">State/Province</Label>
                      <Input
                        id="deliveryState"
                        placeholder="NY"
                        value={deliveryData.state}
                        onChange={(e) => setDeliveryData((prev) => ({ ...prev, state: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryZip">ZIP / Postal Code</Label>
                      <Input
                        id="deliveryZip"
                        placeholder="10001"
                        value={deliveryData.zipCode}
                        onChange={(e) => setDeliveryData((prev) => ({ ...prev, zipCode: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryCountry">Country</Label>
                      <Input
                        id="deliveryCountry"
                        placeholder="USA"
                        value={deliveryData.country}
                        onChange={(e) => setDeliveryData((prev) => ({ ...prev, country: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("review")} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button
                  onClick={() => setStep("payment")}
                  className="flex-1"
                  disabled={!deliveryData.fullName || !deliveryData.street || !deliveryData.city || !deliveryData.zipCode}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          </>
        ) : step === "payment" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FaCreditCard className="h-5 w-5" />
                Payment Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {stockValidationError && (
                <Alert className="border-red-200 bg-red-50">
                  <FaExclamationTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium text-red-800">Cannot Process Payment - Stock Issues</p>
                      {stockValidationError.removedItems.length > 0 && (
                        <div>
                          <p className="text-sm text-red-700">These items are no longer available:</p>
                          <ul className="text-sm text-red-700 ml-4 list-disc">
                            {stockValidationError.removedItems.map((item) => (
                              <li key={item.id}>{item.product.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {stockValidationError.updatedItems.length > 0 && (
                        <div>
                          <p className="text-sm text-red-700">These items have limited stock:</p>
                          <ul className="text-sm text-red-700 ml-4 list-disc">
                            {stockValidationError.updatedItems.map((item) => (
                              <li key={item.id}>
                                {item.product.name} (only {item.quantity} available)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-sm text-red-700">Please return to your cart to review the changes.</p>
                      <Button variant="outline" size="sm" onClick={handleClose} className="mt-2 bg-transparent">
                        Return to Cart
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {isCartEmpty ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Your cart is empty. Please add items before proceeding to payment.
                    </p>
                    <Button onClick={handleClose} className="w-full">
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Amount</span>
                          <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Label htmlFor="payment-method-select">Select Payment Method</Label>
                        <Select
                          value={paymentMode === "saved" ? selectedPaymentMethodId || "new" : "new"}
                          onValueChange={handlePaymentMethodSelect}
                        >
                          <SelectTrigger id="payment-method-select" className="w-full">
                            <SelectValue placeholder="Choose a payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            {savedPaymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                <div className="flex items-center gap-2">
                                  <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {method.brand} •••• {method.last4} - {method.cardholderName}
                                  </span>
                                  {method.isDefault && (
                                    <Badge variant="secondary" className="text-xs ml-2">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                            <SelectItem value="new">
                              <div className="flex items-center gap-2">
                                <FaCreditCard className="h-4 w-4 text-muted-foreground" />
                                <span>Use a different card</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                        maxLength={19}
                        disabled={paymentMode === "saved"}
                        className={paymentMode === "saved" ? "bg-muted" : ""}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                          maxLength={5}
                          disabled={paymentMode === "saved"}
                          className={paymentMode === "saved" ? "bg-muted" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                          maxLength={4}
                          disabled={paymentMode === "saved"}
                          className={paymentMode === "saved" ? "bg-muted" : ""}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        disabled={paymentMode === "saved"}
                        className={paymentMode === "saved" ? "bg-muted" : ""}
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Main Street"
                        value={paymentData.billingAddress}
                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={paymentData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={paymentData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
                          maxLength={5}
                        />
                      </div>
                    </div>

                    {paymentMode === "new" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="save-card"
                          checked={saveNewCard}
                          onCheckedChange={(checked) => setSaveNewCard(checked as boolean)}
                        />
                        <Label htmlFor="save-card" className="text-sm cursor-pointer">
                          Save this card for future purchases
                        </Label>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaLock className="h-4 w-4" />
                    Your payment information is secure and encrypted
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep("delivery")} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep("preview")}
                      disabled={!isPaymentValid() || isCartEmpty || stockValidationError !== null}
                      className="flex-1"
                    >
                      Review Payment
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : step === "preview" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FaCheckCircle className="h-5 w-5" />
                Review Your Payment
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Alert>
                <FaLock className="h-4 w-4" />
                <AlertDescription>
                  Please review all details below before confirming your payment.
                </AlertDescription>
              </Alert>

              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaShoppingCart className="h-4 w-4" />
                    Order Summary
                  </h3>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="relative h-8 w-8 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[150px]">{item.product.name} x{item.quantity}</span>
                        </div>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscounts.map((discount) => (
                      <div key={discount.discountId} className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <FaTag className="h-3 w-3" />
                          {discount.discountCode}
                        </span>
                        <span>-${discount.discountAmount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span>Shipping ({shippingMethod?.name})</span>
                      <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (13%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaTruck className="h-4 w-4" />
                    Delivery Address
                  </h3>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{deliveryData.fullName}</p>
                    <p className="text-muted-foreground">{deliveryData.phone}</p>
                    <p className="text-muted-foreground">{deliveryData.street}</p>
                    <p className="text-muted-foreground">
                      {deliveryData.city}, {deliveryData.state} {deliveryData.zipCode}
                    </p>
                    <p className="text-muted-foreground">{deliveryData.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FaCreditCard className="h-4 w-4" />
                    Payment Method
                  </h3>
                  <div className="text-sm space-y-1">
                    {paymentMode === "saved" && selectedPaymentMethodId ? (
                      <>
                        {(() => {
                          const selectedMethod = savedPaymentMethods.find((m) => m.id === selectedPaymentMethodId)
                          return selectedMethod ? (
                            <>
                              <p className="font-medium">{selectedMethod.brand} ending in {selectedMethod.last4}</p>
                              <p className="text-muted-foreground">{selectedMethod.cardholderName}</p>
                              <p className="text-muted-foreground">
                                Expires {selectedMethod.expiryMonth?.toString().padStart(2, "0")}/{selectedMethod.expiryYear}
                              </p>
                            </>
                          ) : null
                        })()}
                      </>
                    ) : (
                      <>
                        <p className="font-medium">Card ending in {paymentData.cardNumber.slice(-4)}</p>
                        <p className="text-muted-foreground">{paymentData.cardholderName}</p>
                        <p className="text-muted-foreground">Expires {paymentData.expiryDate}</p>
                      </>
                    )}
                    {paymentData.billingAddress && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Billing Address:</p>
                        <p className="text-muted-foreground">
                          {paymentData.billingAddress}, {paymentData.city} {paymentData.zipCode}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaLock className="h-4 w-4" />
                Your payment information is secure and encrypted
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("payment")} className="flex-1 bg-transparent">
                  Edit Payment
                </Button>
                <Button
                  onClick={processPayment}
                  disabled={isProcessing || isCartEmpty}
                  className="flex-1"
                >
                  {isProcessing ? "Processing..." : "Confirm & Pay"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <FaCheckCircle className="h-5 w-5" />
                Payment Successful!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground">Your payment has been processed successfully.</p>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Order Details</h3>
                  <div className="space-y-2">
                    {displayItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <span>
                          {item.product.name} x{item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Subtotal:</span>
                      <span>${displaySubtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscounts.map((discount) => (
                      <div key={discount.discountId} className="flex justify-between items-center text-green-600">
                        <div className="flex items-center space-x-1">
                          <FaTag className="h-3 w-3" />
                          <span className="text-sm">{discount.discountCode}</span>
                        </div>
                        <span>-${discount.discountAmount.toFixed(2)}</span>
                      </div>
                    ))}

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span>Shipping:</span>
                        {shippingMethod && (
                          <span className="text-xs text-muted-foreground">
                            {shippingMethod.name} ({shippingMethod.estimatedDays})
                          </span>
                        )}
                      </div>
                      <span>
                        {displayShippingCost === 0 && shippingMethod && shippingMethod.price > 0 ? (
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              FREE
                            </Badge>
                            <div className="text-xs text-muted-foreground line-through">
                              ${shippingMethod.price.toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          `$${displayShippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Tax (13%):</span>
                      <span>${displayTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span>Total:</span>
                      <span>${displayTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Receipt Number:</span>
                      <span className="font-mono">{receiptNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={printReceipt} className="flex-1 bg-transparent">
                  Print Receipt
                </Button>
                <Button variant="outline" onClick={downloadReceipt} className="flex-1 bg-transparent">
                  Download Receipt
                </Button>
              </div>

              <Button onClick={handleClose} className="w-full">
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
