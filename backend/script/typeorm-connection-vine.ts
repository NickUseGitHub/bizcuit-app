import * as dotenv from 'dotenv';
import * as path from 'path';
import { getBackendEnv } from '../src/config/database-vine.config';

const envPostFix = `.${process.env.NODE_ENV || 'example'}`;
const envFile = `../.env${envPostFix}`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config({ path: path.resolve(__dirname, envFile) });

export default getBackendEnv();
