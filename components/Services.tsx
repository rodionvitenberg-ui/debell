"use client";

import Image from "next/image";
import {
  Rocket,
  Monitor,
  ShoppingCart,
  Globe,
  ArrowRight
} from "lucide-react";

const cardData = [
  {
    title: "Landing Page",
    description: "Быстрый старт. Одностраничный сайт с фокусом на конверсию.",
    img: "/project1.jpg", 
    tags: ["3-5 дней", "от €500"]
  },
  {
    title: "Corporate Website",
    description: "Лицо бизнеса. Презентация услуг и кейсов. Удобная админка.",
    img: "/project2.jpg",
    tags: ["2-3 недели", "от €1200"]
  },
  {
    title: "E-Commerce",
    description: "Магазин 24/7. Каталог, корзина, оплата. Интеграции.",
    img: "/project3.jpg",
    tags: ["1.5 мес", "от €2500"]
  },
  {
    title: "Web Application",
    description: "Сложные сервисы. Уникальная логика (React, Python).",
    img: "/project4.jpg",
    tags: ["Individual", "NDA"]
  },
];

export default function Services() {
  return (
    <section className="relative w-full bg-secondary py-20 px-2 md:px-4">
      
      {/* will-change-transform: Подсказка браузеру, что этот блок будет скроллиться/трансформироваться 
      */}
      <div className="relative w-full max-w-[100%] bg-background rounded-[2.5rem] will-change-transform transform-gpu">
         
         {/* ШАПКА БЛОКА */}
         <div className="sticky top-0 z-50 w-full bg-background rounded-t-[2.5rem] px-6 py-8 md:px-12 md:py-10 h-[180px] flex items-center">
             <div className="flex flex-col justify-center w-full">
                <h2 className="font-cool text-4xl md:text-6xl text-white font-bold uppercase leading-none">
                    Наши Услуги:
                </h2>
             </div>
         </div>

         {/* КОНТЕЙНЕР КАРТОЧЕК */}
         <div className="relative w-full pb-10">
            {cardData.map((card, index) => (
                <ServiceCard 
                    key={index} 
                    card={card} 
                    index={index}
                    total={cardData.length}
                />
            ))}
         </div>

      </div>
    </section>
  );
}

function ServiceCard({ card, index, total }: { card: any, index: number, total: number }) {
    const topOffset = 180; 
    const isLast = index === total - 1;

    return (
        <div 
            // Убрали transform-gpu и will-change-transform отсюда. 
            // Sticky сам по себе оптимизирован браузером, лишние подсказки могут сбить его.
            className="sticky w-full flex justify-end pr-4 md:pr-12"
            style={{ 
                top: `${topOffset}px`, 
                zIndex: index + 1,
            }}
        >
            <div className={`
                w-full md:w-[66%] 
                min-h-[70vh]
                bg-background /* ЖЕСТКИЙ ЦВЕТ, НЕ CSS-ПЕРЕМЕННАЯ С ПРОЗРАЧНОСТЬЮ */
                relative overflow-hidden
                border-t border-white/10
                ${isLast ? 'rounded-b-[2.5rem]' : ''}
            `}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[70vh]">
                    
                    {/* Левая колонка - Текст */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase font-cool leading-tight">
                            {card.title}
                        </h3>
                        {/* ... тэги и описание ... */}
                        <div className="flex flex-wrap gap-3 mb-8">
                             {/* ... */}
                        </div>
                        <p className="text-lg text-white/60 mb-10 leading-relaxed">
                            {card.description}
                        </p>
                    </div>

                    {/* Правая колонка - Картинка */}
                    {/* Убрали group-hover scale анимацию. Она ОЧЕНЬ тяжелая при скролле sticky элементов */}
                    <div className="relative w-full h-[300px] md:h-full bg-[#111]">
                        <div className="absolute top-6 right-8 z-20 font-mono text-6xl md:text-8xl text-white opacity-10 font-bold">
                            0{index + 1}
                        </div>

                        {/* Статичная картинка без scale при ховере (для теста производительности) */}
                        <Image 
                            src={card.img} 
                            alt={card.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-60"
                            loading="lazy" // Ленивая загрузка
                            decoding="async"
                        />
                         <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/20 via-transparent to-[#0a0a0a]/80 md:to-transparent" />
                    </div>

                </div>
            </div>
        </div>
    );
}