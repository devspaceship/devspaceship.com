import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VJTBJP5KDG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VJTBJP5KDG');
        `}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1385446005933239"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
