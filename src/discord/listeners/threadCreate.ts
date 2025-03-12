import { ClientEvents } from 'discord.js';

export type ThreadCreateFuncType = (...args: ClientEvents['threadCreate']) => Promise<void>;

/**
 * 【スレッドが作成されたときにトリガーされるイベント】
 *  --- ユーザーがスレッドを作成した際に、そのスレッドに Bot を参加させる。
 *  --- 例えば、特定のチャンネルでスレッドが作成された場合に、Bot が自動的に参加し、メッセージを送信する準備を整えることが可能。
 */
export const handleThreadCreate: ThreadCreateFuncType = async (thread) => {
  thread.join();
};
