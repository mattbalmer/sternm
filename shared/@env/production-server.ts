import { Environment, ServerConfig } from '@env/types';
import SharedServerConfig from './shared-server';

// @ts-ignore
const PORT: number = process.env.PORT || 3000;
const HOST = `http://sternm.app`;

const ProductionServerConfig: ServerConfig = {
  ...SharedServerConfig,
  ENV: Environment.PRODUCTION,
  HOST,
  PORT,
  SENTRY: '',
  MONGO_DB: `sternm-production`,
  MONGO_USER: 'sternm-prod-user',
  MONGO_PW: 'replace-this-with-a-uuid',
  SESSION_SECRET: 'replace-this-with-a-uuid',
  GOOGLE_AUTH_CLIENT_ID: null, //todo
  GOOGLE_AUTH_CLIENT_SECRET: null, //todo
  GOOGLE_AUTH_CALLBACK_PATH: `${HOST}/auth/google/callback`,
};

export default ProductionServerConfig;