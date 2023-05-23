import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
config.autoAddCss = false;

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
    <html lang="en" className="bg-background-900 text-white antialiased">
      <body className={inter.className}>
        <NavBar />
        <main className="container mx-auto flex h-full flex-col items-center justify-start space-y-12 text-center">
          {children}
        </main>
      </body>
    </html>
  );
}
