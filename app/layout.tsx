import type { Metadata } from "next";
import PageTransitionProvider from "../components/page-transition-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dylan Dana | High-Speed Portfolio",
  description:
    "Motorsport-inspired portfolio concept for Dylan Dana with WebGL visuals and race-weekend storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
