import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
// Поднимаемся на уровень выше, так как мы теперь в папке [locale]
import "../globals.css"; 
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

// --- i18n Imports ---
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

// Шрифты тоже ищем на уровень выше (в папке app/fonts)
const CabinetGtotesk = localFont({
  src: "../fonts/CabinetGrotesk-Bold.woff2", 
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IkSoft",
  description: "Digital Architecture",
};

// Компонент стал async и принимает params
export default async function LocaleLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // Получаем переводы для текущей локали на сервере
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-background text-foreground">
        {/* Провайдер прокидывает переводы во все клиентские компоненты */}
        <NextIntlClientProvider messages={messages}>
            
            <SmoothScroll>
              <Header />
              {children}
            </SmoothScroll>

            {/* === ГЛОБАЛЬНЫЙ БЛЮР ВНИЗУ === */}
            <div className="fixed bottom-0 left-0 w-full h-[150px] z-50 pointer-events-none
                            backdrop-blur-[2px]
                            [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]">
            </div>
            <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}