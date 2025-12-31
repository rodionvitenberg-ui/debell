import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google"; 
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const CabinetGtotesk = localFont({
  src: "./fonts/CabinetGrotesk-Bold.woff2", 
  variable: "--font-custom",       
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEBELL",
  description: "Digital Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-[#ededed]">
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}