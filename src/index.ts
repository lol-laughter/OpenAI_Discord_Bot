import 'module-alias/register';

import dotenv from 'dotenv';

const isDev = true;
const envFile = isDev ? '.env.dev' : '.env';

// dotenvで環境変数を読み込む
dotenv.config({ path: envFile });

// eslint-disable-next-line import/first
import '@/discord';
