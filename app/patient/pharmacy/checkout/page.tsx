"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  User,
  MapPin,
  CheckCircle,
  TestTube,
  FileText,
  Pill,
  MessageCircle,
  Settings,
  Stethoscope,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

function PatientSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: TestTube, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy", active: true },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: User, label: "Profile", href: "/patient/profile" },
    { icon: Settings, label: "Settings", href: "/patient/settings" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function PharmacyCheckout() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")

  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Pain relief tablets",
      quantity: 2,
      price: 12.5,
      pharmacy: "City Pharmacy",
    },
    {
      id: 2,
      name: "Vitamin D3 1000IU",
      description: "Dietary supplement",
      quantity: 1,
      price: 25.0,
      pharmacy: "HealthMart Pharmacy",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = deliveryMethod === "delivery" ? 5.0 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)

    toast({
      title: "Order Placed Successfully!",
      description: "Your pharmacy order has been confirmed. You'll receive updates shortly.",
    })
  }

  if (orderComplete) {
    return (
      <DashboardLayout title="Order Confirmation" sidebar={<PatientSidebar />}>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">Your pharmacy order has been successfully placed. Order #PH-2024-001</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Order Details</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Delivery Method:</strong>{" "}
                    {deliveryMethod === "delivery" ? "Home Delivery" : "Pharmacy Pickup"}
                  </p>
                  <p>
                    <strong>Estimated Time:</strong>{" "}
                    {deliveryMethod === "delivery" ? "2-4 hours" : "Ready in 30 minutes"}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ${total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button asChild>
                  <Link href="/patient/pharmacy">View My Orders</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/patient/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Pharmacy Checkout" sidebar={<PatientSidebar />}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
                <CardDescription>Review your selected medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Pill className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-500">{item.pharmacy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
                <CardDescription>Choose how you'd like to receive your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="delivery"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === "delivery"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Truck className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Home Delivery</p>
                            <p className="text-sm text-gray-600">Delivered to your doorstep in 2-4 hours</p>
                          </div>
                        </div>
                        <span className="font-medium">$5.00</span>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="pickup"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === "pickup"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Pharmacy Pickup</p>
                            <p className="text-sm text-gray-600">Ready for pickup in 30 minutes</p>
                          </div>
                        </div>
                        <span className="font-medium">Free</span>
                      </div>
                    </label>
                  </div>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <div className="space-y-2">
                      <Input placeholder="Street Address" />
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="City" />
                        <Input placeholder="ZIP Code" />
                      </div>
                      <Textarea placeholder="Delivery instructions (optional)" className="h-16" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full" onClick={handlePlaceOrder} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>By placing this order, you agree to our terms and conditions.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
