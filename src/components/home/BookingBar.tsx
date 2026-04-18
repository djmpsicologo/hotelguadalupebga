import React from 'react';
import { Calendar, Users, Search, ChevronDown } from 'lucide-react';

const BookingBar: React.FC = () => {
  return (
    <div className="relative z-30 max-w-6xl mx-auto px-6 -mt-16 md:-mt-20">
      <div className="glass-effect rounded-[2rem] p-4 md:p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 items-center">
          
          {/* Check In */}
          <div className="flex flex-col px-6 md:border-r border-white/10 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar size={14} className="text-teal-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors">Check In</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">18 Abr, 2026</span>
              <ChevronDown size={14} className="text-slate-600" />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col px-6 md:border-r border-white/10 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar size={14} className="text-teal-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors">Check Out</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">20 Abr, 2026</span>
              <ChevronDown size={14} className="text-slate-600" />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col px-6 group cursor-pointer">
            <div className="flex items-center gap-2 mb-1.5">
              <Users size={14} className="text-teal-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors">Huéspedes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">2 Adultos, 0 Niños</span>
              <ChevronDown size={14} className="text-slate-600" />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end px-2">
            <button className="w-full md:w-auto px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-teal-500/20 active:scale-95 group">
              <Search size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-widest text-xs">Buscar Disponibilidad</span>
            </button>
          </div>

        </div>
      </div>
      
      {/* Decorative Shadow Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-full bg-teal-500/5 blur-[120px] -z-10" />
    </div>
  );
};

export default BookingBar;
