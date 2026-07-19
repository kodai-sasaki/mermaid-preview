import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 必要に応じて追加 (例: カバレッジレポートや自動生成ファイルなど)
    "coverage/**",
  ]),

  // === 💡 提案: TypeScript + Next.js 用のカスタムルール ===
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 1. 未使用変数の検出（引数の `_` で始まるものは意図的として許容）
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // 2. any 型の使用に警告（型安全性の担保）
      "@typescript-eslint/no-explicit-any": "warn",

      // 3. 配列のループ処理等での key 属性を厳格にチェック
      // (省略形の Fragment `<></>` が使われた場合も漏れなく検知)
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],

      // 4. セキュリティ対策: target="_blank" を使う際の rel="noreferrer" を強制
      "react/jsx-no-target-blank": "error",

      // 5. コードの整合性: インターフェースや一貫した型定義の推奨
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      // 6. Next.js特有: 画像コンポーネント(next/image)の利用を推奨（警告レベル）
      // 外部SVGなどでどうしても通常の <img> を使いたい場面があるため "warn" が実用的
      "@next/next/no-img-element": "warn",
    },
  },

  // 最後に Prettier 競合ルールを適用して完全に黙らせる
  eslintConfigPrettier,
]);

export default eslintConfig;
