"use client";

import { MermaidPreview } from "@/src/components/MermaidPreview";
import { Document } from "@/src/prisma/generated/browser";
import { useEffect, useState, useReducer } from "react";
import { TextArea } from "@/src/components/TextArea";

export const Preview = ({ id }: { id: number }) => {
  const [original, setOriginal] = useState<Document | null>(null);
  const [mermaid, setMermaid] = useState<Document | null>(null);
  const [updater, update] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const fetchMermaid = async () => {
      const document = await fetch(`/api/document?id=${id}`).then((res) =>
        res.json(),
      );
      console.log(document);
      return document;
    };
    fetchMermaid().then((document) => {
      setMermaid(document);
      setOriginal(document);
    });
  }, [id, updater]);

  const setMermaidBody = (value: string) => {
    setMermaid((prev) => {
      if (prev) {
        return {
          ...prev,
          body: value,
        };
      }
      return prev;
    });
  };

  const handleSave = async () => {
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
    console.log(data);
    update();
  };

  return (
    <div className="flex flex-col h-screen px-4">
      <div className="flex h-full gap-4">
        <div className="w-120 h-full">
          <TextArea
            title={mermaid?.title ?? ""}
            code={mermaid?.body ?? ""}
            originalCode={original?.body ?? ""}
            setCode={setMermaidBody}
            handleSave={handleSave}
          ></TextArea>
          <div className="">
            <button
              className="btn btn-primary btn-block"
              onClick={handleSave}
              disabled={mermaid?.body === original?.body}
            >
              SAVE
            </button>
          </div>
        </div>
        <div className="flex-1 h-full overflow-auto">
          <MermaidPreview code={mermaid?.body ?? ""}></MermaidPreview>
        </div>
      </div>
    </div>
  );
};
