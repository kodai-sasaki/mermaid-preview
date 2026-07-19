import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mermaid Preview",
  description: "A web application for previewing Mermaid diagrams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
