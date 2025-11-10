"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Package, Search, Filter, Plus, Edit, Trash2, MapPin, DollarSign } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Category {
  id: string;
  name: string;
  image?: string;
}

interface Provider {
  id: string;
  name: string;
  organization?: string;
}

interface Equipment {
  id: string;
  name: string;
  description?: string;
  image?: string;
  availability: boolean;
  pricing: string;
  location: string;
  provider: Provider;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export default function EquipmentsPage() {
  const { user } = useAuth()
  
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')

  useEffect(() => {
    fetchEquipment()
    fetchCategories()
  }, [search, selectedCategory, availabilityFilter, user])

  const fetchEquipment = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (selectedCategory !== 'all') params.append('categoryId', selectedCategory)
      if (availabilityFilter !== 'all') params.append('availability', availabilityFilter)
      if (user?.role === 'provider') params.append('providerId', user.id)

      const response = await fetch(`/api/equipment?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setEquipment(data.equipment || [])
      } else {
        console.error('Failed to fetch equipment:', data.error)
      }
    } catch (error) {
      console.error('Error fetching equipment:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (response.ok) {
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDeleteEquipment = async (equipmentId: string) => {
    if (!confirm('Are you sure you want to delete this equipment?')) return

    try {
      const response = await fetch(`/api/equipment/${equipmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.ok) {
        setEquipment(equipment.filter(eq => eq.id !== equipmentId))
      } else {
        const data = await response.json()
        alert('Failed to delete equipment: ' + data.error)
      }
    } catch (error) {
      console.error('Error deleting equipment:', error)
      alert('Failed to delete equipment')
    }
  }

  const getPageTitle = () => {
    switch (user?.role) {
      case 'provider':
        return 'My Equipment'
      case 'admin':
        return 'All Equipment'
      default:
        return 'Browse Equipment'
    }
  }

  const getPageDescription = () => {
    switch (user?.role) {
      case 'provider':
        return 'Manage your equipment inventory and availability'
      case 'admin':
        return 'Oversee all equipment across the platform'
      default:
        return 'Find and book research equipment'
    }
  }

  const canManageEquipment = (eq: Equipment) => {
    return user?.role === 'admin' || (user?.role === 'provider' && eq.provider.id === user.id)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          <p className="text-muted-foreground">{getPageDescription()}</p>
        </div>
        {(user?.role === 'provider' || user?.role === 'admin') && (
          <Button asChild>
            <Link href="/dashboard/equipments/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Link>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Not Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Equipment Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipment.map((eq) => (
          <Card key={eq.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                {eq.image ? (
                  <img src={eq.image} alt={eq.name} className="h-8 w-8 rounded object-cover" />
                ) : (
                  <Package className="h-8 w-8 text-muted-foreground" />
                )}
                <div className="flex gap-2">
                  <Badge 
                    variant={eq.availability ? 'default' : 'secondary'}
                  >
                    {eq.availability ? 'Available' : 'Not Available'}
                  </Badge>
                  {canManageEquipment(eq) && (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/dashboard/equipments/edit/${eq.id}`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEquipment(eq.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{eq.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {eq.description || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {eq.categories.map((category) => (
                  <Badge key={category.id} variant="outline" className="text-xs">
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {eq.location}
              </div>
              <div className="text-sm text-muted-foreground">
                Provider: {eq.provider.name}
                {eq.provider.organization && ` (${eq.provider.organization})`}
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <DollarSign className="h-4 w-4" />
                {eq.pricing}/analysis
              </div>
              <Button asChild className="w-full">
                <Link href={`/dashboard/equipments/${eq.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {equipment.length === 0 && !loading && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No equipment found</h3>
          <p className="text-muted-foreground">
            {user?.role === 'provider' 
              ? "You haven't added any equipment yet." 
              : "No equipment matches your search criteria."}
          </p>
          {(user?.role === 'provider' || user?.role === 'admin') && (
            <Button asChild className="mt-4">
              <Link href="/dashboard/equipments/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Equipment
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
