import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../../utils/api-error';
import { config } from '../../config';

const JWT_SECRET = config.jwtSecret;

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('Missing or invalid Authorization header', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedRequest['user'];
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError('Invalid or expired token', 401);
  }
}