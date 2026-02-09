"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image"; // 1. Импортируем компонент Image

export default function RevealCurtain() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.5 // Чуть увеличил задержку, чтобы лого успел появиться до начала подъема шторки
      }}
      onAnimationComplete={() => setIsVisible(false)}
      // 2. ИЗМЕНЕНИЕ: bg-white заменен на bg-background
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none ${
        !isVisible ? "hidden" : "block"
      }`}
    >
        {/* 3. ИЗМЕНЕНИЕ: Логотип вместо текста */}
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // Контейнер для логотипа: задаем большую ширину относительно экрана
            // w-[70%] на мобилках, w-[40%] на десктопах - будет большим и по центру
            className="relative w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto flex justify-center items-center"
        >
            <Image 
               src="/logo.png" 
               alt="Logo" 
               width={1000} // Задаем большие базовые размеры для высокого качества
               height={500} // (Пропорции подстроятся благодаря w-full h-auto ниже)
               priority // Важно: загружаем логотип с приоритетом
               className="object-contain w-full h-auto" // Логотип растягивается на всю ширину контейнера
            />
        </motion.div>
    </motion.div>
  );
}