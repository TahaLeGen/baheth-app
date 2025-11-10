"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { User, Search, Star, MapPin, Mail, Calendar, BookOpen } from "lucide-react"

export default function ResearchersPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'admin'
  const id = searchParams.get('id')

  // If viewing a single researcher
  if (id) {
    return <SingleResearcherView role={role} researcherId={id} />
  }

  // Mock researchers data
  const researchers = [
    {
      id: 'rs1',
      name: 'Dr. Sarah Johnson',
      institution: 'Harvard Medical School',
      field: 'Molecular Biology',
      location: 'Boston, MA',
      rating: 4.9,
      totalBookings: 45,
      activeBookings: 3,
      joinDate: '2023-01-15',
      verified: true,
      email: 'sarah.johnson@harvard.edu',
      specializations: ['Cell Biology', 'Cancer Research', 'Microscopy']
    },
    {
      id: 'rs2',
      name: 'Prof. Mike Chen',
      institution: 'MIT',
      field: 'Materials Science',
      location: 'Cambridge, MA',
      rating: 4.7,
      totalBookings: 67,
      activeBookings: 2,
      joinDate: '2022-08-20',
      verified: true,
      email: 'mchen@mit.edu',
      specializations: ['Nanotechnology', 'X-Ray Analysis', 'Crystallography']
    },
    {
      id: 'rs3',
      name: 'Dr. Lisa Wang',
      institution: 'Stanford University',
      field: 'Chemistry',
      location: 'Palo Alto, CA',
      rating: 4.8,
      totalBookings: 32,
      activeBookings: 1,
      joinDate: '2023-03-10',
      verified: false,
      email: 'lwang@stanford.edu',
      specializations: ['Organic Chemistry', 'Spectroscopy', 'Drug Discovery']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Researchers</h1>
          <p className="text-muted-foreground">Manage researchers on the platform</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search researchers..."
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="materials">Materials Science</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Institution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Institutions</SelectItem>
            <SelectItem value="harvard">Harvard</SelectItem>
            <SelectItem value="mit">MIT</SelectItem>
            <SelectItem value="stanford">Stanford</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Researchers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {researchers.map((researcher) => (
          <Card key={researcher.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <User className="h-8 w-8 text-muted-foreground" />
                <div className="flex gap-2">
                  {researcher.verified && (
                    <Badge variant="default">Verified</Badge>
                  )}
                  {researcher.activeBookings > 0 && (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{researcher.name}</CardTitle>
              <CardDescription>
                <div>{researcher.institution}</div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {researcher.location}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium">{researcher.field}</div>
                <div className="text-xs text-muted-foreground">{researcher.email}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="font-medium">{researcher.totalBookings}</div>
                  <div className="text-xs text-muted-foreground">Total Bookings</div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{researcher.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Specializations:</div>
                <div className="flex flex-wrap gap-1">
                  {researcher.specializations.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {researcher.specializations.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{researcher.specializations.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href={`/manage?role=${role}&path=researchers&id=${researcher.id}`}>
                  View Researcher
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SingleResearcherView({ role, researcherId }: { role: string, researcherId: string }) {
  // Mock researcher details
  const researcher = {
    id: researcherId,
    name: 'Dr. Sarah Johnson',
    title: 'Associate Professor',
    institution: 'Harvard Medical School',
    department: 'Department of Cell Biology',
    field: 'Molecular Biology',
    location: 'Boston, MA',
    rating: 4.9,
    totalBookings: 45,
    activeBookings: 3,
    completedBookings: 42,
    joinDate: '2023-01-15',
    lastActive: '2024-01-15',
    verified: true,
    email: 'sarah.johnson@harvard.edu',
    phone: '+1 (617) 432-1234',
    orcid: '0000-0002-1234-5678',
    specializations: ['Cell Biology', 'Cancer Research', 'Microscopy', 'Molecular Imaging', 'Drug Discovery'],
    bio: 'Dr. Sarah Johnson is a leading researcher in molecular biology with over 15 years of experience. Her work focuses on understanding cellular mechanisms in cancer development and finding new therapeutic targets.',
    education: [
      'Ph.D. in Molecular Biology, Harvard University (2008)',
      'M.S. in Biology, Stanford University (2004)',
      'B.S. in Biochemistry, MIT (2002)'
    ],
    publications: 67,
    citationCount: 2456,
    hIndex: 28
  }

  // Mock recent bookings
  const recentBookings = [
    {
      id: 'bk1',
      equipment: 'High-Resolution Microscope',
      provider: 'TechLab University',
      date: '2024-01-20',
      status: 'Confirmed'
    },
    {
      id: 'bk2',
      equipment: 'Flow Cytometer',
      provider: 'BioCorp Labs',
      date: '2024-01-18',
      status: 'Completed'
    },
    {
      id: 'bk3',
      equipment: 'Mass Spectrometer',
      provider: 'Research Institute',
      date: '2024-01-22',
      status: 'Pending'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{researcher.name}</h1>
          <p className="text-muted-foreground">{researcher.title}, {researcher.institution}</p>
        </div>
        <div className="flex gap-2">
          {researcher.verified && (
            <Badge variant="default">Verified</Badge>
          )}
          {researcher.activeBookings > 0 && (
            <Badge variant="secondary">Active</Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Researcher Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {researcher.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    {researcher.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {researcher.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3" />
                    ORCID: {researcher.orcid}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Institution Details</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>{researcher.institution}</div>
                  <div>{researcher.department}</div>
                  <div>Field: {researcher.field}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Biography</h4>
              <p className="text-muted-foreground text-sm">{researcher.bio}</p>
            </div>
            <div>
              <h4 className="font-semibold">Specializations</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {researcher.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Education</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {researcher.education.map((edu, index) => (
                  <li key={index}>• {edu}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{researcher.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">User Rating</p>
              </div>
              <div>
                <div className="font-medium">{researcher.totalBookings}</div>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
              <div>
                <div className="font-medium">{researcher.activeBookings}</div>
                <p className="text-xs text-muted-foreground">Active Bookings</p>
              </div>
              <div>
                <div className="font-medium">{researcher.completedBookings}</div>
                <p className="text-xs text-muted-foreground">Completed Bookings</p>
              </div>
              <div>
                <div className="font-medium">{researcher.publications}</div>
                <p className="text-xs text-muted-foreground">Publications</p>
              </div>
              <div>
                <div className="font-medium">{researcher.citationCount}</div>
                <p className="text-xs text-muted-foreground">Citations</p>
              </div>
              <div>
                <div className="font-medium">{researcher.hIndex}</div>
                <p className="text-xs text-muted-foreground">H-Index</p>
              </div>
              <div>
                <div className="font-medium">{researcher.joinDate}</div>
                <p className="text-xs text-muted-foreground">Member Since</p>
              </div>
              <div>
                <div className="font-medium">{researcher.lastActive}</div>
                <p className="text-xs text-muted-foreground">Last Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h5 className="font-medium">{booking.equipment}</h5>
                    <p className="text-sm text-muted-foreground">
                      {booking.provider} • {booking.date}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      booking.status === 'Confirmed' ? 'default' :
                      booking.status === 'Completed' ? 'outline' : 'secondary'
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button asChild>
                <Link href={`/manage?role=${role}&path=bookings&researcher=${researcher.id}`}>
                  View All Bookings
                </Link>
              </Button>
              <Button variant="outline">Contact Researcher</Button>
              <Button variant="outline">Edit Profile</Button>
              <Button variant="outline">Manage Verification</Button>
              <Button variant="outline">View Activity Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
