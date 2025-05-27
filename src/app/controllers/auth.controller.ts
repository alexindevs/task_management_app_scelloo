import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { sendSuccess } from '../../utils/response';

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.registerUser(req.body);
      return sendSuccess(res, 201, 'User registered successfully', user);
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.loginUser(req.body.email, req.body.password);
      return sendSuccess(res, 200, 'Login successful', result);
    } catch (err) {
      next(err);
    }
  };
}