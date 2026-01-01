"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "./AnimatedContent";
import Aurora from "@/components/Aurora"; 

export default function Services() {
  
  const included = [
    "Functional Forms & Inputs",
    "Admin Panel Setup",
    "Core Backend Logic",
    "Integrations (Email, CRM Lite)",
    "Responsive Design",
    "Deployment & Domain Setup"
  ];

  const notIncluded = [
    "Complex SAAS Architecture",
    "Deep AI/ML Integration",
    "Mobile App Development",
    "Ongoing Marketing & Ads"
  ];

  const lineVariant = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1, ease: "easeInOut" } 
    }
  };

  const verticalLineVariant = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { 
      scaleY: 1, 
      transition: { duration: 1, ease: "easeInOut" } 
    }
  };

  return (
    // ИЗМЕНЕНИЕ: pt-0 (было py-24). Убрали верхний отступ, чтобы подтянуть блок выше.
    <section className="relative z-10 min-h-screen w-full flex flex-col justify-center px-4 md:px-10 pt-0 pb-24 text-foreground">
      
      {/* === ГЛАВНЫЙ КОНТЕЙНЕР === */}
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#0a0a0a]">
        
        {/* === СЛОЙ 1: БЛОКИРОВЩИК ФОНА === */}
        <div className="absolute inset-0 z-0 bg-black/90 backdrop-blur-xl" />

        {/* === СЛОЙ 2: АВРОРА (ТОЛЬКО DESKTOP) === */}
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none opacity-50">
            <Aurora
                colorStops={["#757575", "#303030", "#424141"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
        </div>

        {/* === СЛОЙ 3: КОНТЕНТ === */}
        <div className="relative z-12">

            {/* === HEADER SECTION === */}
            <div className="relative border-b border-white/10 p-8 md:p-12">
                <AnimatedContent direction="vertical" distance={20}>
                    <span className="font-mono text-xs md:text-sm text-accent tracking-widest uppercase mb-4 block">
                        Scope of Work
                    </span>
                    <h2 className="font-heading text-4xl md:text-7xl uppercase font-bold tracking-tighter text-white">
                        Standard Logic Site
                    </h2>
                    <p className="mt-4 text-white/60 max-w-2xl text-base md:text-lg font-light">
                         A fully functional website with logic, backend, and admin controls. 
                         Ready for business.
                    </p>
                </AnimatedContent>
            </div>

            {/* === GRID CONTENT === */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2">
                
                {/* Вертикальная линия для Included/Not Included */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={verticalLineVariant}
                    className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" 
                />

                {/* LEFT: INCLUDED */}
                <div className="p-8 md:p-12 border-b lg:border-b-0 border-white/10">
                    <AnimatedContent delay={0.2}>
                        <h3 className="text-xl font-heading uppercase font-bold mb-8 flex items-center gap-3 text-white">
                            <span className="w-2 h-2 bg-accent rounded-full" />
                            What's Included
                        </h3>
                        <ul className="flex flex-col gap-6">
                            {included.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-sm md:text-lg text-white">
                                    <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContent>
                </div>

                {/* RIGHT: NOT INCLUDED */}
                <div className="p-8 md:p-12 bg-white/5">
                    <AnimatedContent delay={0.4}>
                        <h3 className="text-xl font-heading uppercase font-bold mb-8 text-white/40 flex items-center gap-3">
                            <span className="w-2 h-2 bg-white/20 rounded-full" />
                            Not Included
                        </h3>
                        <ul className="flex flex-col gap-6">
                            {notIncluded.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-sm md:text-lg text-white/40">
                                    <X className="w-5 h-5 text-white/20 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContent>
                </div>

            </div>

            {/* === FOOTER SECTION === */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={lineVariant}
                className="h-[1px] w-full bg-white/10" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* TIMELINE */}
                {/* ИЗМЕНЕНИЕ: border-b (мобилка) и lg:border-r (десктоп). Это создает границу между Timeline и Price. */}
                <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                        <span className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2 block">
                            Estimated Timeline
                        </span>
                        <p className="font-heading text-4xl md:text-5xl text-white uppercase font-bold">
                            1-2 Weeks
                        </p>
                        <p className="text-sm text-white/50 mt-2">
                            From approval to deployment.
                        </p>
                </div>

                {/* PRICE & ACTION */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-accent/10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
                                    Starting Price
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-heading text-5xl md:text-6xl text-white uppercase font-bold">
                                        €1,000
                                    </span>
                                </div>
                            </div>

                            <Link 
                                href="mailto:contact@debell.dev?subject=Standard%20Site%20Inquiry" 
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-accent transition-colors duration-300 rounded-sm w-full md:w-auto"
                            >
                                Start Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                </div>

            </div>

        </div> 
        
      </div>
    </section>
  );
}