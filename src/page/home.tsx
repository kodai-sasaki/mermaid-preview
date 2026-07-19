"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Document } from "@/src/prisma/generated/browser";

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
    <div>
      <ul>
        {mermaids.map((mermaid) => (
          <li key={mermaid.id}>
            <Link href={`/preview/?id=${mermaid.id}`}>{mermaid.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
