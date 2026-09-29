import type { Metadata, Viewport } from "next";
import Providers from "./Index";
import "./globals.css";
import { Site } from "@/helpers/Site";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: Site?.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${Site?.name}`,
    default: Site?.SEO_title,
  },
  description: `${Site?.SEO_Description}`,
  metadataBase: new URL(`${Site.url}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: Site?.SEO_title,
    description: `${Site?.SEO_Description}`,
    url: `${Site?.url}`,
    siteName: `${Site?.name}`,
    images: [
      {
        url: `${Site?.logo}`,
        width: 300,
        height: 100,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: Site?.name,
    description: Site?.SEO_Description,
    creator: `@${Site?.name}`,
    images: [Site?.logo],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content={Site?.themeColor} />
        <link rel="icon" type="image/icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="en-US" href={Site?.url} />
      </head>
      <body className={`${montserrat?.className} ${montserrat?.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
