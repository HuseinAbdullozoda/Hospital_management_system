"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  User,
  TestTube,
  FileText,
  Pill,
  MessageCircle,
  Settings,
  Stethoscope,
  Bell,
  Shield,
  Eye,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function PatientSidebar() {
  const menuItems = [
    { icon: Stethoscope, label: "Dashboard", href: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: User, label: "Find Doctors", href: "/patient/doctors" },
    { icon: FileText, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: TestTube, label: "Lab Tests", href: "/patient/lab-tests" },
    { icon: Pill, label: "Pharmacy", href: "/patient/pharmacy" },
    { icon: MessageCircle, label: "Chat", href: "/patient/chat" },
    { icon: User, label: "Profile", href: "/patient/profile" },
    { icon: Settings, label: "Settings", href: "/patient/settings", active: true },
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

export default function PatientSettings() {
  const { toast } = useToast()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    prescriptionReminders: true,
    labResultNotifications: true,
    promotionalEmails: false,
    profileVisibility: true,
    shareDataWithDoctors: true,
    allowResearchParticipation: false,
    twoFactorAuth: false,
    loginAlerts: true,
    preferredContactMethod: "email",
    language: "English",
    timezone: "America/New_York",
  })

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)
    try {
      const result = await apiClient.changePassword(currentPassword, newPassword)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Password changed successfully",
        })
        setIsPasswordDialogOpen(false)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    })
  }

  return (
    <DashboardLayout title="Settings" sidebar={<PatientSidebar />}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" className="text-base font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-gray-600">Receive notifications via text message</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appointmentReminders" className="text-base font-medium">
                  Appointment Reminders
                </Label>
                <p className="text-sm text-gray-600">Get reminded about upcoming appointments</p>
              </div>
              <Switch
                id="appointmentReminders"
                checked={settings.appointmentReminders}
                onCheckedChange={(checked) => handleSettingChange("appointmentReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="prescriptionReminders" className="text-base font-medium">
                  Prescription Reminders
                </Label>
                <p className="text-sm text-gray-600">Reminders to take medications and refill prescriptions</p>
              </div>
              <Switch
                id="prescriptionReminders"
                checked={settings.prescriptionReminders}
                onCheckedChange={(checked) => handleSettingChange("prescriptionReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="labResultNotifications" className="text-base font-medium">
                  Lab Result Notifications
                </Label>
                <p className="text-sm text-gray-600">Get notified when lab results are available</p>
              </div>
              <Switch
                id="labResultNotifications"
                checked={settings.labResultNotifications}
                onCheckedChange={(checked) => handleSettingChange("labResultNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotionalEmails" className="text-base font-medium">
                  Promotional Emails
                </Label>
                <p className="text-sm text-gray-600">Receive health tips and promotional content</p>
              </div>
              <Switch
                id="promotionalEmails"
                checked={settings.promotionalEmails}
                onCheckedChange={(checked) => handleSettingChange("promotionalEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Privacy Settings</span>
            </CardTitle>
            <CardDescription>Control your privacy and data sharing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profileVisibility" className="text-base font-medium">
                  Profile Visibility
                </Label>
                <p className="text-sm text-gray-600">Allow healthcare providers to view your profile</p>
              </div>
              <Switch
                id="profileVisibility"
                checked={settings.profileVisibility}
                onCheckedChange={(checked) => handleSettingChange("profileVisibility", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shareDataWithDoctors" className="text-base font-medium">
                  Share Data with Doctors
                </Label>
                <p className="text-sm text-gray-600">Allow doctors to access your medical history</p>
              </div>
              <Switch
                id="shareDataWithDoctors"
                checked={settings.shareDataWithDoctors}
                onCheckedChange={(checked) => handleSettingChange("shareDataWithDoctors", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowResearchParticipation" className="text-base font-medium">
                  Research Participation
                </Label>
                <p className="text-sm text-gray-600">Allow anonymized data to be used for medical research</p>
              </div>
              <Switch
                id="allowResearchParticipation"
                checked={settings.allowResearchParticipation}
                onCheckedChange={(checked) => handleSettingChange("allowResearchParticipation", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth" className="text-base font-medium">
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loginAlerts" className="text-base font-medium">
                  Login Alerts
                </Label>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <Switch
                id="loginAlerts"
                checked={settings.loginAlerts}
                onCheckedChange={(checked) => handleSettingChange("loginAlerts", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Change Password</Label>
              <p className="text-sm text-gray-600">Update your account password</p>
              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePasswordChange} disabled={isChangingPassword}>
                      {isChangingPassword ? "Changing..." : "Change Password"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Communication Preferences</span>
            </CardTitle>
            <CardDescription>Set your preferred communication methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
              <select
                id="preferredContactMethod"
                value={settings.preferredContactMethod}
                onChange={(e) => handleSettingChange("preferredContactMethod", e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="phone">Phone Call</option>
                <option value="app">In-App Notification</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => handleSettingChange("language", e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleSettingChange("timezone", e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg">
            Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
