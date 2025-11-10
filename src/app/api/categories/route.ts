import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, ilike, asc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const parentId = searchParams.get('parentId');
    const includeChildren = searchParams.get('includeChildren') === 'true';

    let query = db.select().from(categories);

    // Filter by search term
    if (search) {
      query = query.where(ilike(categories.name, `%${search}%`)) as any;
    }

    // Filter by parent ID (null for root categories)
    if (parentId === 'null' || parentId === '') {
      query = query.where(eq(categories.parentId, null as any)) as any;
    } else if (parentId) {
      query = query.where(eq(categories.parentId, parentId)) as any;
    }

    query = query.orderBy(asc(categories.name)) as any;
    const result = await query;

    // If includeChildren is true, recursively fetch all nested children
    if (includeChildren) {
      // Fetch all categories once for better performance
      const allCategories = await db
        .select()
        .from(categories)
        .orderBy(asc(categories.name));

      // Recursive function to build category tree
      const buildCategoryTree = async (categoryId: string): Promise<any[]> => {
        const children = allCategories.filter(cat => cat.parentId === categoryId);
        
        if (children.length === 0) {
          return [];
        }

        return await Promise.all(
          children.map(async (child) => ({
            ...child,
            children: await buildCategoryTree(child.id),
          }))
        );
      };

      const categoriesWithChildren = await Promise.all(
        result.map(async (category) => {
          const children = await buildCategoryTree(category.id);
          return {
            ...category,
            children: children.length > 0 ? children : undefined,
          };
        })
      );
      return NextResponse.json({ categories: categoriesWithChildren });
    }

    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'admin' && user.role !== 'provider') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, image, parentId } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // If parentId is provided, check if parent exists
    if (parentId) {
      const [parent] = await db
        .select()
        .from(categories)
        .where(eq(categories.id, parentId));

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent category not found' },
          { status: 404 }
        );
      }
    }

    const [newCategory] = await db
      .insert(categories)
      .values({ name, image, parentId: parentId || null })
      .returning();

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
