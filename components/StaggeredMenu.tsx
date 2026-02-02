import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from "next/image";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // Добавляем новый проп:
  onItemClick?: (link: string) => void;
  
  position?: 'left' | 'right';
  colors?: string[];
  menuItems?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  isOpen,
  onClose,
  onItemClick, // Получаем проп
  position = 'right',
  colors = ['#121212'], 
  menuItems = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.to('.sm-panel', {
        height: '100%',
        duration: 0.8,
        ease: 'power4.inOut',
        stagger: 0.05, 
      });

      if (logoUrl) {
        tl.current.to('.sm-logo', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
        }, '-=0.4'); // Начинаем чуть раньше окончания анимации панели
      }

      tl.current.to(
        '.sm-panel-item',
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
        },
        '-=0.4'
      );

      if (displaySocials) {
        tl.current.to(
          '.sm-social-link',
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
            stagger: 0.05,
          },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [displaySocials, logoUrl]);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
      if (onMenuOpen) onMenuOpen();
    } else {
      tl.current?.reverse();
      if (onMenuClose) onMenuClose();
    }
  }, [isOpen, onMenuOpen, onMenuClose]);

  // Измененный обработчик клика
  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    // Если передан onItemClick, используем его и предотвращаем стандартный переход
    if (onItemClick) {
      e.preventDefault();
      onItemClick(link);
    } else {
      // Иначе просто закрываем меню (старое поведение)
      onClose();
    }
  };

  return (
    <div ref={containerRef} className={`sm-scope ${className}`}>
      
      <div 
         className={`fixed inset-0 z-[40] bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
         }`}
         onClick={closeOnClickAway ? onClose : undefined} 
      />

      <div 
        className={`fixed inset-y-0 z-[50] flex 
          ${position === 'left' ? 'left-0 flex-row' : 'right-0 flex-row-reverse'} 
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
          w-full md:w-1/3 lg:w-1/4`} 
      >
        
        {colors.map((color, index) => (
          <div
            key={index}
            className={`sm-panel relative h-0 w-full ${isOpen ? 'shadow-2xl' : 'shadow-none'}`}
            style={{ backgroundColor: color }}
          >
            {index === colors.length - 1 && (
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 overflow-hidden">
                {logoUrl && (
                    <div className="sm-logo relative mb-20 w-40 h-16 transform translate-y-10 opacity-0 self-start ml-6 md:ml-0 md:self-start">
                        <Image 
                            src={logoUrl} 
                            alt="Menu Logo" 
                            fill
                            className="object-contain object-center scale-400 md:px-12"
                        />
                    </div>
                )}
                
                <nav className="flex flex-col gap-2">
                  <ul className="sm-panel-list flex flex-col gap-3" data-numbering={displayItemNumbering ? "true" : undefined}>
                    {menuItems.map((item, idx) => (
                      <li key={idx} className="overflow-hidden">
                         <a 
                           href={item.link} 
                           className="sm-panel-item block text-3xl md:text-4xl font-bold uppercase text-white hover:text-accent transition-colors transform translate-y-20 opacity-0"
                           // Передаем событие и ссылку в наш новый обработчик
                           onClick={(e) => handleLinkClick(e, item.link)}
                           aria-label={item.ariaLabel}
                         >
                           {item.label}
                         </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {displaySocials && (
                  <div className="mt-8 flex gap-4 overflow-hidden flex-wrap">
                    {socialItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-social-link text-white hover:text-accent text-xs uppercase tracking-widest transform translate-y-10 opacity-0 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
                
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}