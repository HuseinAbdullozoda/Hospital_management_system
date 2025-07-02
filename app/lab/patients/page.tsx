"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FlaskConical,
  FileText,
  Users,
  Settings,
  TestTube,
  Search,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function LabSidebar() {
  const menuItems = [
    { icon: FlaskConical, label: "Dashboard", href: "/lab/dashboard" },
    { icon: TestTube, label: "Assigned Tests", href: "/lab/tests" },
    { icon: FileText, label: "Reports", href: "/lab/reports" },
    { icon: Users, label: "Patients", href: "/lab/patients", active: true },
    { icon: Settings, label: "Test Catalog", href: "/lab/catalog" },
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

export default function LabPatients() {
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    {
      id: "P001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Main Street, New York, NY",
      lastVisit: "2024-01-15",
      totalTests: 5,
      pendingTests: 1,
      completedTests: 4,
      recentTests: ["Complete Blood Count", "Lipid Panel"],
    },
    {
      id: "P002",
      name: "Sarah Wilson",
      age: 32,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "sarah.wilson@email.com",
      address: "456 Oak Avenue, Boston, MA",
      lastVisit: "2024-01-14",
      totalTests: 3,
      pendingTests: 0,
      completedTests: 3,
      recentTests: ["Urine Analysis", "Pregnancy Test"],
    },
    {
      id: "P003",
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "michael.brown@email.com",
      address: "789 Pine Street, Chicago, IL",
      lastVisit: "2024-01-13",
      totalTests: 8,
      pendingTests: 2,
      completedTests: 6,
      recentTests: ["Thyroid Function", "Diabetes Panel"],
    },
    {
      id: "P004",
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@email.com",
      address: "321 Elm Street, Los Angeles, CA",
      lastVisit: "2024-01-12",
      totalTests: 2,
      pendingTests: 1,
      completedTests: 1,
      recentTests: ["X-Ray Chest"],
    },
    {
      id: "P005",
      name: "Robert Chen",
      age: 41,
      gender: "Male",
      phone: "+1 (555) 567-8901",
      email: "robert.chen@email.com",
      address: "654 Maple Drive, Seattle, WA",
      lastVisit: "2024-01-11",
      totalTests: 6,
      pendingTests: 0,
      completedTests: 6,
      recentTests: ["Liver Function", "Kidney Function"],
    },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout title="Lab Patients" sidebar={<LabSidebar />}>
      <div className="space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback className="text-lg">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{patient.name}</h3>
                      <p className="text-gray-600">Patient ID: {patient.id}</p>
                      <p className="text-sm text-gray-500">
                        {patient.age} years old • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{patient.address}</span>
                  </div>
                </div>

                {/* Test Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{patient.totalTests}</div>
                    <div className="text-xs text-blue-600">Total Tests</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{patient.pendingTests}</div>
                    <div className="text-xs text-yellow-600">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{patient.completedTests}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                </div>

                {/* Recent Tests */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Recent Tests</h4>
                  <div className="flex flex-wrap gap-1">
                    {patient.recentTests.map((test, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Last Visit */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last Visit: {patient.lastVisit}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <TestTube className="h-4 w-4 mr-1" />
                      Tests
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
