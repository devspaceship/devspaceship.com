import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Script from "next/script";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const thomas = "Thomas Saint-Gérand";
const description = "A website about science and nerdy stuff";
const url = new URL("https://devspaceship.com");

export const metadata: Metadata = {
  title: thomas,
  description,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["Devspaceship", thomas, "Science", "Coding", "Blog"],
  authors: [{ name: thomas }],
  colorScheme: "dark",
  creator: thomas,
  publisher: thomas,
  metadataBase: url,
  openGraph: {
    title: thomas,
    description,
    url,
    siteName: thomas,
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: thomas,
    description,
    creator: "@devspaceship",
  },
  category: "science",
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
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6016747292298343"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
