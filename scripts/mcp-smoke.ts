import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const testApiUrl =
    process.env.NEXTJS_API_URL || "http://localhost:3000/api/test";

  const transport = new StdioClientTransport({
    command: "pnpm",
    args: ["exec", "tsx", "scripts/mcp-server.ts"],
    env: {
      ...process.env,
      NEXTJS_API_URL: testApiUrl,
    } as Record<string, string>,
  });

  const client = new Client(
    { name: "smoke-test", version: "0.0.1" },
    { capabilities: {} },
  );

  await client.connect(transport);

  const result = await client.callTool({
    name: "upload_mermaid_to_db",
    arguments: {
      title: "test",
      body: "graph TD\nA-->B",
    },
  });

  console.log(JSON.stringify(result, null, 2));
  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
