import { verifyToken } from '../utils/jwt.js';
import Admin from '../models/Admin.js';
import { createError } from '../utils/error.js';

export async function authMiddleware(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer '))
      throw createError(401, 'Authorization header missing');

    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);

    const user = await Admin.findById(decoded.id); // switch to Guest/Staff model if needed
    if (!user) throw createError(401, 'User not found');

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      hotel: user.hotel || null, // handy for multi‑tenant filters
    };
    next();
  } catch (err) {
    next(err);
  }
}
