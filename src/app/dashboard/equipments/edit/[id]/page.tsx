"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { X } from "lucide-react"

interface Category {
  id: string;
  name: string;
  image?: string;
}

interface Equipment {
  id: string;
  name: string;
  description?: string;
  image?: string;
  availability: boolean;
  pricing: string;
  location: string;
  provider: {
    id: string;
    name: string;
  };
  categories: Category[];
}

export default function EditEquipmentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const equipmentId = params.id as string
  
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    pricing: '',
    location: '',
    availability: true,
  })

  useEffect(() => {
    if (equipmentId) {
      fetchEquipment()
      fetchCategories()
    }
  }, [equipmentId])

  const fetchEquipment = async () => {
    try {
      const response = await fetch(`/api/equipment/${equipmentId}`)
      const data = await response.json()
      
      if (response.ok) {
        const eq = data.equipment
        setEquipment(eq)
        setFormData({
          name: eq.name,
          description: eq.description || '',
          image: eq.image || '',
          pricing: eq.pricing,
          location: eq.location,
          availability: eq.availability,
        })
        setSelectedCategories(eq.categories.map((c: Category) => c.id))
      } else {
        console.error('Failed to fetch equipment:', data.error)
        router.push('/dashboard/equipments')
      }
    } catch (error) {
      console.error('Error fetching equipment:', error)
      router.push('/dashboard/equipments')
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.pricing || !formData.location) {
      alert('Please fill in all required fields')
      return
    }

    // Check permissions
    if (!equipment || (user?.role !== 'admin' && equipment.provider.id !== user?.id)) {
      alert('You do not have permission to edit this equipment')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/equipment/${equipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          pricing: parseFloat(formData.pricing),
          categoryIds: selectedCategories,
        }),
      })

      if (response.ok) {
        router.push('/dashboard/equipments')
      } else {
        const data = await response.json()
        alert('Failed to update equipment: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating equipment:', error)
      alert('Failed to update equipment')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse space-y-4">Loading equipment...</div>
  }

  if (!equipment) {
    return <div>Equipment not found</div>
  }

  // Check permissions
  if (user?.role !== 'admin' && equipment.provider.id !== user?.id) {
    return <div>You do not have permission to edit this equipment</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Equipment</h1>
          <p className="text-muted-foreground">Update equipment information</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/equipments">Cancel</Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Equipment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., High-Resolution Microscope"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the equipment and its capabilities..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricing">Pricing per Analysis ($) *</Label>
                <Input
                  id="pricing"
                  name="pricing"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select 
                  value={formData.availability.toString()} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value === 'true' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Building A, Room 205"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId)
                  return category ? (
                    <Badge key={categoryId} variant="secondary" className="flex items-center gap-1">
                      {category.name}
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle(categoryId)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null
                })}
              </div>
              <Select onValueChange={handleCategoryToggle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select categories..." />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter(category => !selectedCategories.includes(category.id))
                    .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/equipments">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
