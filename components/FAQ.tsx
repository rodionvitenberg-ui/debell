"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

const faqData = [
  {
    id: "01",
    question: "Сколько времени занимает разработка?",
    answer: "Сроки зависят от сложности. Лендинг мы делаем за 3-5 дней, корпоративный сайт за 2-3 недели. Мы всегда фиксируем дедлайны в договоре и платим штрафы за просрочку.",
  },
  {
    id: "02",
    question: "Что нужно для старта работ?",
    answer: "Нам нужно заполнить бриф (анкету) и обсудить ваши бизнес-цели. Если есть референсы или брендбук — это ускорит процесс. Предоплата 50% перед стартом.",
  },
  {
    id: "03",
    question: "Будет ли сайт работать на телефонах?",
    answer: "Разумеется. Mobile-first — наш стандарт. Мы тестируем сайты на всех популярных разрешениях, чтобы они летали и на iPhone, и на Android, и на планшетах.",
  },
  {
    id: "04",
    question: "Вы предоставляете поддержку после сдачи?",
    answer: "Да, мы даем гарантию на техническую исправность. Также можем взять проект на ежемесячную поддержку: обновлять контент, следить за безопасностью и развивать функционал.",
  },
  {
    id: "05",
    question: "Можно ли потом добавить новые функции?",
    answer: "Наш код модульный и чистый. В любой момент можно доработать функционал, добавить новые страницы или интеграции без переписывания всего сайта с нуля.",
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <section className="relative w-full py-20 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
          
          <div className="mb-12 md:mb-16">
            <h2 className="font-cool text-5xl md:text-7xl text-background font-bold uppercase leading-none">
                Вопросы и Ответы:
            </h2>
          </div>

          {/* УБРАЛИ LayoutGroup. Используем обычный флекс */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
              
              {/* ЛЕВАЯ КОЛОНКА */}
              <div className="flex-1 flex flex-col gap-4">
                  {faqData.map((item) => (
                      <FAQItem 
                        key={item.id} 
                        item={item} 
                        isOpen={openItems.includes(item.id)}
                        toggle={() => toggleItem(item.id)}
                      />
                  ))}
              </div>

              {/* ПРАВАЯ КОЛОНКА */}
              {/* УБРАЛИ motion.div layout. Сделали sticky через CSS — это дешевле для браузера */}
              <div className="hidden lg:block w-[40%] relative min-h-[500px]">
                  <div className="sticky top-24 w-full h-[600px] rounded-[2.5rem] overflow-hidden bg-background translate-z-0">
                      <Image 
                        src="/art1.jpg"
                        alt="FAQ Art"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover opacity-80" 
                        // Приоритет загрузки, чтобы не мигало
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none" />
                      {/* ... декор ... */}
                  </div>
              </div>

          </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, toggle }: { item: any, isOpen: boolean, toggle: () => void }) {
    return (
        <div // Заменили motion.div на div (убрали layout prop)
            onClick={toggle}
            className={`
                group cursor-pointer border border-white/10 rounded-[1.5rem] p-6 md:p-8 
                transition-colors duration-200 bg-background hover:border-white/20
                ${isOpen ? 'bg-[#1a1a1a] border-white/20' : ''}
            `}
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 md:gap-6 items-start">
                    <span className="font-mono text-accent/50 text-sm mt-1">
                        {item.id}
                    </span>
                    <h3 className={`
                        text-lg md:text-xl font-bold uppercase font-cool leading-tight transition-colors
                        ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}
                    `}>
                        {item.question}
                    </h3>
                </div>
                
                <div className={`
                    shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 
                    transition-all duration-300 
                    ${isOpen ? 'bg-white text-black rotate-45' : 'text-white/40 group-hover:border-white/40'}
                `}>
                   <Plus className="w-4 h-4" />
                </div>
            </div>

            {/* Анимируем только контент внутри */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Apple-style easing
                        className="overflow-hidden"
                    >
                        <p className="pt-6 pl-0 md:pl-[3.5rem] text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}