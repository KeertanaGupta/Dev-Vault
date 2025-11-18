import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getTags, createTag } from '../controllers/tagController.js';

// /api/tags
router.route('/').get(protect, getTags).post(protect, createTag);

export default router;