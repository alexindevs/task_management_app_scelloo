import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger';
import { config } from './config';
import routes from './app/routes';
import { errorHandlerMiddleware } from './app/middleware';
import swaggerSpec from './utils/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  logger.info(`🚀 Server running on http://localhost:${config.port}`);
});
