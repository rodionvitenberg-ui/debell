import Hero from "@/components/Hero"; // Импортируем нашу новую шторку
import AuroraBackground from "@/components/AuroraBackground"; // Можно оставить, если перенастроить цвета

export default function Home() {
  return (
    // Глобальный фон БЕЛЫЙ. Штора его перекроет при падении.
    <div className="relative min-h-screen w-full bg-[#ededed] text-[#050505] font-sans">
      
      {/* 1. ЧЕРНАЯ ШТОРА (Hero) */}
      <Hero />

      {/* 2. БЕЛЫЙ КОНТЕНТ (Появляется при скролле вниз) */}
      <main className="relative z-10 flex flex-col items-center py-24 px-6">
        
        {/* Пример контента "Обо мне" или "Кейс" */}
        <div className="max-w-4xl w-full flex flex-col gap-12 mt-12">
           <h2 className="font-heading text-5xl md:text-7xl uppercase leading-tight">
             We create <span className="text-gray-400">atmosphere</span><br/>
             not just websites.
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="text-xl leading-relaxed text-gray-600">
                Ваш сайт — это продолжение вашего интерьера. 
                Мы переносим физические ощущения в цифровой код.
                Никаких шаблонов. Только ручная работа.
              </p>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                 <span className="opacity-30 uppercase font-bold">Project Preview</span>
              </div>
           </div>
        </div>

      </main>
      
    </div>
  );
}