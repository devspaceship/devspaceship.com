import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
config.autoAddCss = false;

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="container mx-auto flex h-full flex-col items-center justify-start space-y-12 text-center motion-safe:animate-fade-in-from-bottom">
            {children}
          </main>
        </ThemeProvider>
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
      </body>
    </html>
  );
}
