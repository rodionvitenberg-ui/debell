"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

// 1. Оставляем только технические данные (ID и путь к картинке)
const cardData = [
  { id: "landing", img: "/project1.png" },
  { id: "corporate", img: "/project2.png" },
  { id: "ecommerce", img: "/project3.png" },
  { id: "webapp", img: "/project4.png" },
] as const;

type ServiceCardType = typeof cardData[number];

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section className="relative w-full bg-secondary py-16 md:py-20 px-2 md:px-4">
      
      <div className="relative w-full max-w-[100%] mx-auto isolate">
         
         {/* ПОДЛОЖКА */}
         <div className="hidden md:block absolute inset-0 bg-background rounded-[2.5rem] -z-10 shadow-2xl" />

         {/* ШАПКА БЛОКА (ДЕСКТОПНАЯ) */}
         <div className="hidden md:flex md:sticky md:top-0 z-50 w-full bg-background rounded-t-[2.5rem] rounded-b-[2.5rem] px-12 py-10 h-[180px] items-center mb-0">
             <div className="flex flex-col justify-center w-full">
                <span className="text-white/50 font-cool text-xs uppercase tracking-widest mb-3 block">
                    {t("subtitle")}
                </span>
                <h2 className="font-cool text-6xl text-white font-bold uppercase leading-none">
                    {t("title")}
                </h2>
             </div>
         </div>

         {/* --- МОБИЛЬНАЯ ВЕРСИЯ --- */}
         <div className="md:hidden bg-background rounded-[2rem] p-6 flex flex-col gap-8 shadow-2xl">
            
            <div className="border-b border-white/10 pb-6">
                <span className="text-white/50 font-cool text-[10px] uppercase tracking-widest mb-2 block">
                    {t("subtitle")}
                </span>
                <h2 className="font-cool text-4xl text-white font-bold uppercase leading-none">
                    {t("title")}
                </h2>
            </div>

            {/* СПИСОК УСЛУГ */}
            {cardData.map((card, index) => {
                // Извлекаем переводы для текущей карточки
                const title = t(`items.${card.id}.title` as any);
                const description = t(`items.${card.id}.description` as any);
                const tags = t.raw(`items.${card.id}.tags` as any) as string[];

                return (
                  <div key={card.id} className="flex flex-col gap-5 border-b border-white/10 pb-8 last:border-0 last:pb-0">
                      <h3 className="text-2xl font-bold text-white uppercase font-cool leading-tight">
                          {title}
                      </h3>

                      <div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-[#050505]">
                          <Image 
                              src={card.img} 
                              alt={title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover opacity-80"
                          />
                      </div>

                      <div className="flex flex-wrap gap-2">
                          {tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-[10px] uppercase tracking-wider">
                              {tag}
                          </span>
                          ))}
                      </div>

                      <p className="text-sm text-white/60 leading-relaxed">
                          {description}
                      </p>
                  </div>
                );
            })}
         </div>

         {/* --- ДЕСКТОПНАЯ ВЕРСИЯ КАРТОЧЕК --- */}
         <div className="hidden md:block relative w-full pb-0 md:rounded-b-[2.5rem] md:overflow-clip">
            {cardData.map((card, index) => {
                // Передаем данные в десктопную карточку
                const title = t(`items.${card.id}.title` as any);
                const description = t(`items.${card.id}.description` as any);
                const tags = t.raw(`items.${card.id}.tags` as any) as string[];

                return (
                  <DesktopServiceCard 
                      key={card.id} 
                      card={card} 
                      index={index}
                      total={cardData.length}
                      title={title}
                      description={description}
                      tags={tags}
                  />
                );
            })}
         </div>

      </div>
    </section>
  );
}

// Обновили пропсы для чистой типизации
function DesktopServiceCard({ 
  card, 
  index, 
  total,
  title,
  description,
  tags
}: { 
  card: ServiceCardType; 
  index: number; 
  total: number;
  title: string;
  description: string;
  tags: string[];
}) {
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
                                {title}
                            </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-8">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <p className="text-lg text-white/60 mb-10 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Картинка */}
                    <div className="relative w-full h-full">
                        <Image 
                            src={card.img} 
                            alt={title}
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