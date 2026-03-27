const features = [
  {
    label: 'CARACTERÍSTICA DESTACADA',
    title: 'SUSPENSIÓN DE ALTO\nRENDIMIENTO',
    icon: (
      <svg className="w-10 h-10 text-gray-800" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 4v8M24 36v8M20 12l-4 24M28 12l4 24M16 16c0 0-4 8-4 20M32 16c0 0 4 8 4 20M18 14h12M16 36h16" />
        <circle cx="24" cy="8" r="3" fill="currentColor" />
        <circle cx="24" cy="40" r="3" fill="currentColor" />
      </svg>
    ),
    position: 'left-top',
  },
  {
    label: 'CARACTERÍSTICA DESTACADA',
    title: 'MOTOR BICILÍNDRICO\nDE PAR ALTO',
    icon: (
      <svg className="w-10 h-10 text-gray-800" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="16" cy="24" r="8" />
        <circle cx="32" cy="24" r="8" />
        <path d="M16 16v-4h16v4M16 32v4h16v-4" />
        <circle cx="16" cy="24" r="3" fill="currentColor" />
        <circle cx="32" cy="24" r="3" fill="currentColor" />
        <path d="M8 20h-4M8 28h-4M40 20h4M40 28h4" />
      </svg>
    ),
    position: 'left-bottom',
  },
  {
    label: 'CARACTERÍSTICA DESTACADA',
    title: 'SISTEMA DE\nFRENADO AVANZADO',
    icon: (
      <svg className="w-10 h-10 text-gray-800" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="10" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" />
      </svg>
    ),
    position: 'right-top',
  },
  {
    label: 'CARACTERÍSTICA DESTACADA',
    title: 'CHASIS LIGERO\nY RESISTENTE',
    icon: (
      <svg className="w-10 h-10 text-gray-800" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 36L24 8l12 28" />
        <path d="M16 28h16" />
        <path d="M18 22h12" />
        <path d="M8 36h32" />
        <path d="M24 8l8 14M24 8l-8 14" />
      </svg>
    ),
    position: 'right-bottom',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/features-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gray-900/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout: Features around center motorcycle */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 items-center min-h-[500px]">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              {features.filter(f => f.position.startsWith('left')).map((feature, i) => (
                <div key={i} className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-5">
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase bg-white px-2 py-1 inline-block mb-3">
                    {feature.label}
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <h3 className="text-lg font-extrabold text-gray-900 leading-tight whitespace-pre-line">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Center motorcycle */}
            <div className="flex justify-center">
              <img
                src="/images/features-bg.jpg"
                alt="Motorcycle features"
                className="max-h-[450px] object-contain drop-shadow-2xl rounded-lg"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {features.filter(f => f.position.startsWith('right')).map((feature, i) => (
                <div key={i} className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-5">
                  <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase bg-white px-2 py-1 inline-block mb-3">
                    {feature.label}
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <h3 className="text-lg font-extrabold text-gray-900 leading-tight whitespace-pre-line">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout: stacked cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-5">
              <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase bg-white px-2 py-1 inline-block mb-3">
                {feature.label}
              </span>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                <h3 className="text-base font-extrabold text-gray-900 leading-tight whitespace-pre-line">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom title */}
        <div className="text-center mt-12 md:mt-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
            INGENIERÍA PARA LA AVENTURA
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            Detalles técnicos que marcan la diferencia.
          </p>
        </div>

        {/* Decorative star */}
        <div className="flex justify-end mt-6">
          <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
