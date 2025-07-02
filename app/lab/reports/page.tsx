"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FlaskConical,
  FileText,
  Users,
  Settings,
  TestTube,
  Search,
  Download,
  Eye,
  Send,
  Plus,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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
import { useToast } from "@/hooks/use-toast"

function LabSidebar() {
  const menuItems = [
    { icon: FlaskConical, label: "Dashboard", href: "/lab/dashboard" },
    { icon: TestTube, label: "Assigned Tests", href: "/lab/tests" },
    { icon: FileText, label: "Reports", href: "/lab/reports", active: true },
    { icon: Users, label: "Patients", href: "/lab/patients" },
    { icon: Settings, label: "Test Catalog", href: "/lab/catalog" },
  ]

  return (
    <nav className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
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

export default function LabReports() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)

  const reports = [
    {
      id: "RPT001",
      patientName: "John Smith",
      patientId: "P001",
      testType: "Complete Blood Count",
      completedDate: "2024-01-15",
      reportDate: "2024-01-15",
      status: "Completed",
      results: "Normal",
      technician: "Lab Tech 1",
      reviewedBy: "Dr. Sarah Johnson",
      critical: false,
    },
    {
      id: "RPT002",
      patientName: "Sarah Wilson",
      patientId: "P002",
      testType: "Urine Analysis",
      completedDate: "2024-01-14",
      reportDate: "2024-01-14",
      status: "Sent",
      results: "Abnormal - UTI detected",
      technician: "Lab Tech 2",
      reviewedBy: "Dr. Michael Chen",
      critical: true,
    },
    {
      id: "RPT003",
      patientName: "Michael Brown",
      patientId: "P003",
      testType: "Lipid Panel",
      completedDate: "2024-01-13",
      reportDate: "2024-01-13",
      status: "Pending Review",
      results: "Cholesterol: 250 mg/dL (High)",
      technician: "Lab Tech 1",
      reviewedBy: null,
      critical: false,
    },
    {
      id: "RPT004",
      patientName: "Emily Davis",
      patientId: "P004",
      testType: "Thyroid Function Test",
      completedDate: "2024-01-12",
      reportDate: "2024-01-12",
      status: "Draft",
      results: "TSH: 8.5 mIU/L (Elevated)",
      technician: "Lab Tech 2",
      reviewedBy: null,
      critical: true,
    },
  ]

  const [newReport, setNewReport] = useState({
    patientId: "",
    patientName: "",
    testType: "",
    results: "",
    findings: "",
    recommendations: "",
  })

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateReport = () => {
    // In real app, this would create the report
    setIsNewReportOpen(false)
    setNewReport({
      patientId: "",
      patientName: "",
      testType: "",
      results: "",
      findings: "",
      recommendations: "",
    })
    toast({
      title: "Report Created",
      description: "New lab report has been created successfully.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Sent":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout title="Lab Reports" sidebar={<LabSidebar />}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports by patient name, test type, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Completed">Completed</option>
              <option value="Sent">Sent</option>
            </select>
            <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Lab Report</DialogTitle>
                  <DialogDescription>Fill in the details for the new lab report</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        value={newReport.patientId}
                        onChange={(e) => setNewReport((prev) => ({ ...prev, patientId: e.target.value }))}
                        placeholder="P001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        value={newReport.patientName}
                        onChange={(e) => setNewReport((prev) => ({ ...prev, patientName: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="testType">Test Type</Label>
                    <Input
                      id="testType"
                      value={newReport.testType}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, testType: e.target.value }))}
                      placeholder="Complete Blood Count"
                    />
                  </div>

                  <div>
                    <Label htmlFor="results">Test Results</Label>
                    <Textarea
                      id="results"
                      value={newReport.results}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, results: e.target.value }))}
                      placeholder="Enter test results..."
                      className="h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="findings">Clinical Findings</Label>
                    <Textarea
                      id="findings"
                      value={newReport.findings}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, findings: e.target.value }))}
                      placeholder="Enter clinical findings..."
                      className="h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="recommendations">Recommendations</Label>
                    <Textarea
                      id="recommendations"
                      value={newReport.recommendations}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, recommendations: e.target.value }))}
                      placeholder="Enter recommendations..."
                      className="h-20"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsNewReportOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateReport}>Create Report</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>
                        {report.patient

                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{report.patientName}</h3>
                      <p className="text-gray-600">
                        Report ID: {report.id} • Patient ID: {report.patientId}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        {report.critical && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                    <Button size="sm" variant="outline">
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Test Type:</span>
                    <p className="text-gray-900">{report.testType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Completed Date:</span>
                    <p className="text-gray-900">{report.completedDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Report Date:</span>
                    <p className="text-gray-900">{report.reportDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Technician:</span>
                    <p className="text-gray-900">{report.technician}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Results:</span>
                    <p className={`${report.critical ? "text-red-600 font-semibold" : "text-gray-900"}`}>
                      {report.results}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Reviewed By:</span>
                    <p className="text-gray-900">{report.reviewedBy || "Pending Review"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredReports.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={() => setIsNewReportOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Report
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
