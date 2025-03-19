# OpenAI機能付きDiscordBot

## 概要

OpenAIと連携したDiscordボットです。

## 機能

- 指定のDiscordテキストチャンネルで質問テキストをなげることで、OpenAIから回答を受け取ることが可能
- OpenAIからの回答にリプライをする or スレッドを立てて質問することで過去の質問と回答を保持した回答を得ることができる
- 指定ボイスチャンネルでのユーザーの入退出を監視し、テキストチャンネルに通知を送信する

## 開発 & デプロイ環境

### 開発環境

- **プログラミング言語:** TypeScript
- **主要ライブラリ:**
  - `discord.js` を使用してDiscord APIと連携
  - `openai` を利用してOpenAI APIと通信
  - `express` を利用してダミーサーバーを実装
  - `dotenv` を用いて環境変数を管理
  - `module-alias` でモジュールのインポートを簡潔化

### デプロイ環境

- **ホスティング:** Renderの無料プランを使用
- **サーバー構成:**
  - Expressを用いたダミーサーバーをセットアップし、Render上でデプロイ
  - Discordボットとして動作し、OpenAI APIと通信

### Renderの無料プランとスリープ対策

Renderの無料プランでは、**15分間リクエストがないとサーバーがスリープ状態** になり、リクエストを受け付けなくなります。
この問題を回避するために、**UptimeRobot** を使用して、**10分おきにRenderのサーバーにリクエストを送り、スリープしないように維持** しています。

## 必要な環境変数

プロジェクトルートに `.env` ファイルを作成し、以下の変数を設定してください。

```ini
# Server
PORT="3000"  # ダミーサーバーのPORT

# Discord 設定
DISCORD_TOKEN="your-discord-bot-token"  # Discordボットのトークン
OBSERVE_USER_VOICE_CHANNEL_ID="voice-channel-id"  # 監視するボイスチャンネルのID
OBSERVE_USER_TEXT_CHANNEL_ID="text-channel-id"  # 入退出ログを送信するテキストチャンネルのID
OPEN_AI_TEXT_CHANNEL_ID="openai-text-channel-id"  # OpenAIの応答を送信するテキストチャンネルのID

# OpenAI 設定
OPENAI_API="your-openai-api-key"  # OpenAIのAPIキー
```

## 設定手順

### 1. 必要なAPIキーとチャンネルIDの取得

#### Discordボットトークンの取得

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス。
2. **新しいアプリケーション** を作成。
3. **Bot** タブを開き、**Botの追加** をクリック。
4. トークンをコピーし、`.env` の `DISCORD_TOKEN` に設定。

#### DiscordチャンネルIDの取得

1. Discordの設定で **開発者モード** を有効にする。
2. 目的のチャンネルを右クリックし、**IDをコピー** を選択。
3. コピーしたIDを `.env` の適切な変数に設定。

#### OpenAI APIキーの取得

1. [OpenAI API](https://platform.openai.com/) にアクセス。
2. サインインしてAPIキーを生成。
3. コピーしたキーを `.env` の `OPENAI_API` に設定。

## インストールと起動

```sh
# 依存関係をインストール
npm install

# TypeScriptのビルド
npm run build

# ボットを起動
npm start
```

## 依存関係

```json
"dependencies": {
  "discord.js": "^14.14.1",
  "dotenv": "^16.4.1",
  "express": "^4.21.2",
  "module-alias": "^2.2.3",
  "openai": "^4.26.1"
},
"devDependencies": {
  "@types/express": "^5.0.0",
  "typescript": "^5.8.2"
}
```

- `discord.js`：Discord APIと連携するためのライブラリ
- `dotenv`：環境変数を `.env` から読み込むためのライブラリ
- `express`：ダミーサーバーを構築するためのライブラリ
- `openai`：OpenAI APIとの通信を行うライブラリ
- `module-alias`：モジュールインポートを簡潔にするライブラリ
- `typescript`：TypeScriptサポート

## ライセンス

このプロジェクトは ISC ライセンスの下で提供されます。