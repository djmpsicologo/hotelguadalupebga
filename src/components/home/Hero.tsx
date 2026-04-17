import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: "url('/assets/Fachada.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-teal-500/30">
            Descubre la Elegancia en el Corazón de Bucaramanga
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
            Tu Hogar Lejos <br /> 
            <span className="gradient-text">de Casa</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
            Experimenta el lujo y la comodidad excepcional en el Hotel Guadalupe. Una fusión perfecta entre modernidad y la cálida hospitalidad santandereana.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black rounded-xl font-bold transition-all flex items-center gap-2 group shadow-xl shadow-teal-500/20">
              Ver Habitaciones
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all backdrop-blur-sm">
              Nuestros Servicios
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
