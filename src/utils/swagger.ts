import fs from 'fs';
import path from 'path';
import yaml from 'yamljs';

const swaggerPath = path.join(__dirname, '../docs/swagger.yaml');
const file = fs.readFileSync(swaggerPath, 'utf8');
const swaggerSpec = yaml.parse(file);

export default swaggerSpec;
