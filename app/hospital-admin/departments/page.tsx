"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Building2, Users, Plus, Search, Filter, Edit, UserCheck, Calendar, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Mock data for departments
const mockDepartments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Heart and cardiovascular system care",
    head: "Dr. Sarah Johnson",
    staff: 15,
    patients: 45,
    location: "Building A, Floor 3",
    phone: "+992-123-456-789",
    email: "cardiology@hms.tj",
    status: "active",
    established: "2020-01-15",
  },
  {
    id: 2,
    name: "Emergency",
    description: "24/7 emergency medical services",
    head: "Dr. Michael Chen",
    staff: 25,
    patients: 120,
    location: "Building A, Ground Floor",
    phone: "+992-123-456-790",
    email: "emergency@hms.tj",
    status: "active",
    established: "2019-03-10",
  },
  {
    id: 3,
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents",
    head: "Dr. Emily Rodriguez",
    staff: 12,
    patients: 80,
    location: "Building B, Floor 2",
    phone: "+992-123-456-791",
    email: "pediatrics@hms.tj",
    status: "active",
    established: "2020-06-20",
  },
  {
    id: 4,
    name: "Orthopedics",
    description: "Bone, joint, and muscle treatment",
    head: "Dr. James Wilson",
    staff: 10,
    patients: 35,
    location: "Building C, Floor 1",
    phone: "+992-123-456-792",
    email: "orthopedics@hms.tj",
    status: "maintenance",
    established: "2021-02-14",
  },
]

const sidebar = (
  <nav className="p-6 space-y-2">
    <Link
      href="/hospital-admin/dashboard"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <Building2 className="h-5 w-5" />
      <span>Dashboard</span>
    </Link>
    <Link
      href="/hospital-admin/departments"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-green-100 text-green-700 font-medium"
    >
      <Building2 className="h-5 w-5" />
      <span>Departments</span>
    </Link>
    <Link
      href="/hospital-admin/doctors"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <Users className="h-5 w-5" />
      <span>Doctors</span>
    </Link>
    <Link
      href="/hospital-admin/patients"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <Users className="h-5 w-5" />
      <span>Patients</span>
    </Link>
    <Link
      href="/hospital-admin/reports"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <Calendar className="h-5 w-5" />
      <span>Reports</span>
    </Link>
  </nav>
)

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    head: "",
    location: "",
    phone: "",
    email: "",
  })
  const { toast } = useToast()

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dept.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddDepartment = () => {
    if (!newDepartment.name || !newDepartment.head) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const department = {
      id: departments.length + 1,
      ...newDepartment,
      staff: 0,
      patients: 0,
      status: "active",
      established: new Date().toISOString().split("T")[0],
    }

    setDepartments([...departments, department])
    setNewDepartment({
      name: "",
      description: "",
      head: "",
      location: "",
      phone: "",
      email: "",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Department Added",
      description: "New department has been successfully created.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout title="Departments Management" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600">Manage hospital departments and their information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new department for your hospital</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    placeholder="e.g., Cardiology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                    placeholder="Brief description of the department"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="head">Department Head *</Label>
                  <Input
                    id="head"
                    value={newDepartment.head}
                    onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newDepartment.location}
                    onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                    placeholder="e.g., Building A, Floor 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newDepartment.phone}
                    onChange={(e) => setNewDepartment({ ...newDepartment, phone: e.target.value })}
                    placeholder="+992-123-456-789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDepartment.email}
                    onChange={(e) => setNewDepartment({ ...newDepartment, email: e.target.value })}
                    placeholder="department@hms.tj"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddDepartment} className="flex-1">
                    Add Department
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search departments or heads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Departments</p>
                  <p className="text-2xl font-bold text-green-600">
                    {departments.filter((d) => d.status === "active").length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Staff</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {departments.reduce((sum, d) => sum + d.staff, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {departments.reduce((sum, d) => sum + d.patients, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription className="mt-1">{department.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(department.status)}>{department.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <UserCheck className="h-4 w-4 mr-2" />
                    <span>Head: {department.head}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{department.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{department.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{department.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{department.staff}</p>
                    <p className="text-xs text-gray-500">Staff Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{department.patients}</p>
                    <p className="text-xs text-gray-500">Active Patients</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Users className="h-4 w-4 mr-1" />
                    View Staff
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first department"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
