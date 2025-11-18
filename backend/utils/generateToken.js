//backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // We create a JWT token using the user's ID and our secret key from the .env file
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will expire in 30 days
  });

  res.cookie('jwt', token, {
    httpOnly: true, // This makes the cookie inaccessible to JavaScript on the client side
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict', // This helps prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // The cookie will last for 30 days
  });
};

export default generateToken;