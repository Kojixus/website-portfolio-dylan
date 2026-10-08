import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import PageTransitionProvider from "../components/page-transition-provider";
import "./globals.css";

// The site uses exactly three families: Montserrat for headings, Open Sans
// for body copy, Roboto for dates, numbers and labels. next/font self-hosts
// them, so there's no request to Google at runtime.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dylan Dana — Endurance Driver",
  description:
    "Dylan Dana races ChampCar endurance events in Level One Racing's #412 Miata and Kovi Racing's #214 Integra, and is a driving instructor at The Motor Enclave in Tampa. Results, calendar, photos, and coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${roboto.variable}`}
    >
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
