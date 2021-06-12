import * as dotenv from 'dotenv';
import { getBackendEnv } from '../src/config/database.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

export default {
  ...getBackendEnv(),
};
