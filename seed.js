import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Course from './models/Course.js';
import { initial15Courses } from '../frontend/src/data/coursesData.js';

dotenv.config();

const seedCourses = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri || uri.includes('<username>')) {
    console.error('❌ Please configure MONGO_URI in backend/.env before running seed.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB for seeding...');

    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ️  Database already has ${existingCount} courses. Skipping seed.`);
    } else {
      const formatted = initial15Courses.map(({ id, ...rest }) => rest);
      await Course.insertMany(formatted);
      console.log(`🎉 Seeded ${formatted.length} courses into MongoDB!`);
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedCourses();
