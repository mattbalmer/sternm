import { ClientConfig, Environment } from '@env/types';
import SharedClientConfig from './shared-client';

const ProductionClientConfig: ClientConfig = {
  ...SharedClientConfig,
  ENV: Environment.PRODUCTION,
  GA: '',
  SENTRY: '',
};

export default ProductionClientConfig;