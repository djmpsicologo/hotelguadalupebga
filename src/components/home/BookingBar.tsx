import React from 'react';
import { Calendar, Users, Search } from 'lucide-react';

const BookingBar: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="glass-panel p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Check In */}
          <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer">
            <Calendar className="text-teal-500" size={20} />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Check In</p>
              <p className="text-sm font-semibold">Seleccionar fecha</p>
            </div>
          </div>

          {/* Check Out */}
          <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer border-t md:border-t-0 md:border-l border-white/5">
            <Calendar className="text-teal-500" size={20} />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Check Out</p>
              <p className="text-sm font-semibold">Seleccionar fecha</p>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 rounded-xl transition-colors group cursor-pointer border-t md:border-t-0 md:border-l border-white/5">
            <Users className="text-teal-500" size={20} />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Huéspedes</p>
              <p className="text-sm font-semibold">2 Adultos, 0 Niños</p>
            </div>
          </div>
        </div>

        <button className="w-full md:w-auto px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-3">
          <Search size={20} />
          Buscar Disponibilidad
        </button>
      </div>
    </div>
  );
};

export default BookingBar;
