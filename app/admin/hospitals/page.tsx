"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  Hospital,
  Users,
  UserCheck,
  Building,
  Settings,
  FlaskConical,
  Pill,
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"

function AdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Building, label: "Hospitals", href: "/admin/hospitals", active: true },
    { icon: UserCheck, label: "Doctor Approvals", href: "/admin/doctors" },
    { icon: Users, label: "Departments", href: "/admin/departments" },
    { icon: FlaskConical, label: "Lab Workers", href: "/admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/admin/pharmacists" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
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

export default function HospitalsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      phone: "+1 234-567-8900",
      email: "info@citygeneral.com",
      departments: 12,
      doctors: 45,
      status: "active",
      established: "1985",
    },
    {
      id: 2,
      name: "Metro Medical Center",
      address: "456 Oak Avenue, Midtown",
      phone: "+1 234-567-8901",
      email: "contact@metromedical.com",
      departments: 8,
      doctors: 32,
      status: "active",
      established: "1992",
    },
    {
      id: 3,
      name: "Regional Health Institute",
      address: "789 Pine Road, Uptown",
      phone: "+1 234-567-8902",
      email: "admin@regionalhealth.com",
      departments: 15,
      doctors: 67,
      status: "active",
      established: "1978",
    },
    {
      id: 4,
      name: "Sunrise Medical Center",
      address: "321 Elm Street, Westside",
      phone: "+1 234-567-8903",
      email: "info@sunrisemedical.com",
      departments: 6,
      doctors: 28,
      status: "pending",
      established: "2020",
    },
  ]

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout title="Hospital Management" sidebar={<AdminSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Hospital
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Hospital</DialogTitle>
                <DialogDescription>Enter the details for the new hospital</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name</Label>
                  <Input id="name" placeholder="Enter hospital name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // TODO: Implement add hospital functionality
                    toast({
                      title: "Feature Coming Soon",
                      description: "Add hospital functionality will be available soon.",
                    })
                    setIsAddDialogOpen(false)
                  }}>Add Hospital</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{hospital.name}</CardTitle>
                    <CardDescription>Established {hospital.established}</CardDescription>
                  </div>
                  <Badge variant={hospital.status === "active" ? "default" : "secondary"}>{hospital.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{hospital.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{hospital.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{hospital.email}</span>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{hospital.departments}</p>
                      <p className="text-sm text-gray-600">Departments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{hospital.doctors}</p>
                      <p className="text-sm text-gray-600">Doctors</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => {
                      // TODO: Implement edit functionality
                      toast({
                        title: "Feature Coming Soon",
                        description: "Edit hospital functionality will be available soon.",
                      })
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <Link href={`/admin/hospitals/${hospital.id}/departments`}>
                        <Building className="h-4 w-4 mr-2" />
                        Departments
                      </Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => {
                      // TODO: Implement delete functionality
                      toast({
                        title: "Feature Coming Soon",
                        description: "Delete hospital functionality will be available soon.",
                      })
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Hospital className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hospitals found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Hospital
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
