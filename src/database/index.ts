import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import { config } from '../config';

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: config.nodeEnv === 'development' ? console.log : false,
  pool: {
    // max: config.DATABASE_MAX_POOL,
    // min: config.DATABASE_MIN_POOL,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    const dbName = sequelize.getDatabaseName();
    logger.info(
      `✅ [${new Date().toISOString()}] Connected to database: ${dbName} (config: ${config.nodeEnv})`
    );
  } catch (err) {
    logger.error(
      `❌ [${new Date().toISOString()}] Failed to connect to the database:`,
      err
    );
    process.exit(1); // recommended in production to halt the app
  }
}

async function init() {
    await connectToDatabase();
  }
  
init();

export { sequelize };
export default sequelize;
