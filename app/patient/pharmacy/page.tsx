"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Hospital,
  Calendar,
  MessageCircle,
  User,
  FileText,
  Pill,
} from "lucide-react"
import Link from "next/link"

function PatientSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: ShoppingCart, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy", active: true },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
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

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 12.5,
      inStock: true,
      description: "Effective pain relief and fever reducer",
      manufacturer: "PharmaCorp",
      requiresPrescription: false,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 25.0,
      inStock: true,
      description: "Broad-spectrum antibiotic",
      manufacturer: "MediLab",
      requiresPrescription: true,
    },
    {
      id: 3,
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      price: 18.75,
      inStock: true,
      description: "ACE inhibitor for blood pressure",
      manufacturer: "CardioMed",
      requiresPrescription: true,
    },
    {
      id: 4,
      name: "Vitamin D3 1000IU",
      category: "Supplements",
      price: 15.0,
      inStock: true,
      description: "Essential vitamin supplement",
      manufacturer: "HealthPlus",
      requiresPrescription: false,
    },
    {
      id: 5,
      name: "Metformin 500mg",
      category: "Diabetes",
      price: 22.0,
      inStock: false,
      description: "Diabetes medication",
      manufacturer: "DiabetCare",
      requiresPrescription: true,
    },
  ]

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (medicineId: number) => {
    setCart((prev) => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1,
    }))
  }

  const removeFromCart = (medicineId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [medicineId, quantity]) => {
      const medicine = medicines.find((m) => m.id === Number.parseInt(medicineId))
      return total + (medicine ? medicine.price * quantity : 0)
    }, 0)
  }

  return (
    <DashboardLayout title="Online Pharmacy" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        {/* Search and Cart Summary */}
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {getTotalItems() > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium">{getTotalItems()} items</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
                    <Button size="sm" asChild>
                      <Link href="/patient/pharmacy/checkout">Checkout</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className={`${!medicine.inStock ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {medicine.category}
                    </Badge>
                  </div>
                  {medicine.requiresPrescription && (
                    <Badge variant="destructive" className="text-xs">
                      Rx Required
                    </Badge>
                  )}
                </div>
                <CardDescription>{medicine.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Manufacturer: {medicine.manufacturer}</p>
                    <p className="text-2xl font-bold text-green-600">${medicine.price}</p>
                  </div>

                  {medicine.inStock ? (
                    <div className="flex items-center justify-between">
                      {cart[medicine.id] ? (
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => removeFromCart(medicine.id)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">{cart[medicine.id]}</span>
                          <Button size="sm" variant="outline" onClick={() => addToCart(medicine.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(medicine.id)}
                          disabled={medicine.requiresPrescription}
                          className="w-full"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button disabled className="w-full">
                      Out of Stock
                    </Button>
                  )}

                  {medicine.requiresPrescription && (
                    <p className="text-xs text-red-600">
                      * Prescription required. Upload prescription during checkout.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
