import { ClientEvents, TextChannel, VoiceChannel } from 'discord.js';

import { voiceStateUpdateMessage } from '@/discord/messages';

export type VoiceStateUpdateFuncType = (...args: ClientEvents['voiceStateUpdate']) => void;

/**
 * 【ボイスチャット内での状態変更が発生したときにトリガーされるイベント】
 *  --- ユーザーがボイスチャンネルに参加したり、退出したり、ミュート/ミュート解除などの状態変更があったときに動作する。
 *  --- 例えば、ユーザーがボイスチャンネルに参加したときや退出したときにメッセージを送信する処理などが行われる。
 */
export const handleVoiceStateUpdate: VoiceStateUpdateFuncType = (oldState, newState) => {
  const observeVoiceChannnelId = process.env.OBSERVE_USER_VOICE_CHANNEL_ID;
  const observeTextChannnelId = process.env.OBSERVE_USER_TEXT_CHANNEL_ID;

  // 入退室を監視したいボイスチャンネルかどうかをチェック
  if (
    oldState.channelId !== observeVoiceChannnelId &&
    newState.channelId !== observeVoiceChannnelId
  ) {
    return;
  }

  if (!observeVoiceChannnelId || !observeTextChannnelId || !oldState.member) {
    console.warn('チャンネルIDの指定がされていません');
    return;
  }

  // voiceチャンネル
  const voiceChannel = oldState.member.guild.channels.cache.get(observeVoiceChannnelId);
  if (!voiceChannel || !(voiceChannel instanceof VoiceChannel)) {
    console.warn('指定されたボイスチャンネルが見つかりません');
    return;
  }

  // textチャンネル
  const channel = oldState.guild.channels.cache.get(observeTextChannnelId);
  if (!channel || !(channel instanceof TextChannel)) {
    console.warn('指定されたテキストチャンネルが見つかりません');
    return;
  }

  const memberName = oldState.member.displayName;
  const messaeges = voiceStateUpdateMessage;

  if (oldState.channelId === null && newState.channelId !== null) {
    // ボイスチャットに入ったとき
    const message = getRandomMessage(messaeges.userEntryRoom, memberName);
    return channel.send(message);

    // ボイスチャットから出たとき
  } else if (oldState.channelId !== null && newState.channelId === null) {
    const message = getRandomMessage(messaeges.userLeaveRoom, memberName);
    return channel.send(message);
  }
};

const getRandomMessage = (messages: ((name: string) => string)[], name: string) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex](name);
};
