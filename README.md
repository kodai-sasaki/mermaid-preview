# MERMAID PREVIEW

## MCP 接続方法

このプロジェクトの MCP サーバは stdio 方式です。
クライアントがコマンドを実行して、scripts/mcp-server.ts を子プロセスとして起動します。

### 事前確認

1. 依存関係をインストールして Next.js API を起動する

```sh
$ pnpm i
$ pnpm dev
```

2. データベースの初期設定をする
```sh
$ docker compose up db -d
$ pnpm db:generate
$ pnpm db:migrate
# テストデータを注入する場合
$ pnpm db:seed
```

3. 疎通テストを実行する

```sh
$ pnpm mcp:smoke
```

`mcp:smoke` は `http://localhost:3000/api/test` を使用し、DBへの保存は行いません。

### Claude Code から接続

Claude Code には MCP サーバをコマンド起動で登録します。cwd オプションにはこのリポジトリへのパスを指定してください。

1. 登録

```sh
$ claude mcp add mermaid-uploader --cwd [path_to_this_repository] --env NEXTJS_API_URL=http://localhost:3000/api/document -- pnpm exec tsx scripts/mcp-server.ts
```

2. 確認

```sh
$ claude mcp list
```

### VS Code Copilot から接続

VS Code では `mcp.json` に登録する

```json
{
  "servers": {
    "mermaid-uploader": {
      "command": "pnpm",
      "args": ["exec", "tsx", "scripts/mcp-server.ts"],
      "cwd": "${workspaceFolder}",
      "env": {
        "NEXTJS_API_URL": "http://localhost:3000/api/document"
      }
    }
  }
}
```

もしローカルで `mise` のPATHが通っているのにMCPサーバの立ち上げで見つからないと言われたら `code` コマンド経由で VSCode を開くことで解決します。
