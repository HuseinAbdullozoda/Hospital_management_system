"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Filter,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { Label } from "@/components/ui/label"

function LabSidebar() {
  const menuItems = [
    { icon: TestTube, label: "Dashboard", href: "/lab/dashboard" },
    { icon: TestTube, label: "Tests", href: "/lab/tests", active: true },
    { icon: TestTube, label: "Catalog", href: "/lab/catalog" },
    { icon: TestTube, label: "Patients", href: "/lab/patients" },
    { icon: TestTube, label: "Reports", href: "/lab/reports" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export default function LabTests() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleStatusChange = async (testId: number, newStatus: string) => {
    setIsUpdatingStatus(true)
    try {
      const result = await apiClient.updateTestStatus(testId, newStatus)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: `Test status updated to ${newStatus}`,
        })
        // Refresh tests list here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update test status",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleGenerateReport = async (testId: number) => {
    setIsGeneratingReport(true)
    try {
      const result = await apiClient.generateTestReport(testId)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Report generated successfully",
        })
        // Handle report download or display
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const handlePatientInfo = async (testId: number) => {
    try {
      const result = await apiClient.request(`/lab/tests/${testId}/patient-info`)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        // Display patient info in a modal or navigate to patient details
        toast({
          title: "Patient Information",
          description: `Patient: ${result.data.full_name}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get patient information",
        variant: "destructive",
      })
    }
  }

  const handleReschedule = async (testId: number) => {
    try {
      const result = await apiClient.request(`/lab/tests/${testId}/reschedule`, {
        method: 'POST',
        body: JSON.stringify({
          test_date: new Date().toISOString().split('T')[0], // Today's date as default
          notes: "Rescheduled by lab technician"
        })
      })
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Test rescheduled successfully",
        })
        // Refresh tests list here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reschedule test",
        variant: "destructive",
      })
    }
  }

  // Mock data - replace with actual API call
  const tests = [
    {
      id: 1,
      patient: "John Doe",
      test_type: "Blood Test",
      test_date: "2024-01-15",
      status: "pending",
      doctor: "Dr. Sarah Johnson",
      priority: "normal",
      notes: "Complete blood count"
    },
    {
      id: 2,
      patient: "Jane Smith",
      test_type: "Urine Analysis",
      test_date: "2024-01-15",
      status: "in-progress",
      doctor: "Dr. Michael Chen",
      priority: "urgent",
      notes: "Check for infection"
    },
    {
      id: 3,
      patient: "Bob Wilson",
      test_type: "X-Ray",
      test_date: "2024-01-14",
      status: "completed",
      doctor: "Dr. Emily Rodriguez",
      priority: "normal",
      notes: "Chest X-ray for respiratory issues"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: "secondary",
      "in-progress": "default",
      completed: "outline",
      cancelled: "destructive"
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: any = {
      normal: "outline",
      urgent: "destructive",
      high: "default"
    }
    return <Badge variant={variants[priority]}>{priority}</Badge>
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.test_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout title="Lab Tests" sidebar={<LabSidebar />}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lab Tests</h1>
            <p className="text-muted-foreground">
              Manage and track laboratory tests
            </p>
          </div>
          <Button>
            <TestTube className="h-4 w-4 mr-2" />
            New Test
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status-filter">Status:</Label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests List */}
        <Card>
          <CardHeader>
            <CardTitle>All Tests</CardTitle>
            <CardDescription>
              {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTests.length === 0 ? (
              <div className="text-center py-8">
                <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
                <p className="text-gray-600">No tests match your current filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTests.map((test) => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{test.patient}</h3>
                          {getStatusBadge(test.status)}
                          {getPriorityBadge(test.priority)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{test.test_type}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{test.test_date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{test.doctor}</span>
                          </div>
                        </div>
                        {test.notes && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Notes:</strong> {test.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {test.status === "pending" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(test.id, "in-progress")}
                            disabled={isUpdatingStatus}
                          >
                            Start Test
                          </Button>
                        )}
                        {test.status === "in-progress" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(test.id, "completed")}
                            disabled={isUpdatingStatus}
                          >
                            Complete Test
                          </Button>
                        )}
                        {test.status === "completed" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleGenerateReport(test.id)}
                            disabled={isGeneratingReport}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Generate Report
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePatientInfo(test.id)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          Patient Info
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReschedule(test.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
