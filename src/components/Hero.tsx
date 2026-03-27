export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Dark Overlay con tinte azul marino */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/80 via-[#1e3a5f]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20">
          <p className="text-[#60a5fa] text-sm font-bold tracking-[0.3em] uppercase mb-4">GDN Motors · Trujillo, Perú</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
            TU MOTO<br /><span className="text-[#60a5fa]">IDEAL</span><br />TE ESPERA
          </h1>
          <p className="text-white/70 text-lg mt-6 max-w-md font-light">
            Encuentra el modelo que buscas en nuestra concesionaria. Calidad, precio y atención personalizada.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="#modelos" className="bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold px-8 py-3 rounded border border-[#60a5fa]/50 transition-colors">
              Ver Modelos
            </a>
            <a href="#contact" className="border border-white/60 text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors">
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a1628]/70 to-transparent py-4 px-6 flex items-center justify-between">
        <span className="text-white/60 text-sm font-light">Trujillo, La Libertad — Perú</span>
        <span className="text-[#60a5fa]/60 text-sm font-semibold tracking-widest">GDN MOTORS</span>
      </div>
    </section>
  );
}
