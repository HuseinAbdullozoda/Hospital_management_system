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
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

function LabSidebar() {
  const menuItems = [
    { icon: FlaskConical, label: "Dashboard", href: "/lab/dashboard" },
    { icon: TestTube, label: "Assigned Tests", href: "/lab/tests", active: true },
    { icon: FileText, label: "Reports", href: "/lab/reports" },
    { icon: Users, label: "Patients", href: "/lab/patients" },
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

export default function LabTests() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const [tests, setTests] = useState([
    {
      id: "LT001",
      patientName: "John Smith",
      patientId: "P001",
      testType: "Complete Blood Count",
      priority: "High",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-16",
      status: "pending",
      orderedBy: "Dr. Sarah Johnson",
      sampleType: "Blood",
      instructions: "Fasting required",
    },
    {
      id: "LT002",
      patientName: "Sarah Wilson",
      patientId: "P002",
      testType: "Urine Analysis",
      priority: "Normal",
      assignedDate: "2024-01-15",
      dueDate: "2024-01-17",
      status: "in-progress",
      orderedBy: "Dr. Michael Chen",
      sampleType: "Urine",
      instructions: "Mid-stream sample",
    },
    {
      id: "LT003",
      patientName: "Michael Brown",
      patientId: "P003",
      testType: "Lipid Panel",
      priority: "Normal",
      assignedDate: "2024-01-14",
      dueDate: "2024-01-16",
      status: "completed",
      orderedBy: "Dr. Emily Davis",
      sampleType: "Blood",
      instructions: "12-hour fasting required",
    },
    {
      id: "LT004",
      patientName: "Emily Davis",
      patientId: "P004",
      testType: "Thyroid Function Test",
      priority: "High",
      assignedDate: "2024-01-14",
      dueDate: "2024-01-15",
      status: "overdue",
      orderedBy: "Dr. Robert Wilson",
      sampleType: "Blood",
      instructions: "Morning sample preferred",
    },
    {
      id: "LT005",
      patientName: "Robert Chen",
      patientId: "P005",
      testType: "X-Ray Chest",
      priority: "Normal",
      assignedDate: "2024-01-13",
      dueDate: "2024-01-15",
      status: "pending",
      orderedBy: "Dr. Sarah Johnson",
      sampleType: "Imaging",
      instructions: "Remove all metal objects",
    },
  ])

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || test.status === filterStatus
    const matchesPriority = filterPriority === "all" || test.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusChange = (testId: string, newStatus: string) => {
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, status: newStatus } : test)))
    toast({
      title: "Test Status Updated",
      description: `Test ${testId} status changed to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Normal":
        return "bg-blue-100 text-blue-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <TestTube className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout title="Assigned Tests" sidebar={<LabSidebar />}>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tests by patient name, test type, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests List */}
        <div className="space-y-4">
          {filteredTests.map((test) => (
            <Card key={test.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>
                        {test.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{test.patientName}</h3>
                      <p className="text-gray-600">
                        Test ID: {test.id} • Patient ID: {test.patientId}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(test.status)}>
                          {getStatusIcon(test.status)}
                          <span className="ml-1">{test.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {test.status === "pending" && (
                      <Button size="sm" onClick={() => handleStatusChange(test.id, "in-progress")}>
                        Start Test
                      </Button>
                    )}
                    {test.status === "in-progress" && (
                      <Button size="sm" onClick={() => handleStatusChange(test.id, "completed")}>
                        Complete Test
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Test Type:</span>
                    <p className="text-gray-900">{test.testType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Sample Type:</span>
                    <p className="text-gray-900">{test.sampleType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Assigned Date:</span>
                    <p className="text-gray-900">{test.assignedDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Due Date:</span>
                    <p className={`${test.status === "overdue" ? "text-red-600 font-semibold" : "text-gray-900"}`}>
                      {test.dueDate}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Ordered By:</span>
                    <p className="text-gray-900">{test.orderedBy}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Special Instructions:</span>
                    <p className="text-gray-900">{test.instructions}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    Patient Info
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTests.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
