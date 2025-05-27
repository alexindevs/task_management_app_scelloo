import { z } from 'zod';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const configSchema = z.object({
  port: z.coerce.number().default(3001),
  nodeEnv: z.enum(['development', 'test', 'staging', 'production']),
  jwtSecret: z.string().min(1, 'JWT secret is required'),
  databaseUrl: z.string().min(1, 'Database URL is required'),
});

const parsed = configSchema.safeParse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});

if (!parsed.success) {
  parsed.error.issues.forEach((issue) =>
    logger.error(`Config Error: ${issue.path.join('.')} - ${issue.message}`)
  );
  throw new Error('Invalid environment configuration');
}

export const config = parsed.data;
