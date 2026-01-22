"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/rodionvitenberg-ui/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rodion-vitenberg-4200363a4/" },
  ];

  return (
    <footer className="relative z-20 w-full bg-black border-t border-white/10 pt-20 pb-10 px-4 md:px-10">
      
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[40vh]">
        
        {/* === ВЕРХНЯЯ ЧАСТЬ: CALL TO ACTION === */}
        <div className="flex flex-col items-start">
            <span className="font-mono text-xs md:text-sm text-white/40 uppercase tracking-widest mb-6 block">
                Ready to initiate?
            </span>
            
            {/* Огромная ссылка на почту */}
            <Link 
                href="mailto:rodionvitenberg@gmail.com"
                className="group relative inline-block"
            >
                <span className="font-heading text-5xl md:text-8xl lg:text-9xl font-bold uppercase text-white leading-none transition-colors duration-300 group-hover:text-accent">
                    RVSTUDIO<br className="md:hidden"/>
                </span>
                
                {/* Иконка стрелки, появляющаяся при наведении (для десктопа) */}
                <ArrowUpRight className="hidden md:block absolute -top-4 -right-12 w-12 h-12 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
            </Link>
        </div>

        {/* === НИЖНЯЯ ЧАСТЬ: INFO & LINKS === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-20 md:mt-0">
            
            {/* Лево: Копирайт */}
            <div className="flex flex-col gap-2">
                <span className="font-heading text-xl font-bold text-white tracking-widest">
                    DIGITAL POSSESSION
                </span>
                <p className="text-white/30 text-sm">
                    © {currentYear} RVStudio. All rights reserved.
                </p>
            </div>

            {/* Право: Соцсети */}
            <div className="flex gap-6 md:gap-8">
                {socialLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.href}
                        target="_blank"
                        className="text-sm md:text-base text-white/60 hover:text-white uppercase tracking-wider transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

        </div>

      </div>
    </footer>
  );
}