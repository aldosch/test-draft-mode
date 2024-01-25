import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test draft mode",
  description: "Test Vercel draft mode collaboration features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-black bg-purple-100">{children}</body>
    </html>
  );
}
