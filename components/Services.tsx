"use client";

import Image from "next/image";

const cardData = [
  {
    title: "Landing Page",
    description: "Точка входа для вашего трафика. Мы проектируем лендинги с одной целью — превращать посетителей в клиентов. Идеальная структура, цепляющий копирайтинг и дизайн, который бьет точно в цель.",
    img: "/project1.jpg", 
    tags: ["High Conversion", "3-5 дней"]
  },
  {
    title: "Corporate Website",
    description: "Цифровая штаб-квартира вашего бренда. Мы создаем платформы, которые транслируют ваши ценности и вызывают доверие с первой секунды. Удобная админка, SEO-фундамент и безупречная работа на всех устройствах.",
    img: "/project2.jpg",
    tags: ["Brand Identity", "SEO Ready", "7-10 дней"]
  },
  {
    title: "E-Commerce",
    description: "Ваш бизнес работает 24/7. Мы строим мощные интернет-магазины с фокусом на User Journey. От удобного каталога до безопасной оплаты — мы убираем все барьеры между товаром и покупателем.",
    img: "/project3.jpg",
    tags: ["Global Sales", "Integrations", "10-14 дней"]
  },
  {
    title: "Web Applications",
    description: "Больше, чем просто сайт. Мы разрабатываем сложные экосистемы: CRM, личные кабинеты, SaaS-решения. Инструменты, которые автоматизируют рутину и помогают вашему бизнесу масштабироваться.",
    img: "/project4.jpg",
    tags: ["Automation", "React / Python", "~месяц"]
  },
];

export default function Services() {
  return (
    <section className="relative w-full bg-secondary py-16 md:py-20 px-2 md:px-4">
      
      <div className="relative w-full max-w-[100%] mx-auto isolate">
         
         {/* ПОДЛОЖКА (Только десктоп) */}
         <div className="hidden md:block absolute inset-0 bg-background rounded-[2.5rem] -z-10 shadow-2xl" />

         {/* ШАПКА БЛОКА (ДЕСКТОПНАЯ)
            hidden md:flex -> Видна только на компе.
            На мобилке мы спрятали её, чтобы она не болталась отдельно.
         */}
         <div className="hidden md:flex md:sticky md:top-0 z-50 w-full bg-background rounded-t-[2.5rem] rounded-b-[2.5rem] px-12 py-10 h-[180px] items-center mb-0">
             <div className="flex flex-col justify-center w-full">
                <span className="text-white/50 font-cool text-xs uppercase tracking-widest mb-3 block">
                    Мы знаем, как сделать лучше
                </span>
                <h2 className="font-cool text-6xl text-white font-bold uppercase leading-none">
                    Наши Услуги:
                </h2>
             </div>
         </div>

         {/* --- МОБИЛЬНАЯ ВЕРСИЯ (Единый блок) --- 
            Теперь заголовок находится ВНУТРИ этого блока.
         */}
         <div className="md:hidden bg-background rounded-[2rem] p-6 flex flex-col gap-8 shadow-2xl">
            
            {/* МОБИЛЬНЫЙ ЗАГОЛОВОК (Внутри блока) */}
            <div className="border-b border-white/10 pb-6">
                <span className="text-white/50 font-cool text-[10px] uppercase tracking-widest mb-2 block">
                    Мы знаем, как сделать лучше
                </span>
                <h2 className="font-cool text-4xl text-white font-bold uppercase leading-none">
                    Наши Услуги:
                </h2>
            </div>

            {/* СПИСОК УСЛУГ */}
            {cardData.map((card, index) => (
                <div key={index} className="flex flex-col gap-5 border-b border-white/10 pb-8 last:border-0 last:pb-0">
                    {/* 1. Заголовок */}
                    <h3 className="text-2xl font-bold text-white uppercase font-cool leading-tight">
                        {card.title}
                    </h3>

                    {/* 2. Картинка */}
                    <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-[#050505]">
                        <Image 
                            src={card.img} 
                            alt={card.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-80"
                        />
                    </div>

                    {/* 3. Теги */}
                    <div className="flex flex-wrap gap-2">
                        {card.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-[10px] uppercase tracking-wider">
                            {tag}
                        </span>
                        ))}
                    </div>

                    {/* 4. Текст */}
                    <p className="text-sm text-white/60 leading-relaxed">
                        {card.description}
                    </p>
                </div>
            ))}
         </div>

         {/* --- ДЕСКТОПНАЯ ВЕРСИЯ КАРТОЧЕК --- */}
         <div className="hidden md:block relative w-full pb-0 md:rounded-b-[2.5rem] md:overflow-clip">
            {cardData.map((card, index) => (
                <DesktopServiceCard 
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

// Компонент только для десктопа
function DesktopServiceCard({ card, index, total }: { card: any, index: number, total: number }) {
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
            <div className={`
                w-[66%] 
                min-h-[70vh]
                bg-background
                relative overflow-hidden
                border-t border-white/10
                ${isLast ? 'rounded-br-[2.5rem] border-b-0' : ''}
            `}>
                <div className="grid grid-cols-2 h-full min-h-[70vh]">
                    
                    {/* Текст */}
                    <div className="p-12 flex flex-col justify-center relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-5xl font-bold text-white uppercase font-cool leading-tight">
                                {card.title}
                            </h3>
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

                    {/* Картинка */}
                    <div className="relative w-full h-full bg-[#050505]">
                        <Image 
                            src={card.img} 
                            alt={card.title}
                            fill
                            sizes="50vw"
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-background/20 via-transparent to-background/80 pointer-events-none" />
                    </div>

                </div>
            </div>
        </div>
    );
}