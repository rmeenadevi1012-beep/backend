import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import courseRoutes from './routes/courseRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'EduLearn MERN Backend is running' });
});


// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`🚀 EduLearn Backend running on http://localhost:${PORT}`);
});
