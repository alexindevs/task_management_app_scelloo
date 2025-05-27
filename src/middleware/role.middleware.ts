import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { ApiError } from '../utils/api-error';

export function requireRole(role: 'admin' | 'user') {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      throw new ApiError('Forbidden: insufficient permissions', 403);
    }
    next();
  };
}
