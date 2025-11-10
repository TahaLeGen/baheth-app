"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    parentId: 'none',
  })

  useEffect(() => {
    fetchCategory()
    fetchCategories()
  }, [categoryId])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (response.ok) {
        // Get all categories first
        const allCategories = data.categories || []
        
        // Build a set of category IDs to exclude (current category and all its descendants)
        const getDescendantIds = (catId: string, cats: Category[]): Set<string> => {
          const descendants = new Set<string>([catId])
          const children = cats.filter(c => c.parentId === catId)
          children.forEach(child => {
            const childDescendants = getDescendantIds(child.id, cats)
            childDescendants.forEach(id => descendants.add(id))
          })
          return descendants
        }
        
        const excludedIds = getDescendantIds(categoryId, allCategories)
        const filtered = allCategories.filter((cat: Category) => !excludedIds.has(cat.id))
        setCategories(filtered)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`)
      const data = await response.json()
      
      if (response.ok) {
        setFormData({
          name: data.category.name,
          image: data.category.image || '',
          parentId: data.category.parentId || 'none',
        })
      } else {
        toast.error('Failed to load category')
        router.push('/dashboard/categories')
      }
    } catch (error) {
      console.error('Error fetching category:', error)
      toast.error('Failed to load category')
      router.push('/dashboard/categories')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image || undefined,
          parentId: formData.parentId === 'none' ? null : formData.parentId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Category updated successfully')
        router.push('/dashboard/categories')
      } else {
        toast.error(data.error || 'Failed to update category')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  const buildCategoryTree = (cats: Category[], parentId: string | null = null, level: number = 0): any[] => {
    const children = cats.filter(cat => cat.parentId === parentId)
    let result: any[] = []
    
    children.forEach((cat) => {
      // Use different prefixes based on level for better visualization
      const prefix = '│  '.repeat(level) + (level > 0 ? '├─ ' : '')
      result.push({
        id: cat.id,
        name: prefix + cat.name,
      })
      // Recursively build tree for children
      const subChildren = buildCategoryTree(cats, cat.id, level + 1)
      result = result.concat(subChildren)
    })
    
    return result
  }

  const hierarchicalCategories = buildCategoryTree(categories)

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground">Update category information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Edit the category information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Microscopy, Spectroscopy, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Category (optional)</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => setFormData({ ...formData, parentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category (none for root)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Root Category)</SelectItem>
                  {hierarchicalCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave empty to make this a root category, or select a parent to nest it
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Category preview" 
                    className="h-32 w-32 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Category'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/categories">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
