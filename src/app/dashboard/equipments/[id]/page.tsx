"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Package, Edit, MapPin, DollarSign } from "lucide-react"
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

export default function EquipmentDetailPage() {
  const params = useParams()
  const equipmentId = params.id as string
  const { user } = useAuth()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEquipment()
  }, [equipmentId])

  const fetchEquipment = async () => {
    try {
      const response = await fetch(`/api/equipment/${equipmentId}`)
      const data = await response.json()
      
      if (response.ok) {
        setEquipment(data.equipment)
      } else {
        console.error('Failed to fetch equipment:', data.error)
      }
    } catch (error) {
      console.error('Error fetching equipment:', error)
    } finally {
      setLoading(false)
    }
  }

  const canManageEquipment = () => {
    return equipment && (user?.role === 'admin' || (user?.role === 'provider' && equipment.provider.id === user.id))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="space-y-6">
        <Button variant="outline" asChild>
          <Link href="/dashboard/equipments">← Back to Equipment</Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Equipment not found</h3>
            <p className="text-muted-foreground mt-2">
              The equipment you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/equipments">Browse Equipment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/equipments">← Back to Equipment</Link>
        </Button>
        {canManageEquipment() && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/equipments/edit/${equipment.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Equipment Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {equipment.image ? (
              <img 
                src={equipment.image} 
                alt={equipment.name} 
                className="h-20 w-20 rounded-lg object-cover" 
              />
            ) : (
              <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-2xl">{equipment.name}</CardTitle>
              <CardDescription className="mt-2">
                {equipment.description || 'No description available'}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                {equipment.categories.map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
                <Badge variant={equipment.availability ? 'default' : 'secondary'}>
                  {equipment.availability ? 'Available' : 'Not Available'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Provider Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {equipment.provider.name}</p>
                {equipment.provider.organization && (
                  <p><strong>Organization:</strong> {equipment.provider.organization}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Equipment Details</h3>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <strong>Location:</strong> {equipment.location}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  <strong>Pricing:</strong> ${equipment.pricing}/analysis
                </p>
              </div>
            </div>
          </div>
          
          {user?.role === 'researcher' && equipment.availability && (
            <div className="pt-4 border-t">
              <Button size="lg" className="w-full">
                Book Equipment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
