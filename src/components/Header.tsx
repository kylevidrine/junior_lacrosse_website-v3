import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Music', path: '/music' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Videos', path: '/videos' },
  { name: 'Book Us', path: '/contact' },
];

const Header: React.FC<{ bandName: string }> = ({ bandName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkClass = 'text-brand-gold scale-105';
  const inactiveLinkClass = 'text-stone-400 hover:text-brand-gold transition-all duration-300';

  return (
    <header className="relative z-50 bg-neutral-950/80 backdrop-blur-xl sticky top-0 border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link to="/" className="group flex flex-col leading-tight">
            <span className="text-stone-50 font-header text-3xl md:text-4xl uppercase tracking-tighter group-hover:text-brand-gold transition-colors">
              {bandName}
            </span>
          </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `${isActive ? activeLinkClass : inactiveLinkClass} font-header text-lg uppercase tracking-widest`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:text-ice-white focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-white/5 animate-fade-in" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-brand-gold bg-white/5' : 'text-stone-300'} block px-4 py-4 rounded-lg text-xl font-header uppercase tracking-widest text-center`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
