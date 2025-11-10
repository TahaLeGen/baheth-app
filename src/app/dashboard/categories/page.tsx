"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Tag, Search, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

interface Category {
  id: string;
  name: string;
  image?: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export default function CategoriesPage() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchCategories()
  }, [])

  // Auto-expand all categories when searching
  useEffect(() => {
    if (search) {
      // Get all category IDs recursively
      const getAllCategoryIds = (cats: Category[]): string[] => {
        let ids: string[] = []
        cats.forEach(cat => {
          ids.push(cat.id)
          if (cat.children) {
            ids = ids.concat(getAllCategoryIds(cat.children))
          }
        })
        return ids
      }
      setExpandedCategories(new Set(getAllCategoryIds(categories)))
    } else {
      setExpandedCategories(new Set())
    }
  }, [search, categories])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?includeChildren=true')
      const data = await response.json()
      
      if (response.ok) {
        // Filter to show only root categories (those without parents)
        const rootCategories = (data.categories || []).filter((cat: Category) => !cat.parentId)
        setCategories(rootCategories)
      } else {
        console.error('Failed to fetch categories:', data.error)
        toast.error('Failed to load categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? This will remove it from all equipment.')) return

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.ok) {
        // Refresh the entire list after deletion
        fetchCategories()
        toast.success('Category deleted successfully')
      } else {
        const data = await response.json()
        toast.error('Failed to delete category: ' + data.error)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  // Recursive function to search through all nested categories
  const searchInCategory = (category: Category, searchTerm: string): Category | null => {
    const lowerSearch = searchTerm.toLowerCase()
    const matches = category.name.toLowerCase().includes(lowerSearch)
    
    // Search in children recursively
    let filteredChildren: Category[] = []
    if (category.children) {
      filteredChildren = category.children
        .map(child => searchInCategory(child, searchTerm))
        .filter((child): child is Category => child !== null)
    }
    
    // If this category matches or has matching children, include it
    if (matches || filteredChildren.length > 0) {
      return {
        ...category,
        children: filteredChildren.length > 0 ? filteredChildren : category.children,
      }
    }
    
    return null
  }

  const filteredCategories = search
    ? categories
        .map(cat => searchInCategory(cat, search))
        .filter((cat): cat is Category => cat !== null)
    : categories

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedCategories.has(category.id)
    
    return (
      <div key={category.id} className="space-y-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1" style={{ paddingLeft: `${level * 20}px` }}>
                {hasChildren && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                )}
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-12 w-12 rounded object-cover" 
                  />
                ) : (
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <Tag className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{category.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {hasChildren && `${category.children!.length} subcategories • `}
                    Created {new Date(category.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          {canManageCategories && (
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/dashboard/categories/edit/${category.id}`}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/dashboard/categories/new?parentId=${category.id}`}>
                    <Plus className="h-3 w-3" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        {hasChildren && isExpanded && (
          <div className="space-y-2 ml-4 border-l-2 border-muted pl-4">
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const canManageCategories = user?.role === 'admin' || user?.role === 'provider'

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
          <h1 className="text-3xl font-bold tracking-tight">Equipment Categories</h1>
          <p className="text-muted-foreground">
            {canManageCategories 
              ? 'Manage equipment categories for better organization' 
              : 'Browse available equipment categories'}
          </p>
        </div>
        {canManageCategories && (
          <Button asChild>
            <Link href="/dashboard/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {filteredCategories.map((category) => renderCategory(category))}
      </div>

      {filteredCategories.length === 0 && !loading && (
        <div className="text-center py-12">
          <Tag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No categories found</h3>
          <p className="text-muted-foreground">
            {search 
              ? "No categories match your search criteria." 
              : "No categories have been created yet."}
          </p>
          {canManageCategories && !search && (
            <Button asChild className="mt-4">
              <Link href="/dashboard/categories/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
