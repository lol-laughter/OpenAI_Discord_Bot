# OpenAI機能付きDiscordBot

## 概要

このプロジェクトは、OpenAIと連携したDiscordボットです。指定されたテキストチャンネルでOpenAIに質問し、応答を受け取ることができます。また、特定のボイスチャンネルへの入退出を監視し、指定のテキストチャンネルに通知を送信します。

## 機能

- 指定されたDiscordテキストチャンネルでOpenAIに質問し、応答を受け取ることができます。
- 指定されたボイスチャンネルでユーザーの入退出を監視し、指定のテキストチャンネルに通知を送信します。

## 必要な環境変数

プロジェクトルートに `.env` ファイルを作成し、以下の変数を設定してください。

```ini
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

- `discord.js`：Discord APIと連携するためのライブラリ
- `dotenv`：環境変数を `.env` から読み込むためのライブラリ
- `openai`：OpenAI APIとの通信を行うライブラリ
- `module-alias`：モジュールインポートを簡潔にするライブラリ
- `typescript`：TypeScriptサポート

## ライセンス

このプロジェクトは ISC ライセンスの下で提供されます。

---

## English

### Overview

This project is a Discord bot with OpenAI integration, allowing users to ask questions to OpenAI within a designated Discord text channel. It also provides monitoring for user activity in specified voice channels and sends notifications to a designated text channel.

### Required Environment Variables

```ini
# Discord Configuration
DISCORD_TOKEN="your-discord-bot-token"
OBSERVE_USER_VOICE_CHANNEL_ID="voice-channel-id"
OBSERVE_USER_TEXT_CHANNEL_ID="text-channel-id"
OPEN_AI_TEXT_CHANNEL_ID="openai-text-channel-id"

# OpenAI Configuration
OPENAI_API="your-openai-api-key"
```
