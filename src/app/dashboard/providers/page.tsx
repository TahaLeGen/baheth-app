"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Building, Search, Star, MapPin, Phone, Mail } from "lucide-react"

export default function ProvidersPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'researcher'
  const id = searchParams.get('id')

  // If viewing a single provider
  if (id) {
    return <SingleProviderView role={role} providerId={id} />
  }

  const getPageTitle = () => {
    switch (role) {
      case 'admin':
        return 'All Providers'
      default:
        return 'Equipment Providers'
    }
  }

  const getPageDescription = () => {
    switch (role) {
      case 'admin':
        return 'Manage all equipment providers on the platform'
      default:
        return 'Find and connect with equipment providers'
    }
  }

  // Mock providers data
  const providers = [
    {
      id: 'pr1',
      name: 'TechLab University',
      type: 'University',
      location: 'New York, NY',
      rating: 4.8,
      equipmentCount: 45,
      specializations: ['Imaging', 'Analysis', 'Microscopy'],
      verified: true,
      contactEmail: 'equipment@techlab.edu',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 'pr2',
      name: 'Research Institute',
      type: 'Research Institute',
      location: 'Boston, MA',
      rating: 4.6,
      equipmentCount: 32,
      specializations: ['Sample Preparation', 'Centrifuges', 'Lab Equipment'],
      verified: true,
      contactEmail: 'lab@research-inst.org',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 'pr3',
      name: 'Science Center',
      type: 'Private Lab',
      location: 'San Francisco, CA',
      rating: 4.9,
      equipmentCount: 28,
      specializations: ['Spectroscopy', 'Analysis', 'Chemical Testing'],
      verified: false,
      contactEmail: 'info@sciencecenter.com',
      phone: '+1 (555) 345-6789'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search providers..."
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="university">University</SelectItem>
            <SelectItem value="institute">Research Institute</SelectItem>
            <SelectItem value="private">Private Lab</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="ny">New York</SelectItem>
            <SelectItem value="ma">Massachusetts</SelectItem>
            <SelectItem value="ca">California</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="imaging">Imaging</SelectItem>
            <SelectItem value="analysis">Analysis</SelectItem>
            <SelectItem value="preparation">Sample Preparation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Providers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Building className="h-8 w-8 text-muted-foreground" />
                <div className="flex gap-2">
                  {provider.verified && (
                    <Badge variant="default">Verified</Badge>
                  )}
                  <Badge variant="outline">{provider.type}</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {provider.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{provider.equipmentCount} equipment</span>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Specializations:</div>
                <div className="flex flex-wrap gap-1">
                  {provider.specializations.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {provider.specializations.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{provider.specializations.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href={`/manage?role=${role}&path=providers&id=${provider.id}`}>
                  View Provider
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SingleProviderView({ role, providerId }: { role: string, providerId: string }) {
  // Mock provider details
  const provider = {
    id: providerId,
    name: 'TechLab University',
    type: 'University',
    location: 'New York, NY',
    address: '123 Research Drive, New York, NY 10001',
    rating: 4.8,
    equipmentCount: 45,
    specializations: ['Imaging', 'Analysis', 'Microscopy', 'Spectroscopy', 'Lab Equipment'],
    verified: true,
    contactEmail: 'equipment@techlab.edu',
    phone: '+1 (555) 123-4567',
    website: 'https://techlab.edu/equipment',
    description: 'Leading university research facility providing state-of-the-art equipment for scientific research. Our lab has been serving the research community for over 20 years.',
    operatingHours: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed',
    certifications: ['ISO 9001', 'NIST Certified', 'University Accredited'],
    joinDate: '2020-03-15',
    totalBookings: 1247,
    responseTime: '2 hours average'
  }

  // Mock equipment from this provider
  const equipment = [
    {
      id: 'eq1',
      name: 'High-Resolution Microscope',
      category: 'Imaging',
      status: 'Available',
      price: '$150/Analysis'
    },
    {
      id: 'eq4',
      name: 'X-Ray Crystallography System',
      category: 'Analysis',
      status: 'Available',
      price: '$200/Analysis'
    },
    {
      id: 'eq5',
      name: 'Mass Spectrometer',
      category: 'Analysis',
      status: 'Booked',
      price: '$175/Analysis'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{provider.name}</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {provider.location}
          </p>
        </div>
        <div className="flex gap-2">
          {provider.verified && (
            <Badge variant="default">Verified</Badge>
          )}
          <Badge variant="outline">{provider.type}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Provider Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Provider Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {provider.contactEmail}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {provider.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {provider.address}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Operating Hours</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {provider.operatingHours}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Description</h4>
              <p className="text-muted-foreground text-sm">{provider.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Specializations</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {provider.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
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
                  <span className="font-medium">{provider.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <div className="font-medium">{provider.equipmentCount}</div>
                <p className="text-xs text-muted-foreground">Total Equipment</p>
              </div>
              <div>
                <div className="font-medium">{provider.totalBookings}</div>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
              <div>
                <div className="font-medium">{provider.responseTime}</div>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div>
                <div className="font-medium">{provider.joinDate}</div>
                <p className="text-xs text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Certifications & Equipment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {provider.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Featured Equipment</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {equipment.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="space-y-2">
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.price}</span>
                        <Badge 
                          variant={item.status === 'Available' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button asChild>
                <Link href={`/manage?role=${role}&path=equipments&provider=${provider.id}`}>
                  View All Equipment
                </Link>
              </Button>
              {role === 'researcher' && (
                <Button variant="outline">
                  Contact Provider
                </Button>
              )}
              {role === 'admin' && (
                <>
                  <Button variant="outline">Edit Provider</Button>
                  <Button variant="outline">View Bookings</Button>
                  <Button variant="outline">Manage Status</Button>
                </>
              )}
              <Button variant="outline">
                Visit Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
