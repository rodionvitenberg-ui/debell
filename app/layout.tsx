import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google"; 
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
// (Твой шрифт оставил как был)
const CabinetGtotesk = localFont({
  src: "./fonts/CabinetGrotesk-Bold.woff2", 
  variable: "--font-custom",       
  display: "swap",
});

export const metadata: Metadata = {
  title: "RV Studio",
  description: "Digital Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-background text-foreground">
        
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>

        {/* === ГЛОБАЛЬНЫЙ БЛЮР ВНИЗУ === */}
        {/* pointer-events-none: чтобы сквозь него можно было кликать */}
        {/* backdrop-blur-sm: сила размытия */}
        {/* mask-image: градиент, чтобы размытие плавно сходило на нет вверх */}
        <div className="fixed bottom-0 left-0 w-full h-15 z-50 pointer-events-none backdrop-blur-[15px] [mask-image:linear-gradient(to_top,black,transparent)]" />
       <Footer /> 
      </body>
    </html>
  );
}