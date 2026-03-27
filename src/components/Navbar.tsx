import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg className="w-10 h-10 text-orange-500" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L6 40h36L24 4z" fill="currentColor" opacity="0.8" />
              <path d="M24 12L14 36h20L24 12z" fill="white" opacity="0.3" />
              <path d="M18 20L10 38h16L18 20z" fill="currentColor" opacity="0.6" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-2xl font-extrabold tracking-wide">DUNT</span>
              <span className="text-orange-500 text-[10px] font-semibold tracking-[0.2em] uppercase">Adventure Right</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="#home" className="text-orange-500 font-semibold text-sm px-3 py-2 border-b-2 border-orange-500">HOME</a>
            <a href="#modelos" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">RUTAS</a>
            <a href="#features" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">EQUIPAMIENTO</a>
            <a href="#contact" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">CONTACTO</a>
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="border border-white/60 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-white/10 transition-colors">
              <a href="#modelos">Ver modelos</a>
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
              <a href="#contact">Agendar una visita</a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-md rounded-lg p-4 mb-4">
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-orange-500 font-semibold text-sm py-2">HOME</a>
              <a href="#modelos" className="text-white/80 hover:text-white font-medium text-sm py-2">RUTAS</a>
              <a href="#features" className="text-white/80 hover:text-white font-medium text-sm py-2">EQUIPAMIENTO</a>
              <a href="#" className="text-white/80 hover:text-white font-medium text-sm py-2">ALERTAS</a>
              <a href="#" className="text-white/80 hover:text-white font-medium text-sm py-2">BLOG</a>
              <a href="#contact" className="text-white/80 hover:text-white font-medium text-sm py-2">CONTACTO</a>
              <div className="flex gap-3 mt-2">
                <button className="border border-white/60 text-white text-sm font-semibold px-5 py-2 rounded">DECIR INFO</button>
                <button className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded">CONTACT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
