// --- Imports ---
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';
import tagRoutes from './routes/tagRoutes.js'; // <-- ADD THIS LINE
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// --- Configuration ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// --- Database Connection ---
connectDB();

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/tags', tagRoutes); // <-- ADD THIS LINE

// --- Error Handlers (MUST BE LAST) ---
app.use(notFound);
app.use(errorHandler);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});