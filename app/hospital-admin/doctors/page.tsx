"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Hospital,
  Building,
  Users,
  UserCheck,
  Settings,
  Search,
  Plus,
  Edit,
  Eye,
  FlaskConical,
  Pill,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/hospital-admin/dashboard" },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: UserCheck, label: "Doctors", href: "/hospital-admin/doctors", active: true },
    { icon: FlaskConical, label: "Lab Workers", href: "/hospital-admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/hospital-admin/pharmacists" },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients" },
    { icon: TrendingUp, label: "Reports", href: "/hospital-admin/reports" },
    { icon: Settings, label: "Hospital Profile", href: "/hospital-admin/profile" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
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

export default function HospitalDoctorsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [isNewDoctorOpen, setIsNewDoctorOpen] = useState(false)

  const [doctors, setDoctors] = useState([
    {
      id: "DOC001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@citygeneral.com",
      phone: "+1 234-567-8900",
      specialization: "Cardiology",
      department: "Cardiology",
      experience: "15 years",
      status: "Active",
      joinDate: "2018-03-15",
      patients: 247,
      consultationFee: 150,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "DOC002",
      name: "Dr. Michael Roberts",
      email: "michael.roberts@citygeneral.com",
      phone: "+1 234-567-8901",
      specialization: "Emergency Medicine",
      department: "Emergency Medicine",
      experience: "12 years",
      status: "Active",
      joinDate: "2019-07-22",
      patients: 189,
      consultationFee: 200,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "DOC003",
      name: "Dr. James Wilson",
      email: "james.wilson@citygeneral.com",
      phone: "+1 234-567-8902",
      specialization: "Neurology",
      department: "Neurology",
      experience: "18 years",
      status: "Active",
      joinDate: "2017-01-10",
      patients: 156,
      consultationFee: 180,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "DOC004",
      name: "Dr. Emily Davis",
      email: "emily.davis@citygeneral.com",
      phone: "+1 234-567-8903",
      specialization: "Pediatrics",
      department: "Pediatrics",
      experience: "10 years",
      status: "On Leave",
      joinDate: "2020-09-05",
      patients: 203,
      consultationFee: 140,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    experience: "",
    consultationFee: "",
  })

  const departments = ["Emergency Medicine", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Oncology"]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || doctor.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const handleCreateDoctor = () => {
    const newDoc = {
      id: `DOC${String(doctors.length + 1).padStart(3, "0")}`,
      name: newDoctor.name,
      email: newDoctor.email,
      phone: newDoctor.phone,
      specialization: newDoctor.specialization,
      department: newDoctor.department,
      experience: newDoctor.experience,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      patients: 0,
      consultationFee: Number(newDoctor.consultationFee),
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setDoctors((prev) => [newDoc, ...prev])
    setIsNewDoctorOpen(false)
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      department: "",
      experience: "",
      consultationFee: "",
    })

    toast({
      title: "Doctor Added",
      description: `${newDoc.name} has been added successfully.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "On Leave":
        return "secondary"
      case "Inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout title="Hospital Doctors" sidebar={<HospitalAdminSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search doctors by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isNewDoctorOpen} onOpenChange={setIsNewDoctorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>Add a new doctor to your hospital</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newDoctor.email}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@hospital.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newDoctor.phone}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234-567-8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={newDoctor.experience}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, experience: e.target.value }))}
                      placeholder="5 years"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={newDoctor.specialization}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, specialization: e.target.value }))}
                      placeholder="Cardiology"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newDoctor.department}
                      onValueChange={(value) => setNewDoctor((prev) => ({ ...prev, department: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={newDoctor.consultationFee}
                    onChange={(e) => setNewDoctor((prev) => ({ ...prev, consultationFee: e.target.value }))}
                    placeholder="150"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewDoctorOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDoctor}>Add Doctor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback className="text-lg">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">ID: {doctor.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">${doctor.consultationFee}</p>
                          <p className="text-sm text-gray-500">Consultation</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{doctor.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{doctor.department}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Joined {doctor.joinDate}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{doctor.patients}</p>
                          <p className="text-sm text-gray-500">Total Patients</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-purple-600">{doctor.experience}</p>
                          <p className="text-sm text-gray-500">Experience</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => {
                        // TODO: Implement view profile functionality
                        toast({
                          title: "Feature Coming Soon",
                          description: "View profile functionality will be available soon.",
                        })
                      }}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        // TODO: Implement edit functionality
                        toast({
                          title: "Feature Coming Soon",
                          description: "Edit doctor functionality will be available soon.",
                        })
                      }}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        // TODO: Implement schedule functionality
                        toast({
                          title: "Feature Coming Soon",
                          description: "Schedule functionality will be available soon.",
                        })
                      }}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={() => setIsNewDoctorOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Doctor
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
