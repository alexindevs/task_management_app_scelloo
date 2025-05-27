require('dotenv/config')
const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL;

const baseConfig = {
  dialect: 'postgres',
  url: databaseUrl,
  define: {
    timestamps: true
  },
  logging: ['development', 'staging'].includes(env),
};

module.exports = {
  development: { ...baseConfig },
  test: { ...baseConfig },
  staging: { ...baseConfig },
  production: { ...baseConfig },
};
