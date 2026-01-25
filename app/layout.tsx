import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SelectedServicesProvider } from "./context/SelectedServicesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Server IT uz — Professional IT yechimlar",
  description: "Web development, tarmoq xavfsizligi, avtomatlashtirish, CCTV xizmatlari. Toshkent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SelectedServicesProvider>
          {children}
        </SelectedServicesProvider>
      </body>
    </html>
  );
}
