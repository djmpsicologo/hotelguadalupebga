import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Foreground Background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
          style={{ backgroundImage: "url('/assets/Fachada.jpg')" }}
        />
        {/* Softer, minimal overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-teal-500 text-teal-500" />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-teal-400">
                Experiencia 5 Estrellas
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1] tracking-tight text-white reveal-up">
              Tu Hogar Lejos <br /> 
              <span className="premium-gradient inline-block mt-2">de Casa</span>
            </h1>

            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl reveal-up anim-delay-200">
              Experimenta el lujo y la comodidad excepcional en el corazón de Bucaramanga. 
              Una fusión perfecta entre sofisticación y la cálida hospitalidad santandereana.
            </p>

            <div className="flex flex-wrap gap-5 reveal-up anim-delay-400">
              <button className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black rounded-2xl font-bold transition-all flex items-center gap-3 group shadow-2xl shadow-teal-500/20 active:scale-95">
                Explorar Habitaciones
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-md text-white active:scale-95">
                Nuestra Historia
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-1 opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Coordinates</span>
        <span className="text-sm font-medium">7.1193° N, 73.1227° W</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-teal-500/0 via-teal-500 to-teal-500/0" />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slowZoom 30s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default Hero;
