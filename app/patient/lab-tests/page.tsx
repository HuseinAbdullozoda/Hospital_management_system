"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FlaskConical,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Download,
  Calendar,
  Hospital,
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
    { icon: ShoppingCart, label: "Lab Tests", href: "/patient/lab-tests", active: true },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
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

export default function LabTestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const availableTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis including RBC, WBC, platelets",
      price: 45.0,
      category: "Blood Tests",
      preparationRequired: false,
      reportTime: "24 hours",
    },
    {
      id: 2,
      name: "Lipid Profile",
      description: "Cholesterol and triglyceride levels",
      price: 35.0,
      category: "Blood Tests",
      preparationRequired: true,
      reportTime: "24 hours",
    },
    {
      id: 3,
      name: "Thyroid Function Test",
      description: "TSH, T3, T4 levels",
      price: 55.0,
      category: "Hormone Tests",
      preparationRequired: false,
      reportTime: "48 hours",
    },
    {
      id: 4,
      name: "Chest X-Ray",
      description: "Digital chest radiography",
      price: 80.0,
      category: "Imaging",
      preparationRequired: false,
      reportTime: "2 hours",
    },
    {
      id: 5,
      name: "Urine Analysis",
      description: "Complete urine examination",
      price: 25.0,
      category: "Urine Tests",
      preparationRequired: false,
      reportTime: "6 hours",
    },
  ]

  const myReports = [
    {
      id: 1,
      testName: "Complete Blood Count",
      date: "2024-01-10",
      status: "completed",
      result: "Normal",
      hospital: "City General Hospital",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      testName: "Lipid Profile",
      date: "2024-01-08",
      status: "completed",
      result: "Abnormal",
      hospital: "Metro Medical Center",
      doctor: "Dr. Michael Chen",
    },
    {
      id: 3,
      testName: "Thyroid Function Test",
      date: "2024-01-15",
      status: "processing",
      result: "Pending",
      hospital: "Regional Health Institute",
      doctor: "Dr. Emily Davis",
    },
  ]

  const filteredTests = availableTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (testId: number) => {
    setCart((prev) => ({
      ...prev,
      [testId]: (prev[testId] || 0) + 1,
    }))
  }

  const removeFromCart = (testId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[testId] > 1) {
        newCart[testId]--
      } else {
        delete newCart[testId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [testId, quantity]) => {
      const test = availableTests.find((t) => t.id === Number.parseInt(testId))
      return total + (test ? test.price * quantity : 0)
    }, 0)
  }

  return (
    <DashboardLayout title="Lab Tests" sidebar={<PatientSidebar />}>
      <div className="space-y-6">
        <Tabs defaultValue="book" className="space-y-4">
          <TabsList>
            <TabsTrigger value="book">Book Tests</TabsTrigger>
            <TabsTrigger value="reports">My Reports ({myReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            {/* Search and Cart */}
            <div className="flex flex-col md:flex-row gap-4">
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search lab tests..."
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
                        <span className="font-medium">{getTotalItems()} tests</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${getTotalPrice().toFixed(2)}</p>
                        <Button size="sm" asChild>
                          <Link href="/patient/lab-tests/checkout">Checkout</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Available Tests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTests.map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {test.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${test.price}</p>
                      </div>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Report Time</p>
                          <p className="text-gray-600">{test.reportTime}</p>
                        </div>
                        <div>
                          <p className="font-medium">Preparation</p>
                          <p className="text-gray-600">{test.preparationRequired ? "Required" : "Not Required"}</p>
                        </div>
                      </div>

                      {test.preparationRequired && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Preparation Required:</strong> Fasting for 12 hours before the test
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {cart[test.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => removeFromCart(test.id)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{cart[test.id]}</span>
                            <Button size="sm" variant="outline" onClick={() => addToCart(test.id)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => addToCart(test.id)} className="w-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {myReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{report.testName}</h3>
                          <p className="text-gray-600">{report.hospital}</p>
                          <p className="text-sm text-gray-500">Ordered by: {report.doctor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{report.date}</p>
                          <Badge
                            variant={
                              report.status === "completed"
                                ? report.result === "Normal"
                                  ? "default"
                                  : "destructive"
                                : "secondary"
                            }
                          >
                            {report.status === "completed" ? report.result : report.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:ml-6">
                      {report.status === "completed" && (
                        <>
                          <Button size="sm" asChild>
                            <Link href={`/patient/lab-tests/reports/${report.id}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              View Report
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/patient/chat?doctor=${report.doctor}`}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Discuss Results
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {myReports.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No lab reports yet</h3>
                  <p className="text-gray-600 mb-4">Your lab test results will appear here</p>
                  <Button asChild>
                    <Link href="#book">Book a Test</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
