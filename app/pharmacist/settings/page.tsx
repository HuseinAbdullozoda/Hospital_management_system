"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Pill, Package, ShoppingCart, Plus, Settings, Bell, Shield, User, Store } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

function PharmacistSidebar() {
  const menuItems = [
    { icon: Pill, label: "Dashboard", href: "/pharmacist/dashboard" },
    { icon: Package, label: "Inventory", href: "/pharmacist/inventory" },
    { icon: ShoppingCart, label: "Orders", href: "/pharmacist/orders" },
    { icon: Plus, label: "Add Medicine", href: "/pharmacist/medicines/new" },
    { icon: Settings, label: "Settings", href: "/pharmacist/settings", active: true },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
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

export default function PharmacistSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Notification Settings
    lowStockAlerts: true,
    expiryAlerts: true,
    newOrderNotifications: true,
    emailNotifications: true,
    smsNotifications: false,

    // Inventory Settings
    autoReorderEnabled: true,
    defaultReorderQuantity: 50,
    lowStockThreshold: 10,
    expiryWarningDays: 30,

    // Business Settings
    pharmacyName: "City Pharmacy",
    licenseNumber: "PH123456789",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    email: "info@citypharmacy.com",
    operatingHours: "9:00 AM - 9:00 PM",

    // Security Settings
    requirePrescriptionVerification: true,
    enableAuditLog: true,
    sessionTimeout: 30,
  })

  const handleSettingChange = (setting: string, value: boolean | string | number) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSaveSettings = () => {
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your pharmacy settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <DashboardLayout title="Pharmacy Settings" sidebar={<PharmacistSidebar />}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="h-5 w-5" />
              <span>Business Information</span>
            </CardTitle>
            <CardDescription>Update your pharmacy's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                <Input
                  id="pharmacyName"
                  value={settings.pharmacyName}
                  onChange={(e) => handleSettingChange("pharmacyName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={settings.licenseNumber}
                  onChange={(e) => handleSettingChange("licenseNumber", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => handleSettingChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input
                id="operatingHours"
                value={settings.operatingHours}
                onChange={(e) => handleSettingChange("operatingHours", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription>Configure how you receive alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStockAlerts" className="text-base font-medium">
                  Low Stock Alerts
                </Label>
                <p className="text-sm text-gray-600">Get notified when inventory is running low</p>
              </div>
              <Switch
                id="lowStockAlerts"
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => handleSettingChange("lowStockAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="expiryAlerts" className="text-base font-medium">
                  Expiry Alerts
                </Label>
                <p className="text-sm text-gray-600">Get notified about medicines nearing expiry</p>
              </div>
              <Switch
                id="expiryAlerts"
                checked={settings.expiryAlerts}
                onCheckedChange={(checked) => handleSettingChange("expiryAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newOrderNotifications" className="text-base font-medium">
                  New Order Notifications
                </Label>
                <p className="text-sm text-gray-600">Get notified about new customer orders</p>
              </div>
              <Switch
                id="newOrderNotifications"
                checked={settings.newOrderNotifications}
                onCheckedChange={(checked) => handleSettingChange("newOrderNotifications", checked)}
              />
            </div>

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
          </CardContent>
        </Card>

        {/* Inventory Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Inventory Management</span>
            </CardTitle>
            <CardDescription>Configure automatic inventory management settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoReorderEnabled" className="text-base font-medium">
                  Auto Reorder
                </Label>
                <p className="text-sm text-gray-600">Automatically reorder medicines when stock is low</p>
              </div>
              <Switch
                id="autoReorderEnabled"
                checked={settings.autoReorderEnabled}
                onCheckedChange={(checked) => handleSettingChange("autoReorderEnabled", checked)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="defaultReorderQuantity">Default Reorder Quantity</Label>
                <Input
                  id="defaultReorderQuantity"
                  type="number"
                  value={settings.defaultReorderQuantity}
                  onChange={(e) => handleSettingChange("defaultReorderQuantity", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleSettingChange("lowStockThreshold", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="expiryWarningDays">Expiry Warning (Days)</Label>
                <Input
                  id="expiryWarningDays"
                  type="number"
                  value={settings.expiryWarningDays}
                  onChange={(e) => handleSettingChange("expiryWarningDays", Number.parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Compliance</span>
            </CardTitle>
            <CardDescription>Manage security and compliance settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requirePrescriptionVerification" className="text-base font-medium">
                  Prescription Verification
                </Label>
                <p className="text-sm text-gray-600">Require verification for prescription medicines</p>
              </div>
              <Switch
                id="requirePrescriptionVerification"
                checked={settings.requirePrescriptionVerification}
                onCheckedChange={(checked) => handleSettingChange("requirePrescriptionVerification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAuditLog" className="text-base font-medium">
                  Audit Logging
                </Label>
                <p className="text-sm text-gray-600">Keep detailed logs of all pharmacy activities</p>
              </div>
              <Switch
                id="enableAuditLog"
                checked={settings.enableAuditLog}
                onCheckedChange={(checked) => handleSettingChange("enableAuditLog", checked)}
              />
            </div>

            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                className="w-32"
              />
              <p className="text-sm text-gray-600 mt-1">Automatically log out after inactivity</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Change Password</Label>
              <p className="text-sm text-gray-600">Update your account password</p>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account Management</span>
            </CardTitle>
            <CardDescription>Manage your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-gray-600">Download your pharmacy data and reports</p>
              </div>
              <Button variant="outline">Export</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Backup Settings</h4>
                <p className="text-sm text-gray-600">Create a backup of your current settings</p>
              </div>
              <Button variant="outline">Backup</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
              <div>
                <h4 className="font-medium text-red-600">Reset Settings</h4>
                <p className="text-sm text-gray-600">Reset all settings to default values</p>
              </div>
              <Button variant="destructive">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} size="lg">
            Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
