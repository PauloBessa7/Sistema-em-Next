import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema",
  description: "Template Básico para projetos Next.js com TypeScript",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
