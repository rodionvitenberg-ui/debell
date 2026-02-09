"use client";

import { Instagram, Mail } from "lucide-react";
import Link from "next/link";

// 1. ИКОНКА WHATSAPP (SVG)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// 2. ИКОНКА TELEGRAM (SVG)
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const contacts = [
  {
    name: "WhatsApp",
    link: "https://wa.me/+996550418317", 
    // Используем наш SVG компонент
    icon: <WhatsAppIcon className="w-5 h-5" />,
    color: "hover:bg-[#25D366] hover:text-white hover:border-transparent text-gray-600"
  },
  {
    name: "Telegram",
    link: "https://t.me/pwnedking", 
    // Используем наш SVG компонент
    icon: <TelegramIcon className="w-5 h-5" />,
    color: "hover:bg-[#229ED9] hover:text-white hover:border-transparent text-gray-600"
  },
  {
    name: "Instagram",
    link: "https://instagram.com/",
    // Instagram берем из lucide-react, он там нормальный (камера)
    icon: <Instagram className="w-5 h-5" />,
    color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent text-gray-600"
  },
  {
    name: "Email",
    link: "mailto:contact@debell.dev",
    icon: <Mail className="w-5 h-5" />,
    color: "hover:bg-accent hover:text-white hover:border-transparent text-gray-600"
  }
];

export default function ContactSection() {
  return (
    // МЕНЯЕМ ФОН НА БЕЛЫЙ (bg-white), ТЕКСТ НА ЧЕРНЫЙ (text-black)
    <section id="contact" className="relative w-full bg-secondary text-black py-24 px-4 md:px-8">
      
      <div className="w-full max-w-5xl mx-auto">
          
          {/* 1. ЗАГОЛОВОК И СОЦСЕТИ */}
          <div className="mb-16 md:mb-20 text-center md:text-left">
            <span className="text-background font-cool text-xs uppercase tracking-widest mb-3 block">
                Готовы начать?
            </span>
            <h2 className="font-cool text-5xl md:text-7xl text-black font-bold uppercase leading-none mb-6">
                Мы всегда на связи
            </h2>
            
            <div className="flex flex-col gap-2 items-center md:items-start">
                        {/* Номер телефона */}
                        <a 
                            href="tel:+996550418317" 
                            className="text-xl md:text-2xl font-bold text-black hover:text-accent transition-colors tracking-tight"
                        >
                            +996 550 41 83 17 - Каракол
                        </a>
                        
                        {/* Email (или второй номер) */}
                        <a 
                            href="tel:+996550418317" 
                            className="text-xl md:text-2xl font-bold text-black hover:text-accent transition-colors tracking-tight"
                        >
                            +996 550 41 83 17 - Бишкек
                        </a>

                {/* РЯД КВАДРАТНЫХ ИКОНОК СОЦСЕТЕЙ */}
                <div className="flex gap-3">
                    {contacts.map((contact, idx) => (
                        <Link 
                            key={idx}
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            // Квадратные кнопки (w-12 h-12), светлая граница, без текста
                            className={`w-12 h-12 flex items-center justify-center rounded-md border border-gray-200 transition-all duration-300 ${contact.color}`}
                            title={contact.name} // Добавляем title для доступности
                        >
                            {contact.icon}
                        </Link>
                    ))}
                </div>
            </div>
          </div>

          {/* 2. ЕДИНАЯ ФОРМА (в стиле скриншота) */}
          <div className="w-full">
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  
                  {/* Имя (на всю ширину в мобилке, половина на десктопе) */}
                  <div className="flex flex-col gap-2 md:col-span-1">
                      <label htmlFor="name" className="text-xs font-mono text-black uppercase tracking-widest font-bold mb-1">
                          Ваше Имя
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        placeholder="Иван Иванов"
                        // Стиль скриншота: прозрачный фон, тонкая серая рамка снизу (или полная)
                        // Выберем полную тонкую рамку для строгости.
                        className="w-full bg-transparent border-b border-gray-300 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors rounded-none"
                      />
                  </div>

                  {/* Email или Телефон */}
                  <div className="flex flex-col gap-2 md:col-span-1">
                      <label htmlFor="contact" className="text-xs font-mono text-black uppercase tracking-widest font-bold mb-1">
                          Email / Telegram
                      </label>
                      <input 
                        type="text" 
                        id="contact"
                        placeholder="example@mail.com"
                        className="w-full bg-transparent border-b border-gray-300 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors rounded-none"
                      />
                  </div>

                  {/* Сообщение (на всю ширину) */}
                  <div className="flex flex-col gap-2 md:col-span-2 mt-4">
                      <label htmlFor="message" className="text-xs font-mono text-black uppercase tracking-widest font-bold mb-1">
                          О проекте
                      </label>
                      <textarea 
                        id="message"
                        rows={3}
                        placeholder="Расскажите немного о вашей задаче..."
                        className="w-full bg-transparent border-b border-gray-300 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors resize-none rounded-none"
                      />
                  </div>

                  {/* Кнопка отправки (на всю ширину) */}
                  <div className="md:col-span-2 mt-8">
                    <button 
                        type="button"
                        // Черная кнопка, при наведении - акцентный цвет
                        className="w-full md:w-auto md:min-w-[200px] py-5 px-8 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300 rounded-md"
                    >
                        Отправить Заявку
                    </button>
                    <p className="text-gray-400 text-xs mt-4 font-mono">
                        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                    </p>
                  </div>
              </form>
          </div>

      </div>
    </section>
  );
}