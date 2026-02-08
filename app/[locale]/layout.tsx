import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
// Путь на уровень выше к globals.css
import "../globals.css"; 
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Футер подключен
import localFont from "next/font/local";

// --- i18n Imports ---
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

// Путь к шрифтам (../fonts - так как мы внутри [locale])
const CabinetGtotesk = localFont({
  src: "../fonts/CabinetGrotesk-Bold.woff2", 
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IkSoft",
  description: "Digital Architecture",
};

// 1. Типизация Props для Next.js 15/16 (params - это Promise)
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  // 2. Ждем разрешения промиса params
  const { locale } = await params;

  // 3. Получаем переводы на сервере
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-background text-foreground">
        
        {/* Провайдер переводов */}
        <NextIntlClientProvider messages={messages}>
            
            <SmoothScroll>
              <Header />
              {children}
              <Footer /> {/* Футер теперь здесь, на всех страницах */}
            </SmoothScroll>

            {/* Глобальный блюр внизу экрана */}
            <div className="fixed bottom-0 left-0 w-full h-[150px] z-50 pointer-events-none
                            backdrop-blur-[2px]
                            [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]">
            </div>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}