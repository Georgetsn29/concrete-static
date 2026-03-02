import React from 'react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const navItems: PageType[] = ['HOME', 'ABOUT', 'TOUR'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 flex justify-between items-start pointer-events-none">
      {/* Brand / Logo */}
      <div className="bg-[var(--concrete-shadow)] text-white p-2 pointer-events-auto shadow-[5px_5px_0px_var(--accent)] border-2 border-white">
        <h1 className="font-black italic tracking-tighter text-xl sm:text-2xl leading-none">
          CONCRETE<br />STATIC
        </h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pointer-events-auto items-end">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            className={`
              px-6 py-2 font-['Space_Mono'] font-bold text-sm tracking-widest border-2 transition-all duration-200
              ${currentPage === item 
                ? 'bg-[var(--accent)] text-white border-[var(--concrete-shadow)] shadow-[4px_4px_0px_var(--concrete-shadow)] translate-x-[-2px] translate-y-[-2px]' 
                : 'bg-[var(--concrete-200)] text-[var(--concrete-shadow)] border-[var(--concrete-shadow)] hover:bg-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--concrete-shadow)]'}
            `}
          >
            {item === 'TOUR' ? 'TOUR DATES' : item}
          </button>
        ))}
      </div>
    </nav>
  );
};