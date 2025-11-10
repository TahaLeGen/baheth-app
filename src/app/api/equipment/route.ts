import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { equipment, equipmentCategories, categories, users } from '@/db/schema';
import { eq, and, ilike, sql, inArray } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { createEquipmentSchema } from '@/lib/validations/equipment';

// GET /api/equipment - List all equipment with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const availability = searchParams.get('availability');
    const providerId = searchParams.get('providerId');

    // Start with a basic query
    const baseQuery = db.select().from(equipment);
    
    // Build where conditions
    const whereConditions = [];
    
    if (search) {
      whereConditions.push(ilike(equipment.name, `%${search}%`));
    }
    
    if (availability !== null && availability !== undefined) {
      whereConditions.push(eq(equipment.availability, availability === 'true'));
    }
    
    if (providerId) {
      whereConditions.push(eq(equipment.providerId, providerId));
    }

    // Apply where conditions
    let equipmentList;
    if (whereConditions.length > 0) {
      equipmentList = await baseQuery.where(and(...whereConditions));
    } else {
      equipmentList = await baseQuery;
    }

    // Filter by category if needed
    if (categoryId) {
      const equipmentInCategory = await db
        .select({ equipmentId: equipmentCategories.equipmentId })
        .from(equipmentCategories)
        .where(eq(equipmentCategories.categoryId, categoryId));
      
      const equipmentIds = equipmentInCategory.map(ec => ec.equipmentId);
      equipmentList = equipmentList.filter(eq => equipmentIds.includes(eq.id));
    }

    // Get providers
    const providerIds = [...new Set(equipmentList.map(eq => eq.providerId))];
    let providers: Array<{id: string, name: string, organization: string | null}> = [];
    if (providerIds.length > 0) {
      providers = await db
        .select({
          id: users.id,
          name: users.name,
          organization: users.organization,
        })
        .from(users)
        .where(inArray(users.id, providerIds));
    }

    // Get categories for each equipment
    const equipmentIds = equipmentList.map(eq => eq.id);
    let equipmentCats: Array<{
      equipmentId: string,
      categoryId: string | null,
      categoryName: string | null,
      categoryImage: string | null
    }> = [];
    if (equipmentIds.length > 0) {
      equipmentCats = await db
        .select({
          equipmentId: equipmentCategories.equipmentId,
          categoryId: equipmentCategories.categoryId,
          categoryName: categories.name,
          categoryImage: categories.image,
        })
        .from(equipmentCategories)
        .leftJoin(categories, eq(equipmentCategories.categoryId, categories.id))
        .where(inArray(equipmentCategories.equipmentId, equipmentIds));
    }

    // Combine the data
    const result = equipmentList.map(eq => {
      const provider = providers.find(p => p.id === eq.providerId);
      const cats = equipmentCats
        .filter(ec => ec.equipmentId === eq.id)
        .map(ec => ({
          id: ec.categoryId,
          name: ec.categoryName,
          image: ec.categoryImage,
        }));

      return {
        ...eq,
        provider: provider || { id: eq.providerId, name: 'Unknown', organization: null },
        categories: cats,
      };
    });

    return NextResponse.json({ equipment: result });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    );
  }
}

// POST /api/equipment - Create new equipment
export async function POST(request: NextRequest) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'provider' && user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    
    // Validate input
    const validation = createEquipmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { categoryIds, ...equipmentData } = validation.data;

    // Create equipment
    const [newEquipment] = await db
      .insert(equipment)
      .values({
        ...equipmentData,
        providerId: user.id,
        pricing: equipmentData.pricing.toString(),
      })
      .returning();

    // Associate with categories if provided
    if (categoryIds && categoryIds.length > 0) {
      await db.insert(equipmentCategories).values(
        categoryIds.map((categoryId: string) => ({
          equipmentId: newEquipment.id,
          categoryId,
        }))
      );
    }

    return NextResponse.json({ equipment: newEquipment }, { status: 201 });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json(
      { error: 'Failed to create equipment' },
      { status: 500 }
    );
  }
}
