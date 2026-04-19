import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Tv, Coffee, Wind, Info, Loader2, Star, Sparkles, X, Maximize2 } from 'lucide-react';
import { useRooms } from '../../hooks/useRooms';
import type { Room } from '../../hooks/useRooms';

const RoomList: React.FC = () => {
  const { rooms, loading, error } = useRooms();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filtrar solo habitaciones disponibles para mostrar
  const availableRooms = rooms.filter(room => room.status === 'Available');

  const getAmenities = (room: Room) => {
    const amenities = [<Wifi size={16} />, <Tv size={16} />, <Wind size={16} />];
    if (room.type !== 'Estándar') {
      amenities.push(<Coffee size={16} />);
    }
    if (room.type === 'Suite') {
      amenities.push(<Sparkles size={16} />);
    }
    return amenities;
  };

  const getTag = (type: string) => {
    switch (type) {
      case 'Estándar': return 'Acogedora';
      case 'Superior': return 'Recomendada';
      case 'Suite': return 'Experiencia de Lujo';
      default: return 'Disponible';
    }
  };

  if (loading) {
    return (
      <section id="habitaciones" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center h-96 gap-6">
          <Loader2 size={48} className="animate-spin text-teal-500" />
          <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">Preparando Experiencia...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="habitaciones" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center p-12 glass-effect rounded-3xl border-red-500/20">
          <p className="text-red-400 font-medium italic">Error al conectar con la galería. Por favor intenta más tarde.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="habitaciones" className="pb-32 max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-teal-500" />
            <span className="text-teal-500 font-bold uppercase tracking-[0.4em] text-[10px]">Alojamiento Exclusivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Nuestras Habitaciones</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Cada espacio ha sido diseñado meticulosamente para ofrecer un refugio de paz y sofisticación, fusionando el confort moderno con toques locales.
          </p>
        </div>
        <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all">
          Ver Todo el Catálogo
        </button>
      </div>

      {availableRooms.length === 0 ? (
        <div className="text-center py-20 glass-effect rounded-[3rem] border-white/5">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="text-slate-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 italic">Sin disponibilidad inmediata</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Todas nuestras habitaciones están reservadas. Por favor, contáctanos directamente para listas de espera o futuras fechas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {availableRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div 
                className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl transition-all duration-700 group-hover:-translate-y-2 cursor-zoom-in"
                onClick={() => setSelectedImage(room.image || `/assets/Hab${(index % 3) + 1}.jpg`)}
              >
                <img 
                  src={room.image || `/assets/Hab${(index % 3) + 1}.jpg`} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/Hab1.jpg';
                  }}
                />
                
                {/* Overlay Layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Zoom Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Maximize2 size={24} className="text-white" />
                  </div>
                </div>

                {/* Tags & Metadata */}
                <div className="absolute top-6 right-6">
                  <span className="px-5 py-2 glass-effect text-white text-[9px] font-bold rounded-full uppercase tracking-[0.2em] shadow-lg">
                    {getTag(room.type)}
                  </span>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex gap-3 mb-6">
                    {getAmenities(room).map((icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 text-white/90 group-hover:bg-teal-500 group-hover:text-black transition-all duration-300">
                        {icon}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{room.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <span>{room.type}</span>
                        {room.type === 'Suite' && <Star size={10} className="fill-gold-accent text-gold-accent" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 flex justify-between items-baseline">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Inversión Noche</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white font-bold text-2xl">${room.price.toLocaleString()}</span>
                    <span className="text-teal-500/60 font-bold text-xs">COP</span>
                  </div>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/btn">
                  Detalles
                  <div className="w-6 h-px bg-teal-400 group-hover/btn:w-10 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox / Pop-up Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-[100] cursor-zoom-out flex items-center justify-center p-4 md:p-12"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[110]"
              >
                <X size={24} />
              </button>
              
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={selectedImage}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RoomList;