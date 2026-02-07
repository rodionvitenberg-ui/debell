"use client";

import Image from "next/image";

const cardData = [
  {
    title: "Landing Page",
    description: "Быстрый старт. Одностраничный сайт с фокусом на конверсию.",
    img: "/art1.jpg", 
    tags: ["3-5 дней", "от €500"]
  },
  {
    title: "Corporate Website",
    description: "Лицо бизнеса. Презентация услуг и кейсов. Удобная админка.",
    img: "/art1.jpg",
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
      
      {/* ГЛАВНЫЙ КОНТЕЙНЕР-ОБЕРТКА */}
      <div className="relative w-full max-w-[100%] mx-auto isolate">
         
         {/* 1. САМА ПОДЛОЖКА (ФОН)
             absolute inset-0: Растягивается на всю высоту контента.
             rounded-[2.5rem]: Закругляет углы фона.
             -z-10: Лежит ПОД контентом.
         */}
         <div className="absolute inset-0 bg-background rounded-[2.5rem] -z-10 shadow-2xl" />

         {/* 2. ШАПКА БЛОКА */}
         {/* rounded-t-[2.5rem]: Чтобы верхние углы совпадали с подложкой */}
         <div className="sticky top-0 z-50 w-full bg-background rounded-t-[2.5rem] rounded-b-[2.5rem] px-6 py-8 md:px-12 md:py-10 h-[180px] flex items-center">
             <div className="flex flex-col justify-center w-full">
                <span className="text-white/50 font-cool text-xs uppercase tracking-widest mb-3 block">
                    Мы знаем, как сделать лучше
                </span>
                <h2 className="font-cool text-4xl md:text-6xl text-white font-bold uppercase leading-none">
                    Наши Услуги:
                </h2>
             </div>
         </div>

         {/* 3. КОНТЕЙНЕР КАРТОЧЕК */}
         {/* overflow-clip: Современный аналог hidden, который реже ломает sticky, 
             но обрезает всё, что вылезает за границы (скругления).
             rounded-b-[2.5rem]: Важно закруглить низ контейнера.
         */}
         <div className="relative w-full pb-0 rounded-b-[2.5rem] overflow-clip">
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
            className="sticky w-full flex justify-end"
            style={{ 
                top: `${topOffset}px`, 
                zIndex: index + 1,
            }}
        >
            {/* ТЕЛО КАРТОЧКИ */}
            <div className={`
                w-full md:w-[66%] 
                min-h-[70vh]
                bg-background
                relative overflow-hidden
                border-t border-white/10
                
                /* Скругляем верхний левый угол для стиля "папки" */

                /* ВАЖНО: Если это последняя карточка, скругляем ей низ, 
                   чтобы она идеально легла в подложку */
                ${isLast ? 'rounded-br-[2.5rem] border-b-0' : ''}
            `}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[70vh]">
                    
                    {/* Левая колонка - Текст */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase font-cool leading-tight">
                                {card.title}
                            </h3>
                            {/* Номер для мобилок */}
                            <span className="md:hidden font-mono text-2xl text-white/20 font-bold">
                                0{index + 1}
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-8">
                             {card.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <p className="text-lg text-white/60 mb-10 leading-relaxed">
                            {card.description}
                        </p>
                    </div>

                    {/* Правая колонка - Картинка */}
                    <div className="relative w-full h-[300px] md:h-full bg-[#050505]">
                        <div className="absolute top-6 right-8 z-20 font-mono text-6xl md:text-8xl text-white opacity-10 font-bold pointer-events-none hidden md:block">
                            0{index + 1}
                        </div>

                        <Image 
                            src={card.img} 
                            alt={card.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-60"
                            loading="lazy" 
                        />
                         <div className="absolute inset-0 bg-gradient-to-l from-background/20 via-transparent to-background/80 md:to-transparent pointer-events-none" />
                    </div>

                </div>
            </div>
        </div>
    );
}