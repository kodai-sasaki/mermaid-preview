"use client";

import mermaid from "mermaid";
import React from "react";

export const MermaidPreview = ({ code }: { code: string }) => {
  const outputRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  const render = React.useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;
      } catch (error) {
        outputRef.current.innerHTML = "Invalid syntax";
        console.error("Error rendering mermaid diagram:", error);
      }
    }
  }, [code, id]);

  React.useEffect(() => {
    render();
  }, [render]);

  return code ? (
    <div style={{ backgroundColor: "#fff" }}>
      <div ref={outputRef} className="[&>svg]:h-56" />
    </div>
  ) : null;
};
