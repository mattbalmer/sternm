import { connectMongoose } from 'lib/mongoose';
import Config from 'config';
import server from './index';

connectMongoose();

server.listen(Config.PORT, () => {
  console.log(`sternm server listening on port ${Config.PORT}`);
});
