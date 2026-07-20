import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 環境変数からNext.jsのAPI URLを取得
const NEXTJS_API_URL =
  process.env.NEXTJS_API_URL || "http://localhost:3000/api/document";
// 1. McpServer クラスで初期化
const server = new McpServer({
  name: "mermaid-uploader",
  version: "1.0.0",
});

// 2. 引数をプレーンなオブジェクトの形で定義
server.registerTool(
  "upload_mermaid_to_db",
  {
    description: "MermaidのソースコードをNext.jsのAPI経由でDBに保存するツール",
    inputSchema: {
      title: z
        .string()
        .describe("ダイアグラムのタイトルや説明（例: 'ユーザー認証フロー'）"),
      body: z
        .string()
        .describe(
          "LLMが生成したMarkdown等を含まない純粋なMermaidのソースコード文字列",
        ),
    },
  },
  async ({ title, body }) => {
    try {
      const response = await fetch(NEXTJS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Next.js APIエラー (Status: ${response.status}): ${errorText}`,
            },
          ],
        };
      }

      const responseData = await response.json();
      return {
        content: [
          {
            type: "text",
            text: `成功: Next.js APIの呼び出しに成功しました。\nレスポンス: ${JSON.stringify(responseData)}`,
          },
        ],
      };
    } catch (error) {
      if (!(error instanceof Error)) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Next.js APIとの通信中に不明なエラーが発生しました。",
            },
          ],
        };
      }

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Next.js APIとの通信に失敗しました: ${error.message}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Next.js DB Uploader MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
