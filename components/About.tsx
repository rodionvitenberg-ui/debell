"use client";

import ScrambledText from "./ScrambledText";

export default function About() {
  const textSizeClasses = "font-bold md:font-cool text-[1.4rem] sm:text-xl md:text-2xl lg:text-3xl leading-[1.0] md:leading-[1.1] tracking-tight md:tracking-normal";

  return (
    <section className="relative w-full pt-0 pb-10 md:py-10 bg-secondary overflow-hidden">
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-5 md:gap-10 mt-4 md:mt-0">
          
          {/* Абзац 1 (Статика) */}
          <div className={`w-full max-w-5xl font-cool text-accent-foreground text-left ${textSizeClasses}`}>
            <ScrambledText
              radius={70}
              duration={1.9}
              speed={0.7}
              scrambleChars=".:"
            >
              Проектируем и запускаем сложные веб-системы, которые превращают хаос в прибыль и приводят новых клиентов. <br /> Внедряем стандарты мирового веба от Иссык-Куля до Оша.
            </ScrambledText>
          </div>

          {/* Абзац 2 (Статика) */}
          <div className={`w-full max-w-5xl font-cool text-accent-foreground text-left ${textSizeClasses}`}>
            <ScrambledText
              radius={70}
              duration={1.9}
              speed={0.7}
              scrambleChars=".:"
            >
              Мы не рисуем просто красивые сайты, а создаем инструменты. Наш подход - точность и надежность, помноженные на понимание современного рынка. Мы здесь, чтобы доказать:<br /> в Кыргызстане могут и делают продукты мирового уровня.
            </ScrambledText>
          </div>

        </div>
      </div>

    </section>
  );
}