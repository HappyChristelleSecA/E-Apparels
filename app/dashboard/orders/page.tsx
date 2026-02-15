"use client"

import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getOrdersByUserId,
  getOrderStatusColor,
  getOrderStatusText,
  getOrderTracking,
  canReturnOrder,
  canCancelOrder,
  requestReturn,
  cancelOrder,
} from "@/lib/orders"
import { OrderTrackingCard } from "@/components/orders/order-tracking-card"
import { OrderTrackingTimeline } from "@/components/orders/order-tracking-timeline"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FaBox, FaTruck, FaChevronDown, FaChevronUp, FaUndo, FaTimes } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [returnDialogOrderId, setReturnDialogOrderId] = useState<string | null>(null)
  const [cancelDialogOrderId, setCancelDialogOrderId] = useState<string | null>(null)
  const [returnReason, setReturnReason] = useState("")
  const [cancelReason, setCancelReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/auth")
    }
  }, [isAuthenticated, user, isLoading, router])

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const handleRequestReturn = async (orderId: string) => {
    setIsProcessing(true)
    const success = requestReturn(orderId, returnReason)
    if (success) {
      setReturnDialogOrderId(null)
      setReturnReason("")
      router.refresh()
    }
    setIsProcessing(false)
  }

  const handleCancelOrder = async (orderId: string) => {
    setIsProcessing(true)
    const success = cancelOrder(orderId, cancelReason)
    if (success) {
      setCancelDialogOrderId(null)
      setCancelReason("")
      router.refresh()
    }
    setIsProcessing(false)
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Order History" description="View and track all your orders">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const orders = getOrdersByUserId(user.id)

  return (
    <DashboardLayout title="Order History" description="View and track all your orders">
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrders.has(order.id)
            const tracking = getOrderTracking(order.id)

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Link href={`/dashboard/orders/${order.id}`} className="hover:text-primary">
                        <CardTitle className="text-lg cursor-pointer hover:underline">Order #{order.id}</CardTitle>
                      </Link>
                      <p className="text-sm text-muted-foreground">Placed on {order.orderDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getOrderStatusColor(order.status)}>{getOrderStatusText(order.status)}</Badge>
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity} • ${item.price} each
                            </p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Subtotal:</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Shipping:</span>
                        <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tax:</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Shipping Address and Action Buttons */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Shipping Address</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shippingAddress.name}
                            <br />
                            {order.shippingAddress.street}
                            <br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          </p>
                          {order.estimatedDelivery && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button asChild variant="default" size="sm">
                            <Link href={`/dashboard/orders/${order.id}`}>
                              <FaBox className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          {order.status !== "pending" && (
                            <Button variant="outline" size="sm" onClick={() => toggleOrderExpansion(order.id)}>
                              <FaTruck className="h-4 w-4 mr-2" />
                              {isExpanded ? "Hide Tracking" : "Track Order"}
                              {isExpanded ? (
                                <FaChevronUp className="h-3 w-3 ml-2" />
                              ) : (
                                <FaChevronDown className="h-3 w-3 ml-2" />
                              )}
                            </Button>
                          )}
                          {canReturnOrder(order) && (
                            <Dialog
                              open={returnDialogOrderId === order.id}
                              onOpenChange={(open) => {
                                setReturnDialogOrderId(open ? order.id : null)
                                if (!open) setReturnReason("")
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 bg-transparent border-orange-300"
                                >
                                  <FaUndo className="h-4 w-4 mr-2" />
                                  Return Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Return Order #{order.id}</DialogTitle>
                                  <DialogDescription>
                                    Request a return for this order. Returns are accepted within 30 days of delivery. Our
                                    team will review your request and provide return instructions.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor={`return-reason-${order.id}`}>Reason for return</Label>
                                    <Textarea
                                      id={`return-reason-${order.id}`}
                                      placeholder="Please describe the reason for your return request..."
                                      value={returnReason}
                                      onChange={(e) => setReturnReason(e.target.value)}
                                      className="mt-2"
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setReturnDialogOrderId(null)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleRequestReturn(order.id)}
                                    disabled={isProcessing || !returnReason.trim()}
                                  >
                                    {isProcessing ? "Requesting..." : "Request Return"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                          {canCancelOrder(order) && (
                            <Dialog
                              open={cancelDialogOrderId === order.id}
                              onOpenChange={(open) => {
                                setCancelDialogOrderId(open ? order.id : null)
                                if (!open) setCancelReason("")
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent border-red-300"
                                >
                                  <FaTimes className="h-4 w-4 mr-2" />
                                  Cancel Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Cancel Order #{order.id}</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to cancel this order? This action cannot be undone. You can
                                    cancel orders within 24 hours of placement.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor={`cancel-reason-${order.id}`}>
                                      Reason for cancellation (optional)
                                    </Label>
                                    <Textarea
                                      id={`cancel-reason-${order.id}`}
                                      placeholder="Please let us know why you're cancelling this order..."
                                      value={cancelReason}
                                      onChange={(e) => setCancelReason(e.target.value)}
                                      className="mt-2"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setCancelDialogOrderId(null)}>
                                    Keep Order
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleCancelOrder(order.id)}
                                    disabled={isProcessing}
                                  >
                                    {isProcessing ? "Cancelling..." : "Cancel Order"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>

                      {isExpanded && tracking && (
                        <div className="space-y-4 mt-4">
                          <OrderTrackingCard order={order} tracking={tracking} />
                          <OrderTrackingTimeline events={tracking.events} currentStatus={tracking.currentStatus} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FaBox className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">When you place your first order, it will appear here.</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
