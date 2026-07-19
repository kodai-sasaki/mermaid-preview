"use client";

import { useState, type KeyboardEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const TextArea = ({
  title,
  code,
  originalCode,
  setCode,
  handleSave,
}: {
  title: string;
  code: string;
  originalCode: string;
  setCode: (code: string) => void;
  handleSave: () => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // 行数の計算
  const lines = code.split("\n");

  // HTMLの仕様上、末尾の改行をdivで正しく高さに反映させるためのハック
  const renderCode = code + (code.endsWith("\n") ? " " : "");

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.metaKey && e.key === "s") {
      e.preventDefault();
      if (code !== originalCode) {
        handleSave();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      {/* 1. ヘッダー / ツールバー（拡張用） */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400 select-none">
        <span>{title}</span>
        <span className={isFocused ? "text-blue-400" : ""}>
          {isFocused ? "● EDITING" : "STANDBY"}
        </span>
      </div>

      {/* 2. エディタ本体（ここがスクロールの主役） */}
      <div
        className={`grid grid-cols-[auto_1fr] max-h-[400px] overflow-auto font-mono text-sm leading-6 transition-all ${
          isFocused ? "ring-2 ring-blue-500/50" : ""
        }`}
      >
        {/* 2-a. 行番号カラム */}
        <div className="bg-slate-800/50 text-slate-500 text-right py-4 pr-3 pl-4 select-none border-r border-slate-800 min-w-[3.5rem]">
          {lines.map((_, index) => (
            <div key={index} className="h-6">
              {index + 1}
            </div>
          ))}
        </div>

        {/* 2-b. テキスト重ね合わせエリア */}
        <div className="grid grid-cols-1 grid-rows-1 relative p-4 bg-slate-900">
          {/* 【表示・ハイライト用レイヤー】 */}
          <div
            className="col-start-1 row-start-1 whitespace-pre text-slate-200 pointer-events-none min-h-full"
            style={{ gridArea: "1 / 1 / 2 / 2" }}
          >
            <SyntaxHighlighter
              language="mermaid"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                minHeight: "100%",
                overflow: "visible",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "inherit",
                },
              }}
            >
              {renderCode}
            </SyntaxHighlighter>
          </div>

          {/* 【入力用レイヤー】 */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="col-start-1 row-start-1 w-full h-full bg-transparent text-transparent caret-blue-400 resize-none focus:outline-none whitespace-pre overflow-hidden"
            style={{ gridArea: "1 / 1 / 2 / 2" }}
            spellCheck="false"
            wrap="off"
          />
        </div>
      </div>

      {/* 3. ステータスバー（エラー表示用など） */}
      <div className="px-4 py-1.5 bg-slate-800 text-[11px] text-slate-500 border-t border-slate-700 flex justify-between">
        <div>Lines: {lines.length}</div>
        {/* ここにMermaidのパースエラーなどを出すと強力 */}
      </div>
    </div>
  );
};
