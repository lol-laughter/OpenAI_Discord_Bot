type DiscordCommand = {
  name: string;
  description: string;
  options: DiscordCommandOption[];
};

type DiscordCommandOption = {
  type: number;
  name: string;
  description: string;
  required: boolean;
};

/**
 * Discord Bot Command
 */
export const discordCommands: DiscordCommand[] = [
  {
    name: "amr",
    description: "なんでも知ってる安室透「僕になんでも聞いてください♪」",
    options: [
      {
        type: 3,
        name: "安室への質問",
        description:
          "黒の組織のスパイで公安警察の降谷零「僕に聞きたい事を書くんだ風見ッ！」",
        required: true,
      },
    ],
  },
];

/**
 * Command Object
 */
export const discordCommandsObject = discordCommands.reduce((acc, command) => {
  acc[command.name] = command;
  return acc;
}, {} as Record<string, DiscordCommand>);
