import { ClientEvents } from 'discord.js';

import { discordCommandsObject } from '@/discord/command';
import { answerOpenAi } from '@/openAi/helper/answerOpenAi';

export type InteractionCreateFuncType = (...args: ClientEvents['interactionCreate']) => void;

/**
 * 【コマンドやインタラクションの受信時にトリガーされるイベント】
 *  --- ユーザーがボットに対してコマンドやインタラクションを実行した際に、そのインタラクションに基づいて動作を行う。
 *  --- 例えば、/amr コマンドなどが送信された場合に、この関数が呼ばれる。
 *  --- interactionCreate イベントは、ユーザーがメッセージやボタン、スラッシュコマンドなどを通じてボットとやり取りする際に利用される。
 */
export const handleInteractionCreate: InteractionCreateFuncType = async (interaction) => {
  // インタラクションがコマンドでなければ、何もしない
  const isCommand = interaction.isCommand();
  if (!isCommand) return;

  // コマンドを取得
  const command = interaction.commandName;

  // 定義しているコマンド
  const gptCommand = discordCommandsObject.amr;

  // ChatGPTコマンドが呼び出された場合、OpenAIに質問を送信する
  if (command === gptCommand?.name) {
    // コマンドオプションから質問を取得
    const question = (interaction.options as any).getString('安室への質問');
    await interaction.deferReply();

    // OpenAIに質問を送信し、回答を取得する
    const answer = await answerOpenAi(question);
    await interaction.editReply(`${question}\n\n安室「${answer}」`);
  }
};
