import React, { useState, useEffect, useRef } from 'react';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a href={href} className="group relative inline-block h-5 overflow-hidden text-sm">
      <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="block h-5 leading-5 text-gray-300">{children}</span>
        <span className="block h-5 leading-5 text-white">{children}</span>
      </div>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass('rounded-full'), 300);
    }
    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  const navLinksData = [
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Contact', href: '#contact' },
  ];

  const ctaButton = (
    <div className="group relative w-full sm:w-auto">
      <div className="pointer-events-none absolute inset-0 -m-2 hidden rounded-full bg-gray-100 opacity-40 blur-lg filter transition-all duration-300 ease-out group-hover:-m-3 group-hover:opacity-60 group-hover:blur-xl sm:block" />
      <button
        className="relative z-10 w-full cursor-pointer rounded-full bg-linear-to-br from-gray-100 to-gray-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400 sm:w-auto sm:px-3 sm:text-sm"
        type="button"
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Work With Us
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-6 left-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center border border-[#333] bg-[#1f1f1f57] px-6 py-3 backdrop-blur-sm transition-[border-radius] duration-300 ease-in-out sm:w-auto ${headerShapeClass}`}
    >
      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <a href="#hero" className="shrink-0 transition-opacity duration-200 hover:opacity-70" aria-label="Apex Code — home">
          <svg viewBox="0 0 342 281" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto" aria-hidden="true">
            <path d="M 171 10 L 76 169 L 106 200 L 172 91 L 237 200 L 267 168 Z" fill="#fff"/>
            <path d="M 171 167 L 122 218 L 172 271 L 221 218 Z" fill="#fff"/>
            <path d="M 77 121 L 10 169 L 85 218 L 45 169 Z" fill="#fff"/>
            <path d="M 266 121 L 299 168 L 258 218 L 332 170 Z" fill="#fff"/>
          </svg>
        </a>

        <nav className="hidden items-center space-x-4 text-sm sm:flex sm:space-x-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex sm:gap-3">{ctaButton}</div>

        <button
          className="flex h-8 w-8 items-center justify-center text-gray-300 focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen ? 'max-h-250 pt-4 opacity-100' : 'pointer-events-none max-h-0 pt-0 opacity-0'
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-full text-center text-gray-300 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex w-full flex-col items-center space-y-4">{ctaButton}</div>
      </div>
    </header>
  );
}
