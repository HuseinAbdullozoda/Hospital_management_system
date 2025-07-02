"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Hospital,
  Building,
  Users,
  UserCheck,
  Settings,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Award,
  TrendingUp,
  Edit,
  Save,
  Camera,
  FlaskConical,
  Pill,
} from "lucide-react"
import Link from "next/link"

function HospitalAdminSidebar() {
  const menuItems = [
    { icon: Hospital, label: "Dashboard", href: "/hospital-admin/dashboard" },
    { icon: Building, label: "Departments", href: "/hospital-admin/departments" },
    { icon: UserCheck, label: "Doctors", href: "/hospital-admin/doctors" },
    { icon: FlaskConical, label: "Lab Workers", href: "/hospital-admin/lab-workers" },
    { icon: Pill, label: "Pharmacists", href: "/hospital-admin/pharmacists" },
    { icon: Users, label: "Patients", href: "/hospital-admin/patients" },
    { icon: TrendingUp, label: "Reports", href: "/hospital-admin/reports" },
    { icon: Settings, label: "Hospital Profile", href: "/hospital-admin/profile", active: true },
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

export default function HospitalProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [hospitalData, setHospitalData] = useState({
    name: "City General Hospital",
    tagline: "Excellence in Healthcare Since 1985",
    address: "123 Main Street, Downtown",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 234-567-8900",
    email: "info@citygeneral.com",
    website: "www.citygeneral.com",
    established: "1985",
    beds: 250,
    description:
      "City General Hospital is a leading healthcare institution providing comprehensive medical services to the community for over 35 years. We are committed to delivering exceptional patient care through advanced medical technology and compassionate healthcare professionals.",
    mission:
      "To provide exceptional healthcare services with compassion, innovation, and excellence while serving our community with integrity and respect.",
    vision:
      "To be the premier healthcare destination, recognized for clinical excellence, patient satisfaction, and community service.",
    accreditations: ["Joint Commission", "AAAHC", "ISO 9001:2015"],
    emergencyServices: true,
    trauma: true,
    parking: "500 spaces available",
    publicTransport: "Metro Station 2 blocks away",
  })

  const stats = {
    totalDoctors: 45,
    totalPatients: 1247,
    departments: 12,
    labWorkers: 8,
    pharmacists: 6,
    rating: 4.8,
    reviews: 456,
    successRate: 98.5,
  }

  const departments = [
    { name: "Emergency Medicine", doctors: 8, head: "Dr. Michael Roberts" },
    { name: "Cardiology", doctors: 6, head: "Dr. Sarah Johnson" },
    { name: "Neurology", doctors: 4, head: "Dr. James Wilson" },
    { name: "Pediatrics", doctors: 5, head: "Dr. Emily Davis" },
    { name: "Orthopedics", doctors: 4, head: "Dr. Robert Chen" },
    { name: "Oncology", doctors: 3, head: "Dr. Lisa Martinez" },
  ]

  const services = [
    "Emergency Care 24/7",
    "Cardiac Surgery",
    "Neurosurgery",
    "Pediatric Care",
    "Maternity Services",
    "Diagnostic Imaging",
    "Laboratory Services",
    "Pharmacy Services",
    "Physical Therapy",
    "Mental Health Services",
  ]

  const achievements = [
    {
      title: "Best Hospital Award 2023",
      organization: "Healthcare Excellence Association",
      year: "2023",
    },
    {
      title: "Patient Safety Excellence Award",
      organization: "National Patient Safety Foundation",
      year: "2022",
    },
    {
      title: "Top 100 Hospitals",
      organization: "US News & World Report",
      year: "2023",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // In real app, this would save to backend
    console.log("Saving hospital data:", hospitalData)
  }

  return (
    <DashboardLayout title="Hospital Profile Management" sidebar={<HospitalAdminSidebar />}>
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Hospital Information</TabsTrigger>
            <TabsTrigger value="public">Public Profile</TabsTrigger>
            <TabsTrigger value="departments">Departments & Services</TabsTrigger>
            <TabsTrigger value="stats">Statistics & Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Hospital Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className="h-24 w-24 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Hospital className="h-12 w-12 text-purple-600" />
                    </div>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{hospitalData.name}</h2>
                        <p className="text-gray-600">{hospitalData.tagline}</p>
                        <p className="text-sm text-gray-500">Established {hospitalData.established}</p>
                      </div>
                      <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{stats.totalDoctors}</p>
                        <p className="text-sm text-gray-600">Doctors</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.departments}</p>
                        <p className="text-sm text-gray-600">Departments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{hospitalData.beds}</p>
                        <p className="text-sm text-gray-600">Beds</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{stats.rating}★</p>
                        <p className="text-sm text-gray-600">{stats.reviews} Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Hospital contact and location details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hospital Name</Label>
                    <Input
                      id="name"
                      value={hospitalData.name}
                      onChange={(e) => setHospitalData({ ...hospitalData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={hospitalData.tagline}
                      onChange={(e) => setHospitalData({ ...hospitalData, tagline: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={hospitalData.phone}
                      onChange={(e) => setHospitalData({ ...hospitalData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={hospitalData.email}
                      onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={hospitalData.website}
                      onChange={(e) => setHospitalData({ ...hospitalData, website: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beds">Number of Beds</Label>
                    <Input
                      id="beds"
                      type="number"
                      value={hospitalData.beds}
                      onChange={(e) => setHospitalData({ ...hospitalData, beds: Number(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={hospitalData.address}
                    onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={hospitalData.city}
                      onChange={(e) => setHospitalData({ ...hospitalData, city: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={hospitalData.state}
                      onChange={(e) => setHospitalData({ ...hospitalData, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={hospitalData.zipCode}
                      onChange={(e) => setHospitalData({ ...hospitalData, zipCode: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Hospital */}
            <Card>
              <CardHeader>
                <CardTitle>About Hospital</CardTitle>
                <CardDescription>Hospital description, mission, and vision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={hospitalData.description}
                    onChange={(e) => setHospitalData({ ...hospitalData, description: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={hospitalData.mission}
                    onChange={(e) => setHospitalData({ ...hospitalData, mission: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision">Vision Statement</Label>
                  <Textarea
                    id="vision"
                    value={hospitalData.vision}
                    onChange={(e) => setHospitalData({ ...hospitalData, vision: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            {/* Public Profile Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Public Profile Preview</CardTitle>
                <CardDescription>This is how patients will see your hospital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Hospital className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{hospitalData.name}</h3>
                      <p className="text-gray-600">{hospitalData.tagline}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{stats.rating}★</span>
                          <span className="text-gray-500">({stats.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Est. {hospitalData.established}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>
                            {hospitalData.address}, {hospitalData.city}, {hospitalData.state}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{hospitalData.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{hospitalData.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span>{hospitalData.website}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Hospital Stats</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-purple-600">{hospitalData.beds}</p>
                          <p className="text-gray-600">Beds</p>
                        </div>
                        <div>
                          <p className="font-medium text-blue-600">{stats.departments}</p>
                          <p className="text-gray-600">Departments</p>
                        </div>
                        <div>
                          <p className="font-medium text-green-600">{stats.totalDoctors}</p>
                          <p className="text-gray-600">Doctors</p>
                        </div>
                        <div>
                          <p className="font-medium text-orange-600">{stats.successRate}%</p>
                          <p className="text-gray-600">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-gray-600 text-sm">{hospitalData.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Awards & Accreditations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.organization}</p>
                      </div>
                      <Badge variant="outline">{achievement.year}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Departments</CardTitle>
                <CardDescription>Overview of all departments and their heads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{dept.name}</h4>
                        <Badge variant="secondary">{dept.doctors} doctors</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Head: {dept.head}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
                <CardDescription>Complete list of medical services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{stats.successRate}%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{stats.totalPatients}</p>
                    <p className="text-sm text-gray-600">Total Patients</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{stats.totalDoctors}</p>
                    <p className="text-sm text-gray-600">Medical Staff</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-600">{stats.rating}</p>
                    <p className="text-sm text-gray-600">Patient Rating</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">24/7</p>
                      <p className="text-sm text-gray-600">Emergency Services</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">95%</p>
                      <p className="text-sm text-gray-600">Bed Occupancy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">15 min</p>
                      <p className="text-sm text-gray-600">Avg Wait Time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
