"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, Package, ShoppingCart, TrendingDown, AlertTriangle, Plus, Settings } from "lucide-react"
import Link from "next/link"

function PharmacistSidebar() {
  const menuItems = [
    { icon: Pill, label: "Dashboard", href: "/pharmacist/dashboard", active: true },
    { icon: Package, label: "Inventory", href: "/pharmacist/inventory" },
    { icon: ShoppingCart, label: "Orders", href: "/pharmacist/orders" },
    { icon: Plus, label: "Add Medicine", href: "/pharmacist/medicines/new" },
    { icon: Settings, label: "Settings", href: "/pharmacist/settings" },
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

export default function PharmacistDashboard() {
  const stats = {
    totalMedicines: 450,
    lowStock: 12,
    pendingOrders: 8,
    todaysSales: 2450,
  }

  const lowStockMedicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      currentStock: 5,
      minStock: 50,
      category: "Pain Relief",
      price: 12.5,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      currentStock: 8,
      minStock: 30,
      category: "Antibiotics",
      price: 25.0,
    },
    {
      id: 3,
      name: "Insulin Glargine",
      currentStock: 3,
      minStock: 20,
      category: "Diabetes",
      price: 85.0,
    },
  ]

  const recentOrders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      customer: "John Smith",
      items: 3,
      total: 67.5,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customer: "Sarah Wilson",
      items: 2,
      total: 45.0,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customer: "Michael Brown",
      items: 1,
      total: 25.0,
      status: "processing",
      date: "2024-01-14",
    },
  ]

  return (
    <DashboardLayout title="Pharmacist Dashboard" sidebar={<PharmacistSidebar />}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalMedicines}</p>
                  <p className="text-sm text-gray-600">Total Medicines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.lowStock}</p>
                  <p className="text-sm text-gray-600">Low Stock Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${stats.todaysSales}</p>
                  <p className="text-sm text-gray-600">Today's Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Low Stock Alert</span>
              </CardTitle>
              <CardDescription>Medicines running low on stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockMedicines.map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-semibold">{medicine.name}</h4>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                      <p className="text-sm text-red-600">
                        Stock: {medicine.currentStock} / Min: {medicine.minStock}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${medicine.price}</p>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full">
                  <Link href="/pharmacist/inventory">View All Inventory</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Recent Orders</span>
              </CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{order.orderNumber}</h4>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">
                        {order.items} items • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total}</p>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/pharmacist/orders">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common pharmacy tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col">
                <Link href="/pharmacist/medicines/new">
                  <Plus className="h-6 w-6 mb-2" />
                  Add Medicine
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/pharmacist/inventory">
                  <Package className="h-6 w-6 mb-2" />
                  Manage Inventory
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/pharmacist/orders">
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  Process Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/pharmacist/reports">
                  <TrendingDown className="h-6 w-6 mb-2" />
                  Sales Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
