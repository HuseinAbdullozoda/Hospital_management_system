"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Building,
  UserPlus,
  FileText,
  Activity
} from "lucide-react"
import Link from "next/link"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Building, label: "Dashboard", href: "/hospital-admin/dashboard", active: true },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients" },
    { icon: Stethoscope, label: "Doctors", href: "/hospital-admin/doctors" },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: FileText, label: "Reports", href: "/hospital-admin/reports" },
    { icon: Users, label: "Profile", href: "/hospital-admin/profile" },
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

export default function HospitalAdminDashboard() {
  const { toast } = useToast()
  const [isProcessingApproval, setIsProcessingApproval] = useState(false)

  const handleApproveHospital = async (hospitalId: number) => {
    setIsProcessingApproval(true)
    try {
      const result = await apiClient.approveHospital(hospitalId)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Hospital approved successfully",
        })
        // Refresh data here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve hospital",
        variant: "destructive",
      })
    } finally {
      setIsProcessingApproval(false)
    }
  }

  const handleRejectHospital = async (hospitalId: number, reason: string) => {
    setIsProcessingApproval(true)
    try {
      const result = await apiClient.rejectHospital(hospitalId, reason)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Hospital rejected successfully",
        })
        // Refresh data here
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject hospital",
        variant: "destructive",
      })
    } finally {
      setIsProcessingApproval(false)
    }
  }

  // Mock data - replace with actual API calls
  const stats = {
    totalPatients: 1247,
    totalDoctors: 89,
    totalAppointments: 156,
    pendingApprovals: 3,
    occupancyRate: 78,
    revenue: 245000
  }

  const recentActivity = [
    {
      id: 1,
      type: "patient_admission",
      title: "New patient admitted",
      description: "John Smith admitted to Cardiology",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "doctor_assignment",
      title: "Doctor assigned",
      description: "Dr. Sarah Johnson assigned to Emergency",
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      type: "appointment_scheduled",
      title: "Appointment scheduled",
      description: "Follow-up appointment for Patient #1234",
      time: "6 hours ago",
      status: "pending"
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      hospital: "City General Hospital",
      location: "Downtown",
      submittedBy: "Dr. Michael Chen",
      submittedDate: "2024-01-15",
      type: "New Department"
    },
    {
      id: 2,
      hospital: "Metro Medical Center",
      location: "Midtown",
      submittedBy: "Dr. Emily Rodriguez",
      submittedDate: "2024-01-14",
      type: "Equipment Request"
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "patient_admission":
        return <UserPlus className="h-4 w-4" />
      case "doctor_assignment":
        return <Stethoscope className="h-4 w-4" />
      case "appointment_scheduled":
        return <Calendar className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout title="Hospital Admin Dashboard" sidebar={<HospitalAdminSidebar />}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold">{stats.totalAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hospital Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hospital Performance</CardTitle>
              <CardDescription>Key metrics and occupancy rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bed Occupancy Rate</span>
                  <span className="text-sm text-gray-600">{stats.occupancyRate}%</span>
                </div>
                <Progress value={stats.occupancyRate} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monthly Revenue</span>
                  <span className="text-sm text-gray-600">${stats.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+12% from last month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">89%</p>
                  <p className="text-sm text-gray-600">Patient Satisfaction</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-gray-600">Staff Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest hospital activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(activity.status)}
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Items requiring your approval</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                <p className="text-gray-600">All items have been processed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{approval.hospital}</h3>
                        <p className="text-sm text-gray-600">{approval.location}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <span>Submitted by: {approval.submittedBy}</span>
                          <span>Date: {approval.submittedDate}</span>
                          <Badge variant="outline">{approval.type}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveHospital(approval.id)}
                          disabled={isProcessingApproval}
                        >
                          {isProcessingApproval ? "Processing..." : "Approve"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectHospital(approval.id, "Insufficient documentation")}
                          disabled={isProcessingApproval}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/hospital-admin/patients">
                  <Users className="h-6 w-6" />
                  <span>Manage Patients</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/hospital-admin/doctors">
                  <Stethoscope className="h-6 w-6" />
                  <span>Manage Doctors</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/hospital-admin/departments">
                  <Building className="h-6 w-6" />
                  <span>Departments</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Link href="/hospital-admin/reports">
                  <FileText className="h-6 w-6" />
                  <span>Generate Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
