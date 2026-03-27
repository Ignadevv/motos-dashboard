export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
            AVENTURA<br />SIN LÍMITES
          </h1>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent py-4 px-6 flex items-center justify-between">
        <span className="text-white/70 text-sm font-light">Canon EOS-1D X Mark III</span>
        <svg className="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
        </svg>
      </div>
    </section>
  );
}
