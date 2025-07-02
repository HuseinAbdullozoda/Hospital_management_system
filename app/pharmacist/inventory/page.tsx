"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Pill, Package, ShoppingCart, Plus, Settings, Search, AlertTriangle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

function PharmacistSidebar() {
  const menuItems = [
    { icon: Pill, label: "Dashboard", href: "/pharmacist/dashboard" },
    { icon: Package, label: "Inventory", href: "/pharmacist/inventory", active: true },
    { icon: ShoppingCart, label: "Orders", href: "/pharmacist/orders" },
    { icon: Plus, label: "Add Medicine", href: "/pharmacist/medicines/new" },
    { icon: Settings, label: "Settings", href: "/pharmacist/settings" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
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

export default function PharmacistInventory() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStock, setFilterStock] = useState("all")

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      genericName: "Acetaminophen",
      brand: "Tylenol",
      category: "Pain Relief",
      form: "Tablet",
      strength: "500mg",
      quantity: 150,
      minStock: 50,
      maxStock: 200,
      price: 12.5,
      costPrice: 8.0,
      expiryDate: "2025-06-15",
      batchNumber: "BT2024001",
      location: "A-1",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      genericName: "Amoxicillin",
      brand: "Amoxil",
      category: "Antibiotics",
      form: "Capsule",
      strength: "250mg",
      quantity: 25,
      minStock: 30,
      maxStock: 100,
      price: 18.75,
      costPrice: 12.5,
      expiryDate: "2024-12-20",
      batchNumber: "BT2024002",
      location: "B-2",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Vitamin D3 1000IU",
      genericName: "Cholecalciferol",
      brand: "Nature Made",
      category: "Vitamins",
      form: "Tablet",
      strength: "1000IU",
      quantity: 0,
      minStock: 20,
      maxStock: 80,
      price: 25.0,
      costPrice: 15.0,
      expiryDate: "2025-03-10",
      batchNumber: "BT2024003",
      location: "C-3",
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Lisinopril 10mg",
      genericName: "Lisinopril",
      brand: "Prinivil",
      category: "Cardiovascular",
      form: "Tablet",
      strength: "10mg",
      quantity: 75,
      minStock: 25,
      maxStock: 100,
      price: 22.0,
      costPrice: 14.0,
      expiryDate: "2024-08-30",
      batchNumber: "BT2024004",
      location: "D-1",
      status: "In Stock",
    },
    {
      id: 5,
      name: "Metformin 500mg",
      genericName: "Metformin HCl",
      brand: "Glucophage",
      category: "Diabetes",
      form: "Tablet",
      strength: "500mg",
      quantity: 120,
      minStock: 40,
      maxStock: 150,
      price: 15.5,
      costPrice: 10.0,
      expiryDate: "2025-01-15",
      batchNumber: "BT2024005",
      location: "E-2",
      status: "In Stock",
    },
  ]

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || medicine.category === filterCategory
    const matchesStock =
      filterStock === "all" ||
      (filterStock === "low" && medicine.status === "Low Stock") ||
      (filterStock === "out" && medicine.status === "Out of Stock") ||
      (filterStock === "in" && medicine.status === "In Stock")
    return matchesSearch && matchesCategory && matchesStock
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default"
      case "Low Stock":
        return "secondary"
      case "Out of Stock":
        return "destructive"
      default:
        return "outline"
    }
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 90 && diffDays > 0
  }

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }

  const handleDeleteMedicine = (medicineId: number) => {
    // In real app, this would make an API call
    toast({
      title: "Medicine Deleted",
      description: "The medicine has been removed from inventory.",
    })
  }

  return (
    <DashboardLayout title="Medicine Inventory" sidebar={<PharmacistSidebar />}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Medicines</p>
                  <p className="text-2xl font-bold">{medicines.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {medicines.filter((m) => m.status === "Low Stock").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {medicines.filter((m) => m.status === "Out of Stock").length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {medicines.filter((m) => isExpiringSoon(m.expiryDate)).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search medicines by name, generic name, or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Diabetes">Diabetes</option>
                </select>
                <select
                  value={filterStock}
                  onChange={(e) => setFilterStock(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Stock</option>
                  <option value="in">In Stock</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
                <Button asChild>
                  <Link href="/pharmacist/medicines/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicines List */}
        <Card>
          <CardHeader>
            <CardTitle>Medicine Inventory</CardTitle>
            <CardDescription>{filteredMedicines.length} medicines found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <Pill className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{medicine.name}</h3>
                        <p className="text-gray-600">
                          {medicine.genericName} - {medicine.brand}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusColor(medicine.status)}>{medicine.status}</Badge>
                          <Badge variant="outline">{medicine.category}</Badge>
                          {isExpiringSoon(medicine.expiryDate) && <Badge variant="secondary">Expiring Soon</Badge>}
                          {isExpired(medicine.expiryDate) && <Badge variant="destructive">Expired</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteMedicine(medicine.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium">Form & Strength:</span>
                      <p className="text-gray-700">
                        {medicine.form} - {medicine.strength}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Current Stock:</span>
                      <p className="text-gray-700">{medicine.quantity} units</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-gray-700">Shelf {medicine.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Batch Number:</span>
                      <p className="text-gray-700">{medicine.batchNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Selling Price:</span>
                      <p className="text-gray-700">${medicine.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Cost Price:</span>
                      <p className="text-gray-700">${medicine.costPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Stock Range:</span>
                      <p className="text-gray-700">
                        {medicine.minStock} - {medicine.maxStock}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Expiry Date:</span>
                      <p
                        className={`${isExpiringSoon(medicine.expiryDate) ? "text-yellow-600" : isExpired(medicine.expiryDate) ? "text-red-600" : "text-gray-700"}`}
                      >
                        {medicine.expiryDate}
                      </p>
                    </div>
                  </div>

                  {medicine.quantity <= medicine.minStock && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-800">Stock is running low. Consider reordering soon.</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredMedicines.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No medicines found</p>
                  <Button asChild className="mt-4">
                    <Link href="/pharmacist/medicines/new">Add Your First Medicine</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
