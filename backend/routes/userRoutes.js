import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, logoutUser, getUserProfile} from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

export default router;