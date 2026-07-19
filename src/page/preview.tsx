"use client";

import { MermaidPreview } from "@/src/components/MermaidPreview";
import { Document } from '@/src/prisma/generated/browser';
import { useEffect, useState } from "react";

export const Preview = ({ id }: { id: number }) => {
  const [mermaid, setMermaid] = useState<Document | null>(null);

  useEffect(() => {
    const fetchMermaid = async () => {
      const document = await fetch(`/api/document?id=${id}`).then((res) => res.json());
      console.log(document);
      return document;
    };
    fetchMermaid().then(setMermaid);
  }, [id]);


  return <div>
    <h1>{mermaid?.title ?? ""}</h1>
    <MermaidPreview code={mermaid?.body ?? ""}></MermaidPreview>
    <textarea id="mermaid-body" value={mermaid?.body ?? ""} onChange={() => {
      setMermaid((prev) => {
        if (prev) {
          return { ...prev, body: (document.getElementById("mermaid-body") as HTMLTextAreaElement).value }
        }
        return prev;
      })
    }} />
    <button onClick={async () => {
      const response = await fetch("/api/document", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: mermaid?.id,
          title: mermaid?.title,
          body: mermaid?.body
        })
      });
      const data = await response.json();
      window.alert(data.message);
    }}>SAVE</button>
  </div>
}
