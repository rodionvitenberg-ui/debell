"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Оставляем только технические ID
const faqData = [
  { id: "01" },
  { id: "02" },
  { id: "03" },
  { id: "04" },
  { id: "05" }
] as const;

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <section className="relative w-full py-4 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
          
          <div className="mb-12 md:mb-16">
            <h2 className="font-cool text-5xl md:text-7xl text-background font-bold uppercase leading-none">
                {t("title")}
            </h2>
          </div>

          <LayoutGroup>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
                  
                  {/* ЛЕВАЯ КОЛОНКА */}
                  <div className="flex-1 flex flex-col gap-4">
                      {faqData.map((item) => (
                          <FAQItem 
                            key={item.id} 
                            question={t(`items.${item.id}.question` as any)}
                            answer={t(`items.${item.id}.answer` as any)}
                            isOpen={openItems.includes(item.id)}
                            toggle={() => toggleItem(item.id)}
                          />
                      ))}
                  </div>

                  {/* ПРАВАЯ КОЛОНКА */}
                  <motion.div 
                    layout 
                    className="hidden lg:block w-[40%] relative min-h-[500px]"
                  >
                      <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-background relative translate-z-0">
                          
                          <Image 
                            src="/art1.jpg"
                            alt="FAQ Art"
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover opacity-80" 
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none" />

                          <div className="absolute bottom-10 left-10 max-w-[250px] z-10 pointer-events-none">
                              <p className="text-white/90 font-mono text-sm leading-relaxed">
                                 {t("stillHaveQuestions")} 
                                 <br/>
                                 <a 
                                    href="/contact" 
                                    className="text-accent cursor-pointer hover:underline mt-2 block pointer-events-auto"
                                 >
                                    {t("contactUs")}
                                 </a>
                              </p>
                          </div>

                      </div>
                  </motion.div>

              </div>
          </LayoutGroup>

      </div>
    </section>
  );
}

// Обновляем типизацию и пропсы для FAQItem
function FAQItem({ 
    question, 
    answer, 
    isOpen, 
    toggle 
}: { 
    question: string;
    answer: string;
    isOpen: boolean; 
    toggle: () => void; 
}) {
    return (
        <motion.div 
            layout 
            onClick={toggle}
            className={`
                group cursor-pointer border border-white/10 rounded-[1.5rem] p-6 md:p-8 
                transition-colors duration-200 bg-background hover:border-white/20
                ${isOpen ? 'bg-[#1a1a1a] border-white/20' : ''}
            `}
        >
            <motion.div layout className="flex justify-between items-start gap-4">
                <div className="flex gap-4 md:gap-6 items-start">
                    <h3 className={`
                        text-lg md:text-xl font-bold uppercase font-cool leading-tight transition-colors
                        ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}
                    `}>
                        {question}
                    </h3>
                </div>
                
                <div className={`
                    shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 
                    transition-all duration-300 
                    ${isOpen ? 'bg-white text-black rotate-45' : 'text-white/40 group-hover:border-white/40'}
                `}>
                   <Plus className="w-4 h-4" />
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pt-6 pl-0 md:pl-[3.5rem] text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}