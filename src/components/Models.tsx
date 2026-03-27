import { useEffect, useState } from 'react';
import { getMotos, Moto } from '../utils/storage';
import { X, Calendar, MessageCircle } from 'lucide-react';

export default function Models() {
  const [models, setModels] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el Modal
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      const data = await getMotos();
      setModels(data);
      setLoading(false);
    };
    
    fetchModels();
  }, []);

  const handleOpenDetails = (moto: Moto) => {
    setSelectedMoto(moto);
    setShowForm(false);
    setCustomerName('');
    setCustomerPhone('');
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMoto) return;
    
    const numeroWhatsApp = "51920426213";
    const mensaje = `¡Hola! Mi nombre es ${customerName}. Estoy muy interesado(a) en separar el modelo *${selectedMoto.name}*. Por favor bríndeme los medios de pago para realizar la separación oportuna.`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Cerrar modal
    setSelectedMoto(null);
  };

  return (
    <section
      id="modelos"
      className="relative py-16 md:py-24"
      style={{
        backgroundImage: "url('/images/models-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 bg-white px-6 py-2 tracking-tight shadow-sm">
            NUESTROS MODELOS AVENTURA
          </h2>
        </div>

        {loading ? (
           <div className="flex justify-center my-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>
        ) : models.length === 0 ? (
           <div className="text-center text-gray-600 font-bold bg-white/90 p-8 rounded-lg shadow-sm border border-gray-200">
             No hay modelos disponibles por el momento.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-white border text-left border-gray-200 rounded-sm shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col hover:-translate-y-1"
              >
                <div className="overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 font-sans tracking-tight uppercase">
                      {model.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Cilindrada: <span className="text-gray-900">{model.cilindrada}</span>
                    </p>
                    <p className="text-gray-600 text-sm font-medium mb-6">
                      Peso: <span className="text-gray-900">{model.peso}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleOpenDetails(model)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-black text-sm px-6 py-3 transition-colors tracking-widest w-full uppercase shadow-sm mt-auto"
                  >
                    VER DETALLES
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE DETALLES Y WHATSAPP */}
      {selectedMoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedMoto(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 md:bg-gray-100 p-2 rounded-full text-gray-800 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mitad Izquierda: Imagen */}
            <div className="w-full md:w-1/2 bg-gray-100 relative">
              <img 
                src={selectedMoto.image} 
                alt={selectedMoto.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Mitad Derecha: Contenido */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              {!showForm ? (
                <>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase leading-tight">
                    {selectedMoto.name}
                  </h3>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-semibold">Cilindrada</span>
                      <span className="text-gray-900 font-bold">{selectedMoto.cilindrada}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500 font-semibold">Peso</span>
                      <span className="text-gray-900 font-bold">{selectedMoto.peso}</span>
                    </div>
                    {selectedMoto.caracteristicas && selectedMoto.caracteristicas.map((carac, idx) => (
                       <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                         <span className="text-gray-500 font-semibold">{carac.name}</span>
                         <span className="text-gray-900 font-bold text-right ml-4 text-sm break-words">{carac.value}</span>
                       </div>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    ¡Excelente elección! Puedes reservar este modelo ahora mismo haciendo un pago de separación. Un asesor te guiará en el proceso.
                  </p>

                  <button 
                    onClick={() => setShowForm(true)}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide text-sm"
                  >
                    <Calendar className="w-5 h-5" />
                    Separar Modelo
                  </button>
                </>
              ) : (
                <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                  <h4 className="text-lg font-black text-gray-900 mb-2">Datos para Separación</h4>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tu Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ej. 999 888 777"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase shadow-md mt-4 text-sm tracking-wide"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contactar por WhatsApp
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full text-center text-gray-500 hover:text-gray-800 text-sm font-bold mt-2"
                  >
                    Volver a los detalles
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}