import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Enrolled', 'Closed'],
      default: 'New',
    },
    source: { type: String, default: 'Courses Page' },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
