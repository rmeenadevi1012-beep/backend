import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'Certification' },
    enrollmentDate: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
