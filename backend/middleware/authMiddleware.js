import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// --- This is our "Bouncer" ---
// It will protect routes that only logged-in users can access
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Read the 'jwt' cookie from the request
  token = req.cookies.jwt;

  if (token) {
    try {
      // 2. Verify the token (check if the ticket is real)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user from the token's ID
      req.user = await User.findById(decoded.userId).select('-password');

      // --- THIS IS THE NEW, SMARTER CHECK ---
      // 4. Check if we actually found a user
      if (req.user) {
        // 5. If we did, let them in
        next();
      } else {
        // 6. If we did NOT (user is null), throw an error
        //    This stops the request right here.
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
    } catch (error) {
      // 7. If the token is fake or expired, throw an error
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // 8. If there is no token at all, throw an error
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// We can add an "admin" check later if we want
// const admin = (req, res, next) => { ... }

export { protect };