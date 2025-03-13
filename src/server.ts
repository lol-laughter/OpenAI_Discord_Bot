import express from 'express';
import dotenv from 'dotenv';
import 'module-alias/register';

const isDev = true;
const envFile = isDev ? '.env.dev' : '.env';

// dotenvで環境変数を読み込む
dotenv.config({ path: envFile });

// eslint-disable-next-line import/first
import '@/discord';

const app = express();
const PORT = process.env.PORT || 3000;

// renderデプロイ用のダミーサーバー
app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] Ping received from GitHub Actions`);
  res.send('bot is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
