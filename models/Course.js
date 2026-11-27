import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    duration: { type: String, required: true, trim: true },
    eligibility: { type: String, trim: true, default: 'Any Graduate / Beginners' },
    shortDescription: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, trim: true },
    image: { type: String, trim: true },
    technologies: [{ type: String }],
    subjects: [{ type: String }],
    benefits: [{ type: String }],
    careerOpportunities: [{ type: String }],
    fee: { type: String, default: '$999' },
    seats: { type: Number, default: 40 },
    enrolled: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    lessons: { type: Number, default: 30 },
    level: { type: String, default: 'Beginner to Advanced' },
    status: { type: String, enum: ['Active', 'Inactive', 'Draft'], default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
