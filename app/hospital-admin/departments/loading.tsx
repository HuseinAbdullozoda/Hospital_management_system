import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, Users, Calendar } from "lucide-react"
import Link from "next/link"

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

export default function DepartmentsLoading() {
  return (
    <DashboardLayout title="Departments Management" sidebar={sidebar}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center space-y-1">
                    <Skeleton className="h-8 w-8 mx-auto" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                  <div className="text-center space-y-1">
                    <Skeleton className="h-8 w-8 mx-auto" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
