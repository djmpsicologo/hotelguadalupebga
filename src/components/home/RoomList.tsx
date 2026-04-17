import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Tv, Coffee, Wind, Info, Loader2 } from 'lucide-react';
import { useRooms } from '../../hooks/useRooms';
import type { Room } from '../../hooks/useRooms';

const RoomList: React.FC = () => {
  const { rooms, loading, error } = useRooms();

  // Filtrar solo habitaciones disponibles para mostrar
  const availableRooms = rooms.filter(room => room.status === 'Available');

  const getAmenities = (room: Room) => {
    const amenities = [<Wifi size={14} />, <Tv size={14} />, <Wind size={14} />];
    if (room.type !== 'Estándar') {
      amenities.push(<Coffee size={14} />);
    }
    if (room.type === 'Suite') {
      amenities.push(<Info size={14} />);
    }
    return amenities;
  };

  const getTag = (type: string) => {
    switch (type) {
      case 'Estándar': return 'Popular';
      case 'Superior': return 'Recomendada';
      case 'Suite': return 'Lujo';
      default: return 'Disponible';
    }
  };

  if (loading) {
    return (
      <section id="habitaciones" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 size={40} className="animate-spin text-teal-500" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="habitaciones" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center text-red-500">
          <p>Error al cargar las habitaciones. Por favor intenta más tarde.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="habitaciones" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-teal-500 font-bold uppercase tracking-[0.2em] text-xs">Alojamiento</span>
          <h2 className="text-4xl font-bold mt-2">Nuestras Habitaciones</h2>
        </div>
        <button className="hidden md:block text-teal-400 font-semibold hover:underline">Ver todas</button>
      </div>

      {availableRooms.length === 0 ? (
        <div className="text-center text-slate-500 py-12">
          <p>No hay habitaciones disponibles en este momento.</p>
          <p className="text-sm mt-2">Por favor contacta con nosotros para más información.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {availableRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-5">
                <img 
                  src={room.image || `/assets/Hab${(index % 3) + 1}.jpg`} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback a imagen por defecto si falla
                    (e.target as HTMLImageElement).src = '/assets/Hab1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-teal-500 text-black text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {getTag(room.type)}
                </span>
                <div className="absolute bottom-6 left-6 flex gap-3 text-white/70">
                  {getAmenities(room).map((icon, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-teal-400 transition-colors uppercase tracking-tight">{room.name}</h3>
              <p className="text-sm text-slate-400 mb-2">{room.type}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-teal-500 font-bold text-lg">${room.price.toLocaleString()}</span>
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">/ noche</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomList;