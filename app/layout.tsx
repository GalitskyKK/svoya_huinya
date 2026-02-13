import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СВОЯ ХУЙНЯ",
  description: "Однопользовательская викторина 18+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
