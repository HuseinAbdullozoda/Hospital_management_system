"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Stethoscope,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  Clock,
  Star,
  Edit,
  Save,
  Camera,
} from "lucide-react"
import Link from "next/link"

function DoctorSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Users, label: "Patients", href: "/doctor/patients" },
    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: MessageCircle, label: "Chat", href: "/doctor/chat" },
    { icon: Settings, label: "Profile", href: "/doctor/profile", active: true },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
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

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@citygeneral.com",
    phone: "+1 234-567-8900",
    specialty: "Cardiology",
    subSpecialty: "Interventional Cardiology",
    hospital: "City General Hospital",
    department: "Cardiology Department",
    licenseNumber: "MD123456789",
    experience: "15 years",
    education: "Harvard Medical School",
    residency: "Johns Hopkins Hospital",
    fellowship: "Mayo Clinic - Interventional Cardiology",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in interventional cardiology. She specializes in complex coronary interventions and structural heart disease.",
    languages: ["English", "Spanish", "French"],
    consultationFee: 150,
    availability: "Monday to Friday, 9:00 AM - 5:00 PM",
  })

  const stats = {
    totalPatients: 1247,
    appointmentsCompleted: 3456,
    rating: 4.8,
    reviews: 234,
    yearsExperience: 15,
  }

  const achievements = [
    {
      title: "Board Certified Cardiologist",
      organization: "American Board of Internal Medicine",
      year: "2010",
    },
    {
      title: "Fellow of American College of Cardiology",
      organization: "American College of Cardiology",
      year: "2012",
    },
    {
      title: "Excellence in Patient Care Award",
      organization: "City General Hospital",
      year: "2022",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      patient: "John Smith",
      rating: 5,
      comment: "Excellent doctor, very thorough and caring. Explained everything clearly.",
      date: "2024-01-10",
    },
    {
      id: 2,
      patient: "Mary Johnson",
      rating: 5,
      comment: "Dr. Johnson saved my life. Professional and compassionate care.",
      date: "2024-01-08",
    },
    {
      id: 3,
      patient: "Robert Chen",
      rating: 4,
      comment: "Great experience, would recommend to others.",
      date: "2024-01-05",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // In real app, this would save to backend
    console.log("Saving profile data:", profileData)
  }

  return (
    <DashboardLayout title="Doctor Profile" sidebar={<DoctorSidebar />}>
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="public">Public Profile</TabsTrigger>
            <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profileData.name} />
                      <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{profileData.name}</h2>
                        <p className="text-gray-600">{profileData.specialty}</p>
                        <p className="text-sm text-gray-500">{profileData.hospital}</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.totalPatients}</p>
                        <p className="text-sm text-gray-600">Total Patients</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.appointmentsCompleted}</p>
                        <p className="text-sm text-gray-600">Appointments</p>
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

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic contact and professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={profileData.licenseNumber}
                      onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your medical specialization and practice details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Primary Specialty</Label>
                    <Input
                      id="specialty"
                      value={profileData.specialty}
                      onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subSpecialty">Sub-specialty</Label>
                    <Input
                      id="subSpecialty"
                      value={profileData.subSpecialty}
                      onChange={(e) => setProfileData({ ...profileData, subSpecialty: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital</Label>
                    <Input
                      id="hospital"
                      value={profileData.hospital}
                      onChange={(e) => setProfileData({ ...profileData, hospital: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                    <Input
                      id="consultationFee"
                      type="number"
                      value={profileData.consultationFee}
                      onChange={(e) => setProfileData({ ...profileData, consultationFee: Number(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={profileData.availability}
                      onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education & Training */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Training</CardTitle>
                <CardDescription>Your medical education and training background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Medical School</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residency">Residency</Label>
                    <Input
                      id="residency"
                      value={profileData.residency}
                      onChange={(e) => setProfileData({ ...profileData, residency: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fellowship">Fellowship</Label>
                    <Input
                      id="fellowship"
                      value={profileData.fellowship}
                      onChange={(e) => setProfileData({ ...profileData, fellowship: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            {/* Public Profile Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Public Profile Preview</CardTitle>
                <CardDescription>This is how patients will see your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-6 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profileData.name} />
                      <AvatarFallback className="text-xl">SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{profileData.name}</h3>
                      <p className="text-gray-600">{profileData.specialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{stats.rating}</span>
                          <span className="text-gray-500">({stats.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{profileData.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${profileData.consultationFee}</p>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">About</h4>
                      <p className="text-gray-600 text-sm">{profileData.bio}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{profileData.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          <span>{profileData.education}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{profileData.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Certifications</CardTitle>
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

          <TabsContent value="reviews" className="space-y-6">
            {/* Rating Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews & Ratings</CardTitle>
                <CardDescription>Feedback from your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-600">{stats.rating}</p>
                    <div className="flex justify-center space-x-1 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(stats.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.reviews}</p>
                    <p className="text-sm text-gray-600">Total Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.totalPatients}</p>
                    <p className="text-sm text-gray-600">Total Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">95%</p>
                    <p className="text-sm text-gray-600">Recommend Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.patient}</h4>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
