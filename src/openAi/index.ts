import { OpenAI } from 'openai';

// OpenAIのAPIキーを設定する
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});
