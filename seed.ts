import { db } from './src/db/index';
import { users, categories, equipment, equipmentCategories } from './src/db/schema';
import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function seed() {
  console.log('Starting seed...');

  try {
    // First, create categories
    console.log('Creating categories...');
    const categoryData = [
      { name: 'Microscopy', image: null },
      { name: 'Imaging', image: null },
      { name: 'Analysis', image: null },
      { name: 'Sample Preparation', image: null },
      { name: 'Spectroscopy', image: null },
      { name: 'Chromatography', image: null },
    ];

    for (const cat of categoryData) {
      try {
        await db.insert(categories).values(cat).onConflictDoNothing();
      } catch (error) {
        console.log(`Category ${cat.name} might already exist, skipping...`);
      }
    }
    console.log('Categories created!');

    // Create test users
    const hashedPassword = await hashPassword('password123');
    
    const [provider1] = await db.insert(users).values({
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      password: hashedPassword,
      role: 'provider',
      organization: 'TechLab University',
      phoneNumber: '+1-555-0101'
    }).returning().onConflictDoNothing().catch(() => []);

    const [provider2] = await db.insert(users).values({
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@research.org',
      password: hashedPassword,
      role: 'provider',
      organization: 'Research Institute',
      phoneNumber: '+1-555-0102'
    }).returning().onConflictDoNothing().catch(() => []);

    const [researcher1] = await db.insert(users).values({
      name: 'Mike Wilson',
      email: 'mike.wilson@student.edu',
      password: hashedPassword,
      role: 'researcher',
      organization: 'Graduate School',
      phoneNumber: '+1-555-0201'
    }).returning().onConflictDoNothing().catch(() => []);

    console.log('Created test users');

    // Get categories
    const allCategories = await db.select().from(categories);
    const imagingCategory = allCategories.find(c => c.name === 'Imaging');
    const analysisCategory = allCategories.find(c => c.name === 'Analysis');
    const samplePrepCategory = allCategories.find(c => c.name === 'Sample Preparation');
    const microscopyCategory = allCategories.find(c => c.name === 'Microscopy');

    if (provider1 && imagingCategory && microscopyCategory) {
      // Create test equipment
      const [equipment1] = await db.insert(equipment).values({
        name: 'High-Resolution Microscope',
        providerId: provider1.id,
        description: 'Advanced confocal microscope with high-resolution imaging capabilities. Perfect for cell biology and materials science research.',
        pricing: '150.00',
        location: 'Building A, Room 205',
        availability: true
      }).returning().onConflictDoNothing().catch(() => []);

      if (equipment1) {
        // Associate with categories
        await db.insert(equipmentCategories).values([
          { equipmentId: equipment1.id, categoryId: imagingCategory.id },
          { equipmentId: equipment1.id, categoryId: microscopyCategory.id }
        ]).onConflictDoNothing().catch(() => []);

        console.log('Created microscope equipment');
      }
    }

    if (provider2 && samplePrepCategory) {
      const [equipment2] = await db.insert(equipment).values({
        name: 'Centrifuge X200',
        providerId: provider2.id,
        description: 'High-speed centrifuge for sample preparation and purification. Suitable for various molecular biology applications.',
        pricing: '75.00',
        location: 'Lab Complex B',
        availability: false
      }).returning().onConflictDoNothing().catch(() => []);

      if (equipment2) {
        await db.insert(equipmentCategories).values([
          { equipmentId: equipment2.id, categoryId: samplePrepCategory.id }
        ]).onConflictDoNothing().catch(() => []);

        console.log('Created centrifuge equipment');
      }
    }

    if (provider1 && analysisCategory) {
      const [equipment3] = await db.insert(equipment).values({
        name: 'Spectrophotometer',
        providerId: provider1.id,
        description: 'UV-Vis spectrophotometer for quantitative analysis of samples. Includes software for data analysis.',
        pricing: '100.00',
        location: 'Chemistry Wing, Room 301',
        availability: true
      }).returning().onConflictDoNothing().catch(() => []);

      if (equipment3) {
        await db.insert(equipmentCategories).values([
          { equipmentId: equipment3.id, categoryId: analysisCategory.id }
        ]).onConflictDoNothing().catch(() => []);

        console.log('Created spectrophotometer equipment');
      }
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
