import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="#1e3a5f" opacity="0.9" />
              <path d="M12 28 C12 28 16 18 24 18 C32 18 36 28 36 28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="15" cy="30" r="4" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="33" cy="30" r="4" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M19 30 L29 30" stroke="white" strokeWidth="2"/>
              <path d="M22 18 L20 13 L27 13 L25 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-2xl font-extrabold tracking-wide">GDN</span>
              <span className="text-[#60a5fa] text-[10px] font-semibold tracking-[0.2em] uppercase">Motors</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <a href="#home" className="text-[#60a5fa] font-semibold text-sm px-3 py-2 border-b-2 border-[#60a5fa]">INICIO</a>
            <a href="#modelos" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">MODELOS</a>
            <a href="#features" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">CARACTERÍSTICAS</a>
            <a href="#contact" className="text-white/80 hover:text-white font-medium text-sm px-3 py-2 transition-colors">CONTACTO</a>
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="border border-white/60 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-white/10 transition-colors">
              <a href="#modelos">Ver modelos</a>
            </button>
            <button className="bg-[#1e3a5f] hover:bg-[#162d4a] border border-[#60a5fa]/60 text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
              <a href="#contact">Visítanos</a>
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
          <div className="lg:hidden bg-[#0f1e30]/95 backdrop-blur-md rounded-lg p-4 mb-4">
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-[#60a5fa] font-semibold text-sm py-2">INICIO</a>
              <a href="#modelos" className="text-white/80 hover:text-white font-medium text-sm py-2">MODELOS</a>
              <a href="#features" className="text-white/80 hover:text-white font-medium text-sm py-2">CARACTERÍSTICAS</a>
              <a href="#contact" className="text-white/80 hover:text-white font-medium text-sm py-2">CONTACTO</a>
              <div className="flex gap-3 mt-2">
                <button className="border border-white/60 text-white text-sm font-semibold px-5 py-2 rounded">
                  <a href="#modelos">Ver modelos</a>
                </button>
                <button className="bg-[#1e3a5f] text-white text-sm font-semibold px-5 py-2 rounded border border-[#60a5fa]/40">
                  <a href="#contact">Visítanos</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
