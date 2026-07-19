"use client";

import mermaid from "mermaid";
import { useEffect, useId, useRef, useState } from "react";
import { isDarkMode } from "@/src/utils/color-theme";

export const MermaidPreview = ({ code }: { code: string }) => {
  const id = useId();
  const renderSeqRef = useRef(0);
  const [svg, setSvg] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    if (!code) {
      return;
    }

    const render = async () => {
      try {
        const header = isDarkMode()
          ? "%%{init: {'theme': 'dark'}}%%\n"
          : "%%{init: {'theme': 'default'}}%%\n";
        const source = header + code;

        // Validate first to avoid Mermaid injecting an error diagram into the document.
        await mermaid.parse(source, { suppressErrors: false });

        const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "_");
        const renderId = `${safeId}-${renderSeqRef.current++}`;
        const { svg: renderedSvg } = await mermaid.render(renderId, source);

        if (!isActive) {
          return;
        }

        setSvg(renderedSvg);
        setErrorMessage(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setSvg("");
        setErrorMessage(
          error instanceof Error
            ? `Error rendering Mermaid diagram: ${error.message}`
            : "Invalid syntax",
        );
      }
    };

    void render();
    return () => {
      isActive = false;
    };
  }, [code, id]);

  if (!code) {
    return null;
  }

  if (errorMessage) {
    return (
      <div className="size-full flex justify-center items-center text-red-500 whitespace-pre-wrap">
        {errorMessage}
      </div>
    );
  }

  return (
    <div
      className="size-full flex justify-center items-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
