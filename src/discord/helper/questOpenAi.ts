import { Message } from 'discord.js';
import { ChatCompletionMessageParam } from 'openai/resources';

import { getReplyHistory } from '@/discord/helper/getReplyHistory';
import { answerOpenAi } from '@/openAi/helper/answerOpenAi';

/**
 * 新規質問返答
 */
export const questOpenAi = async (message: Message) => {
  const question = message.content;
  const answer = await answerOpenAi(question);
  answer && (await message.reply(answer));
};

/**
 * リプライ質問返答
 */
export const questOpenAiOnReply = async (message: Message) => {
  const question = message.content;
  const isReply = !!message.reference?.messageId;

  if (!isReply) {
    console.warn('questOpenAiOnReplyはリプライではないメッセージでは実行できません');
    return;
  }

  const repleyHistory = await getReplyHistory(message);
  const answer = await answerOpenAi(question, repleyHistory);
  answer && (await message.reply(answer));
};

/**
 * スレッド内質問返答
 */
export const questOpenAiOnThread = async (message: Message) => {
  const isThread = message.channel.isThread();
  const question = message.content;

  if (!isThread) {
    console.warn('questOpenAiOnThreadはスレッドではないメッセージでは実行できません');
    return;
  }

  // スレ内返信を取得
  const threadMessages: Message[] = Array.from((await message.channel.messages.fetch()).values())
    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
    .slice(-5);

  // 履歴を作成
  const threadHistory: ChatCompletionMessageParam[] = threadMessages.map((msg) => ({
    role: msg.author.bot ? 'assistant' : 'user',
    content: msg.content,
  }));

  // OpenAI からの返答を取得（会話履歴を含む）
  const answer = await answerOpenAi(question, threadHistory);

  // スレッドメッセージに対して回答を送信
  answer && (await message.channel.send(answer));
};
