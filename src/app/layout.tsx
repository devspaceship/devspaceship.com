import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thomas Saint-Gérand",
  description: "A website about science and nerdy stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background-900 text-white">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
