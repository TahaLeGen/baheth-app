import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { equipment, equipmentCategories, categories, users } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

interface Params {
  id: string;
}

// GET /api/equipment/[id] - Get single equipment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const result = await db
      .select({
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        image: equipment.image,
        availability: equipment.availability,
        pricing: equipment.pricing,
        location: equipment.location,
        createdAt: equipment.createdAt,
        updatedAt: equipment.updatedAt,
        provider: {
          id: users.id,
          name: users.name,
          organization: users.organization,
          email: users.email,
          phoneNumber: users.phoneNumber,
        },
        categories: sql<any[]>`COALESCE(
          json_agg(
            json_build_object(
              'id', ${categories.id},
              'name', ${categories.name},
              'image', ${categories.image}
            )
          ) FILTER (WHERE ${categories.id} IS NOT NULL),
          '[]'
        )`,
      })
      .from(equipment)
      .leftJoin(users, eq(equipment.providerId, users.id))
      .leftJoin(equipmentCategories, eq(equipment.id, equipmentCategories.equipmentId))
      .leftJoin(categories, eq(equipmentCategories.categoryId, categories.id))
      .where(eq(equipment.id, id))
      .groupBy(
        equipment.id,
        equipment.name,
        equipment.description,
        equipment.image,
        equipment.availability,
        equipment.pricing,
        equipment.location,
        equipment.createdAt,
        equipment.updatedAt,
        users.id,
        users.name,
        users.organization,
        users.email,
        users.phoneNumber
      );

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Equipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ equipment: result[0] });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    );
  }
}

// PUT /api/equipment/[id] - Update equipment
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, description, image, availability, pricing, location, categoryIds } = body;

    // Check if equipment exists and user has permission
    const [existingEquipment] = await db
      .select()
      .from(equipment)
      .where(eq(equipment.id, id));

    if (!existingEquipment) {
      return NextResponse.json(
        { error: 'Equipment not found' },
        { status: 404 }
      );
    }

    if (user.role !== 'admin' && existingEquipment.providerId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update equipment
    const [updatedEquipment] = await db
      .update(equipment)
      .set({
        name,
        description,
        image,
        availability,
        pricing: pricing?.toString(),
        location,
        updatedAt: new Date(),
      })
      .where(eq(equipment.id, id))
      .returning();

    // Update categories if provided
    if (categoryIds !== undefined) {
      // Remove existing categories
      await db
        .delete(equipmentCategories)
        .where(eq(equipmentCategories.equipmentId, id));

      // Add new categories
      if (categoryIds.length > 0) {
        await db.insert(equipmentCategories).values(
          categoryIds.map((categoryId: string) => ({
            equipmentId: id,
            categoryId,
          }))
        );
      }
    }

    return NextResponse.json({ equipment: updatedEquipment });
  } catch (error) {
    console.error('Error updating equipment:', error);
    return NextResponse.json(
      { error: 'Failed to update equipment' },
      { status: 500 }
    );
  }
}

// DELETE /api/equipment/[id] - Delete equipment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const user = await auth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if equipment exists and user has permission
    const [existingEquipment] = await db
      .select()
      .from(equipment)
      .where(eq(equipment.id, id));

    if (!existingEquipment) {
      return NextResponse.json(
        { error: 'Equipment not found' },
        { status: 404 }
      );
    }

    if (user.role !== 'admin' && existingEquipment.providerId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete equipment (categories will be deleted automatically due to cascade)
    await db.delete(equipment).where(eq(equipment.id, id));

    return NextResponse.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return NextResponse.json(
      { error: 'Failed to delete equipment' },
      { status: 500 }
    );
  }
}
