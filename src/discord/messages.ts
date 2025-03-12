export type VoiceStateUpdateMessage = {
  [key: string]: ((name: string) => string)[];
};

export const voiceStateUpdateMessage: VoiceStateUpdateMessage = {
  userEntryRoom: [
    (name: string) =>
      `> **${name}**さん こんなところで何をやっているんですか？`,
    (name: string) => `> あ、**${name}**さん いらっしゃいませ♪`,
    (name: string) => `> **${name}**ィィィィィィィィッ！！`,
    (name: string) => `> 【**${name}**】 これが僕のコードネームです`,
  ],
  userLeaveRoom: [
    (name: string) => `> よし**${name}**、よくやった。もう帰っていいぞ`,
  ],
};
