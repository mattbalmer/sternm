import { ClientConfig, Environment } from '@env/types';
import SharedClientConfig from './shared-client';

export const LocalClientConfig: ClientConfig = {
  ...SharedClientConfig,
  ENV: Environment.LOCAL,
  GA: '',
  SENTRY: '',
};

export default LocalClientConfig;