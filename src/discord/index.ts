import { Client, GatewayIntentBits } from 'discord.js';

import { discordCommands } from '@/discord/command';
import { handleInteractionCreate } from '@/discord/listeners/interactionCreate';
import { handleMessageCreate } from '@/discord/listeners/messageCreate';
import { handleThreadCreate } from '@/discord/listeners/threadCreate';
import { handleVoiceStateUpdate } from '@/discord/listeners/voiceStateUpdate';

const intents: GatewayIntentBits[] = [
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];

// Discordクライアントを初期化する
const client = new Client({ intents });

// bot起動時のみ呼び出される関数を定義する
client.once('ready', () => {
  console.log('Ready');
});

// Discordクライアントが起動すると、一度だけ呼び出される関数を定義する
client.on('ready', async () => {
  if (!client.application) return;
  await client.application.commands.set(discordCommands);
});

// `discordEvents` の各イベントを `client.on` に登録
client.on('interactionCreate', handleInteractionCreate);
client.on('voiceStateUpdate', handleVoiceStateUpdate);
client.on('messageCreate', handleMessageCreate);
client.on('threadCreate', handleThreadCreate);

// Discord ボットのログイン
client.login(process.env.DISCORD_TOKEN);
