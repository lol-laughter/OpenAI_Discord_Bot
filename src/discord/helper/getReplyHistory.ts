import { Message } from 'discord.js';
import { ChatCompletionMessageParam } from 'openai/resources';

/**
 * 指定した回数だけリプライを遡って履歴を取得するヘルパー関数
 * @param message - 取得を開始するメッセージ
 * @param depth - 遡る回数（デフォルトは3）
 * @returns 会話履歴の文字列
 */
export const getReplyHistory = async (
  message: Message,
  depth: number = 3
): Promise<ChatCompletionMessageParam[]> => {
  const history: ChatCompletionMessageParam[] = [];
  let currentMessage: Message = message;
  let count = 0;

  // 再帰的にリプライを遡って履歴を取得
  while (currentMessage?.reference?.messageId && count < depth) {
    try {
      const repliedMessage = await currentMessage.channel.messages.fetch(
        currentMessage.reference.messageId
      );

      // もしリプライ元のメッセージが Bot のものなら、それを AI と仮定して回答を記録
      const isUser = repliedMessage.channel.messages.cache
        .filter((msg) => msg.reference?.messageId === repliedMessage.id && msg.author.bot)
        .first();

      const role = isUser ? 'user' : 'assistant';

      // メッセージを記録
      history.unshift({
        role,
        content: repliedMessage.content,
      });

      currentMessage = repliedMessage;
      count++;
    } catch (error) {
      console.error('リプライ元のメッセージ取得失敗:', error);
      break;
    }
  }

  return history;
};
