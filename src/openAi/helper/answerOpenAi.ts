import { ChatCompletionMessageParam } from 'openai/resources';

import { openai } from '@/openAi';
import { amuroPrompt } from './characterPrompt';

export type OpenAiMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
};

/**
 * OpenAIに質問を送信し、回答を取得する
 * @param question - 質問
 * @param history - 会話履歴
 * @returns 回答
 */
export const answerOpenAi = async (
  question: string,
  history: Array<ChatCompletionMessageParam> = []
) => {
  try {
    // 履歴があれば含めて送信
    const submitMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: `${question}`,
    };

    // 安室さん
    const characterPromptMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: `${amuroPrompt}`,
    };

    const messages = [characterPromptMessage, ...history, submitMessage];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return ' ---深刻なエラーが発生しました--- ---深刻なエ--- ';
  }
};
