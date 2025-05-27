import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserRepository } from '../repositories';
import { ApiError } from '../../utils/api-error';

export class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async registerUser(data: { email: string; password: string; role?: 'user' | 'admin' }) {
    const exists = await this.userRepo.isEmailTaken(data.email);
    if (exists) {
      throw new ApiError('Email is already registered', 409);
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.createUser({
      email: data.email,
      password: hashed,
      role: data.role || 'user',
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return { token };
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ApiError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return { token };
  }

  verifyToken<T = any>(token: string): T {
    return jwt.verify(token, config.jwtSecret) as T;
  }
}
