import { db } from './src/db/index.js';
import { users, categories, equipment, equipmentCategories } from './src/db/schema.js';
import { hashPassword } from './src/lib/auth.js';

async function seed() {
  console.log('Starting seed...');

  try {
    // Create test users
    const hashedPassword = await hashPassword('password123');
    
    const [provider1] = await db.insert(users).values({
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      password: hashedPassword,
      role: 'provider',
      organization: 'TechLab University',
      phoneNumber: '+1-555-0101'
    }).returning().catch(() => []);

    const [provider2] = await db.insert(users).values({
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@research.org',
      password: hashedPassword,
      role: 'provider',
      organization: 'Research Institute',
      phoneNumber: '+1-555-0102'
    }).returning().catch(() => []);

    const [researcher1] = await db.insert(users).values({
      name: 'Mike Wilson',
      email: 'mike.wilson@student.edu',
      password: hashedPassword,
      role: 'researcher',
      organization: 'Graduate School',
      phoneNumber: '+1-555-0201'
    }).returning().catch(() => []);

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
      }).returning();

      // Associate with categories
      await db.insert(equipmentCategories).values([
        { equipmentId: equipment1.id, categoryId: imagingCategory.id },
        { equipmentId: equipment1.id, categoryId: microscopyCategory.id }
      ]);

      console.log('Created microscope equipment');
    }

    if (provider2 && samplePrepCategory) {
      const [equipment2] = await db.insert(equipment).values({
        name: 'Centrifuge X200',
        providerId: provider2.id,
        description: 'High-speed centrifuge for sample preparation and purification. Suitable for various molecular biology applications.',
        pricing: '75.00',
        location: 'Lab Complex B',
        availability: false
      }).returning();

      await db.insert(equipmentCategories).values([
        { equipmentId: equipment2.id, categoryId: samplePrepCategory.id }
      ]);

      console.log('Created centrifuge equipment');
    }

    if (provider1 && analysisCategory) {
      const [equipment3] = await db.insert(equipment).values({
        name: 'Spectrophotometer',
        providerId: provider1.id,
        description: 'UV-Vis spectrophotometer for quantitative analysis of samples. Includes software for data analysis.',
        pricing: '100.00',
        location: 'Chemistry Wing, Room 301',
        availability: true
      }).returning();

      await db.insert(equipmentCategories).values([
        { equipmentId: equipment3.id, categoryId: analysisCategory.id }
      ]);

      console.log('Created spectrophotometer equipment');
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
