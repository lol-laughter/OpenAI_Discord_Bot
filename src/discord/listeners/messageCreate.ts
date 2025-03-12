import { ClientEvents, TextChannel, ThreadChannel } from 'discord.js';

import { questOpenAi, questOpenAiOnReply, questOpenAiOnThread } from '@/discord/helper/questOpenAi';

export type MessageCreateFuncType = (...args: ClientEvents['messageCreate']) => Promise<void>;

/**
 * 【メッセージが送信されたときにトリガーされるイベント】
 *  --- ユーザーがメッセージを送信したときに、そのメッセージに基づいて処理を行う。
 *  --- 例えば、特定のチャンネルでメッセージを受け取った際に、そのメッセージ内容に対して OpenAI などを使って返信する処理を行うことが可能。
 */
export const handleMessageCreate: MessageCreateFuncType = async (message) => {
  const isAuthorBot = message.author.bot;
  const isSystemMessage = message.system;
  const isReply = !!message.reference?.messageId;
  const isThread = message.channel.isThread();

  // テキストチャンネルを取得
  const textChannel = isThread
    ? (message.channel as ThreadChannel).parent
    : (message.channel as TextChannel);

  const isOpenAiTextChannel = textChannel?.id === process.env.OPEN_AI_TEXT_CHANNEL_ID;

  // ボットと(今は質問しか機能がないので)chatGPTチャンネル以外のメッセージは無視
  if (isAuthorBot || isSystemMessage || !isOpenAiTextChannel) return;

  // メッセージがリプライであれば、リプライ用の処理を行う
  if (isReply) {
    await questOpenAiOnReply(message);
    return;
  }

  // メッセージがスレッド内であれば、スレッド用の処理を行う
  if (isThread) {
    await questOpenAiOnThread(message);
    return;
  }

  await questOpenAi(message);
};
