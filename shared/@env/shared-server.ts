import { ISharedServerConfig } from '@env/types';
// @ts-ignore
const pkg = require('../../server/package.json');

console.log('server pkg', pkg);

const SharedServerConfig: ISharedServerConfig = {
  SERVER_VERSION: pkg.version,
  //Path from: ./server
  STATIC_FILES_PATH: '../client/dist',
};

export default SharedServerConfig;