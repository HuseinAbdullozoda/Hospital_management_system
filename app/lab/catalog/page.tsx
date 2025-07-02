"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, FileText, Users, Settings, TestTube, Search, Plus, Edit, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

function LabSidebar() {
  const menuItems = [
    { icon: FlaskConical, label: "Dashboard", href: "/lab/dashboard" },
    { icon: TestTube, label: "Assigned Tests", href: "/lab/tests" },
    { icon: FileText, label: "Reports", href: "/lab/reports" },
    { icon: Users, label: "Patients", href: "/lab/patients" },
    { icon: Settings, label: "Test Catalog", href: "/lab/catalog", active: true },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
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

export default function TestCatalog() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isNewTestOpen, setIsNewTestOpen] = useState(false)

  const [tests, setTests] = useState([
    {
      id: "T001",
      name: "Complete Blood Count",
      category: "Hematology",
      description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin",
      sampleType: "Blood",
      turnaroundTime: "2-4 hours",
      price: 45.0,
      preparation: "No special preparation required",
      normalRange: "Varies by component",
      active: true,
    },
    {
      id: "T002",
      name: "Lipid Panel",
      category: "Chemistry",
      description: "Cholesterol and triglyceride levels assessment",
      sampleType: "Blood",
      turnaroundTime: "4-6 hours",
      price: 65.0,
      preparation: "12-hour fasting required",
      normalRange: "Total Cholesterol: <200 mg/dL",
      active: true,
    },
    {
      id: "T003",
      name: "Urine Analysis",
      category: "Urinalysis",
      description: "Comprehensive urine examination for infections and abnormalities",
      sampleType: "Urine",
      turnaroundTime: "1-2 hours",
      price: 25.0,
      preparation: "Mid-stream clean catch sample",
      normalRange: "No bacteria, protein, or blood",
      active: true,
    },
    {
      id: "T004",
      name: "Thyroid Function Test",
      category: "Endocrinology",
      description: "TSH, T3, and T4 levels to assess thyroid function",
      sampleType: "Blood",
      turnaroundTime: "6-8 hours",
      price: 85.0,
      preparation: "No special preparation required",
      normalRange: "TSH: 0.4-4.0 mIU/L",
      active: true,
    },
    {
      id: "T005",
      name: "X-Ray Chest",
      category: "Radiology",
      description: "Chest X-ray for lung and heart examination",
      sampleType: "Imaging",
      turnaroundTime: "30 minutes",
      price: 120.0,
      preparation: "Remove all metal objects",
      normalRange: "No abnormalities detected",
      active: true,
    },
    {
      id: "T006",
      name: "HbA1c",
      category: "Chemistry",
      description: "Glycated hemoglobin test for diabetes monitoring",
      sampleType: "Blood",
      turnaroundTime: "4-6 hours",
      price: 55.0,
      preparation: "No fasting required",
      normalRange: "<5.7% (Normal)",
      active: false,
    },
  ])

  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    description: "",
    sampleType: "",
    turnaroundTime: "",
    price: "",
    preparation: "",
    normalRange: "",
  })

  const categories = [
    "Hematology",
    "Chemistry",
    "Urinalysis",
    "Endocrinology",
    "Radiology",
    "Microbiology",
    "Immunology",
  ]

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || test.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateTest = () => {
    const newTestItem = {
      id: `T${String(tests.length + 1).padStart(3, "0")}`,
      name: newTest.name,
      category: newTest.category,
      description: newTest.description,
      sampleType: newTest.sampleType,
      turnaroundTime: newTest.turnaroundTime,
      price: Number.parseFloat(newTest.price),
      preparation: newTest.preparation,
      normalRange: newTest.normalRange,
      active: true,
    }

    setTests((prev) => [...prev, newTestItem])
    setIsNewTestOpen(false)
    setNewTest({
      name: "",
      category: "",
      description: "",
      sampleType: "",
      turnaroundTime: "",
      price: "",
      preparation: "",
      normalRange: "",
    })

    toast({
      title: "Test Added",
      description: `${newTestItem.name} has been added to the test catalog.`,
    })
  }

  const toggleTestStatus = (testId: string) => {
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, active: !test.active } : test)))
    toast({
      title: "Test Status Updated",
      description: "Test availability has been updated.",
    })
  }

  return (
    <DashboardLayout title="Test Catalog" sidebar={<LabSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tests by name, category, or description..."
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
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Dialog open={isNewTestOpen} onOpenChange={setIsNewTestOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Test</DialogTitle>
                  <DialogDescription>Add a new test to the laboratory catalog</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testName">Test Name</Label>
                      <Input
                        id="testName"
                        value={newTest.name}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Complete Blood Count"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newTest.category}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTest.description}
                      onChange={(e) => setNewTest((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the test..."
                      className="h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sampleType">Sample Type</Label>
                      <select
                        id="sampleType"
                        value={newTest.sampleType}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, sampleType: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Sample Type</option>
                        <option value="Blood">Blood</option>
                        <option value="Urine">Urine</option>
                        <option value="Stool">Stool</option>
                        <option value="Saliva">Saliva</option>
                        <option value="Imaging">Imaging</option>
                        <option value="Tissue">Tissue</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="turnaroundTime">Turnaround Time</Label>
                      <Input
                        id="turnaroundTime"
                        value={newTest.turnaroundTime}
                        onChange={(e) => setNewTest((prev) => ({ ...prev, turnaroundTime: e.target.value }))}
                        placeholder="2-4 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newTest.price}
                      onChange={(e) => setNewTest((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="45.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preparation">Preparation Instructions</Label>
                    <Textarea
                      id="preparation"
                      value={newTest.preparation}
                      onChange={(e) => setNewTest((prev) => ({ ...prev, preparation: e.target.value }))}
                      placeholder="Special preparation instructions..."
                      className="h-16"
                    />
                  </div>

                  <div>
                    <Label htmlFor="normalRange">Normal Range</Label>
                    <Input
                      id="normalRange"
                      value={newTest.normalRange}
                      onChange={(e) => setNewTest((prev) => ({ ...prev, normalRange: e.target.value }))}
                      placeholder="Normal range values..."
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsNewTestOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTest}>Add Test</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className={!test.active ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription>Test ID: {test.id}</CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{test.category}</Badge>
                      <Badge variant={test.active ? "default" : "secondary"}>
                        {test.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={test.active ? "destructive" : "default"}
                      onClick={() => toggleTestStatus(test.id)}
                    >
                      {test.active ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{test.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Sample Type:</span>
                      <p className="text-gray-900">{test.sampleType}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Turnaround Time:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{test.turnaroundTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Price:</span>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-semibold">${test.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Preparation:</span>
                    <p className="text-gray-900">{test.preparation}</p>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Normal Range:</span>
                    <p className="text-gray-900">{test.normalRange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => setIsNewTestOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Test
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
