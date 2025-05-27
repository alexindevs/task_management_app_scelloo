import { createLogger, format, transports } from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }), // properly formats error stack traces
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(), // only colorize console
        timestamp(),
        logFormat
      )
    }),
  ],
});

// Optional: file logger for production
if (config.nodeEnv === 'production') {
  logger.add(
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  );
  logger.add(
    new transports.File({ filename: 'logs/combined.log' })
  );
}
