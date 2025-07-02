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
  CheckCircle,
  TestTube,
  FileText,
  Pill,
  MessageCircle,
  Settings,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

function PatientSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: TestTube, label: "Lab Tests", href: "/patient/lab-tests", active: true },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
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

export default function LabTestsCheckout() {
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const selectedTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis",
      price: 45.0,
      lab: "City Lab Services",
    },
    {
      id: 2,
      name: "Lipid Profile",
      description: "Cholesterol and triglycerides test",
      price: 35.0,
      lab: "Metro Diagnostics",
    },
  ]

  const subtotal = selectedTests.reduce((sum, test) => sum + test.price, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)

    toast({
      title: "Order Placed Successfully!",
      description: "Your lab tests have been scheduled. You'll receive confirmation shortly.",
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
              <p className="text-gray-600 mb-6">Your lab tests have been successfully scheduled. Order #LT-2024-001</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• You'll receive a confirmation email within 5 minutes</li>
                  <li>• The lab will contact you to schedule your appointment</li>
                  <li>• Results will be available in 2-3 business days</li>
                </ul>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button asChild>
                  <Link href="/patient/lab-tests">View My Tests</Link>
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
    <DashboardLayout title="Lab Tests Checkout" sidebar={<PatientSidebar />}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selected Tests</CardTitle>
                <CardDescription>Review your selected lab tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <TestTube className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{test.name}</h4>
                          <p className="text-sm text-gray-600">{test.description}</p>
                          <p className="text-sm text-gray-500">{test.lab}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${test.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appointment Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Appointment</CardTitle>
                <CardDescription>Choose your preferred time and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input type="date" id="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input type="time" id="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Lab Location</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>City Lab Services - Downtown</option>
                    <option>Metro Diagnostics - Midtown</option>
                    <option>HealthCare Labs - Uptown</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea id="notes" placeholder="Any special requirements or notes..." className="h-20" />
                </div>
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
                  {selectedTests.map((test) => (
                    <div key={test.id} className="flex justify-between text-sm">
                      <span>{test.name}</span>
                      <span>${test.price.toFixed(2)}</span>
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
