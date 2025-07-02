"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pill, Package, ShoppingCart, Plus, Settings, Camera, Upload } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

function PharmacistSidebar() {
  const menuItems = [
    { icon: Pill, label: "Dashboard", href: "/pharmacist/dashboard" },
    { icon: Package, label: "Inventory", href: "/pharmacist/inventory" },
    { icon: ShoppingCart, label: "Orders", href: "/pharmacist/orders" },
    { icon: Plus, label: "Add Medicine", href: "/pharmacist/medicines/new", active: true },
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

export default function AddMedicine() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [medicineData, setMedicineData] = useState({
    name: "",
    genericName: "",
    brand: "",
    category: "",
    dosage: "",
    form: "",
    strength: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    manufactureDate: "",
    price: "",
    costPrice: "",
    quantity: "",
    minStockLevel: "",
    maxStockLevel: "",
    location: "",
    barcode: "",
    description: "",
    sideEffects: "",
    contraindications: "",
    storage: "",
    prescriptionRequired: false,
    photo: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMedicineData((prev) => ({
          ...prev,
          photo: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setMedicineData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Medicine Added Successfully!",
        description: `${medicineData.name} has been added to your inventory.`,
      })

      // Reset form or redirect
      router.push("/pharmacist/inventory")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add medicine. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout title="Add New Medicine" sidebar={<PharmacistSidebar />}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the medicine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Medicine Name *</Label>
                  <Input
                    id="name"
                    value={medicineData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Paracetamol"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="genericName">Generic Name</Label>
                  <Input
                    id="genericName"
                    value={medicineData.genericName}
                    onChange={(e) => handleInputChange("genericName", e.target.value)}
                    placeholder="e.g., Acetaminophen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={medicineData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    placeholder="e.g., Tylenol"
                  />
                </div>
                <div>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    value={medicineData.manufacturer}
                    onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                    placeholder="e.g., Johnson & Johnson"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={medicineData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Vitamins">Vitamins & Supplements</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Digestive">Digestive Health</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="form">Form *</Label>
                  <select
                    id="form"
                    value={medicineData.form}
                    onChange={(e) => handleInputChange("form", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Form</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream">Cream</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Drops">Drops</option>
                    <option value="Inhaler">Inhaler</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="strength">Strength *</Label>
                  <Input
                    id="strength"
                    value={medicineData.strength}
                    onChange={(e) => handleInputChange("strength", e.target.value)}
                    placeholder="e.g., 500mg"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={medicineData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the medicine..."
                  className="h-20"
                />
              </div>

              <div>
                <Label htmlFor="medicinePhoto">Medicine Photo</Label>
                <div className="mt-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {medicineData.photo ? (
                        <img
                          src={medicineData.photo || "/placeholder.svg"}
                          alt="Medicine"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-500">Upload Photo</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Camera className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Details */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
              <CardDescription>Stock and pricing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Current Stock Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={medicineData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    value={medicineData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Shelf A-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                  <Input
                    id="minStockLevel"
                    type="number"
                    value={medicineData.minStockLevel}
                    onChange={(e) => handleInputChange("minStockLevel", e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div>
                  <Label htmlFor="maxStockLevel">Maximum Stock Level</Label>
                  <Input
                    id="maxStockLevel"
                    type="number"
                    value={medicineData.maxStockLevel}
                    onChange={(e) => handleInputChange("maxStockLevel", e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="costPrice">Cost Price ($)</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={medicineData.costPrice}
                    onChange={(e) => handleInputChange("costPrice", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Selling Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={medicineData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="barcode">Barcode/SKU</Label>
                <Input
                  id="barcode"
                  value={medicineData.barcode}
                  onChange={(e) => handleInputChange("barcode", e.target.value)}
                  placeholder="Enter barcode or SKU"
                />
              </div>
            </CardContent>
          </Card>

          {/* Batch Information */}
          <Card>
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
              <CardDescription>Manufacturing and expiry details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={medicineData.batchNumber}
                    onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                    placeholder="e.g., BT2024001"
                  />
                </div>
                <div>
                  <Label htmlFor="manufactureDate">Manufacture Date</Label>
                  <Input
                    id="manufactureDate"
                    type="date"
                    value={medicineData.manufactureDate}
                    onChange={(e) => handleInputChange("manufactureDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={medicineData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="storage">Storage Conditions</Label>
                  <Input
                    id="storage"
                    value={medicineData.storage}
                    onChange={(e) => handleInputChange("storage", e.target.value)}
                    placeholder="e.g., Store in cool, dry place"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Usage and safety information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sideEffects">Side Effects</Label>
                <Textarea
                  id="sideEffects"
                  value={medicineData.sideEffects}
                  onChange={(e) => handleInputChange("sideEffects", e.target.value)}
                  placeholder="List common side effects..."
                  className="h-20"
                />
              </div>

              <div>
                <Label htmlFor="contraindications">Contraindications</Label>
                <Textarea
                  id="contraindications"
                  value={medicineData.contraindications}
                  onChange={(e) => handleInputChange("contraindications", e.target.value)}
                  placeholder="List contraindications and warnings..."
                  className="h-20"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="prescriptionRequired"
                  checked={medicineData.prescriptionRequired}
                  onChange={(e) => handleInputChange("prescriptionRequired", e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="prescriptionRequired">Prescription Required</Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/pharmacist/inventory">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding Medicine..." : "Add Medicine"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
