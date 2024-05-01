import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import "./globals.css";
import CssBaseline from "@mui/material/CssBaseline";
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
    <>
      <CssBaseline />
      <html lang="en" className="bg-background-900 text-white antialiased">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <NavBar />
              <main className="container mx-auto flex h-full flex-col items-center justify-start space-y-12 text-center motion-safe:animate-fade-in-from-bottom">
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
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </>
  );
}
