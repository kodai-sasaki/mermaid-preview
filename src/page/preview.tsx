"use client";

import { MermaidPreview } from "@/src/components/MermaidPreview";
import { Document } from "@/src/prisma/generated/browser";
import { useEffect, useState } from "react";
import { Noto_Sans_Mono } from "next/font/google";
import { clsx } from "clsx";

const NOTO_SANS_MONO = Noto_Sans_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const Preview = ({ id }: { id: number }) => {
  const [mermaid, setMermaid] = useState<Document | null>(null);

  useEffect(() => {
    const fetchMermaid = async () => {
      const document = await fetch(`/api/document?id=${id}`).then((res) =>
        res.json(),
      );
      console.log(document);
      return document;
    };
    fetchMermaid().then(setMermaid);
  }, [id]);

  return (
    <div>
      <h1>{mermaid?.title ?? ""}</h1>
      <MermaidPreview code={mermaid?.body ?? ""}></MermaidPreview>
      <textarea
        id="mermaid-body"
        className={clsx(NOTO_SANS_MONO.className)}
        value={mermaid?.body ?? ""}
        onChange={() => {
          setMermaid((prev) => {
            if (prev) {
              return {
                ...prev,
                body: (
                  document.getElementById("mermaid-body") as HTMLTextAreaElement
                ).value,
              };
            }
            return prev;
          });
        }}
      />
      <button
        onClick={async () => {
          const response = await fetch("/api/document", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: mermaid?.id,
              title: mermaid?.title,
              body: mermaid?.body,
            }),
          });
          const data = await response.json();
          window.alert(data.message);
        }}
      >
        SAVE
      </button>
    </div>
  );
};
