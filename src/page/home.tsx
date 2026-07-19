"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Document } from "@/src/prisma/generated/browser";
import { MermaidPreview } from "../components/MermaidPreview";
import { dateDurationAgo } from "../utils/datetime";

export const Home = () => {
  const [mermaids, setMermaids] = useState<Document[]>([]);

  useEffect(() => {
    const fetchMermaids = async () => {
      const response = await fetch("/api/documents");
      const { data } = await response.json();
      return data as Document[];
    };
    fetchMermaids().then(setMermaids);
  }, []);

  return (
    <div className="p-8">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        {mermaids.map((mermaid) => (
          <li key={mermaid.id}>
            <Link
              href={`/preview/?id=${mermaid.id}`}
              className="flex flex-col bg-base-100 h-72 shadow-sm border border-base-500 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-1 w-full h-auto min-h-0">
                <MermaidPreview code={mermaid.body} />
              </div>
              <div className="shrink-0 p-2 bg-base-100/90">
                <h2 className="card-title clamp-2">{mermaid.title}</h2>
                <div className="flex text-sm text-right gap-2">
                  <span>
                    {dateDurationAgo({ date: new Date(mermaid.updatedAt) })}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
