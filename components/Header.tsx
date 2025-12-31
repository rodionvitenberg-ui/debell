"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      // Появляется плавно через 1.5 секунды (когда штора уже упала)
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
      // fixed: всегда наверху
      // mix-blend-difference: Текст меняет цвет сам (белый на черном, черный на белом)
      className="fixed top-0 left-0 z-[60] w-full flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference text-white"
    >
      
      {/* ЛОГОТИП */}
      <Link href="/" className="group">
        <span className="font-heading font-medium text-md tracking-widest uppercase">
          Digital Depression
        </span>
        {/* Точка, которая появляется при наведении */}
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* НАВИГАЦИЯ (Тестовые кнопки) */}
      <nav className="flex items-center gap-8">
        {["Work", "About", "Contact"].map((item, i) => (
          <motion.button
            key={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block font-sans text-xs font-bold uppercase tracking-[0.2em] relative group"
          >
            {item}
            {/* Подчеркивание при наведении */}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </motion.button>
        ))}

        {/* Кнопка MENU (Бургер) */}
        <button className="flex flex-col gap-1.5 group">
          <span className="w-8 h-[2px] bg-white transition-transform duration-300 group-hover:translate-x-2" />
          <span className="w-8 h-[2px] bg-white transition-transform duration-300 group-hover:-translate-x-2" />
        </button>
      </nav>

    </motion.header>
  );
}