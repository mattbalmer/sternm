import { Environment, ServerConfig } from '@env/types';
import SharedServerConfig from './shared-server';

// @ts-ignore
const PORT: number = process.env.PORT || 3000;
const HOST = `http://staging.sternm.app`;

const StagingServerConfig: ServerConfig = {
  ...SharedServerConfig,
  ENV: Environment.STAGING,
  HOST,
  PORT,
  SENTRY: '',
  MONGO_DB: `sternm-staging`,
  MONGO_USER: 'sternmuser',
  MONGO_PW: 'sternmpwd',
  SESSION_SECRET: 'replace-this-with-a-uuid',
  GOOGLE_AUTH_CLIENT_ID: null, //todo
  GOOGLE_AUTH_CLIENT_SECRET: null, //todo
  GOOGLE_AUTH_CALLBACK_PATH: `${HOST}/auth/google/callback`,
};

export default StagingServerConfig;