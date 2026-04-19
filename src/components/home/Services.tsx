import React from 'react';
import { Wifi, ShieldCheck, Tv, Wind, MapPin, BedDouble } from 'lucide-react';

const services = [
  { icon: <Wifi size={32} />, title: 'Internet Alta Velocidad', desc: 'Conectividad WiFi de fibra óptica en todas las áreas del hotel.' },
  { icon: <ShieldCheck size={32} />, title: 'Seguridad 24/7', desc: 'Personal de seguridad y circuito cerrado para tu tranquilidad.' },
  { icon: <Tv size={32} />, title: 'Smart TV & Streaming', desc: 'Televisión inteligente con acceso a tus plataformas favoritas.' },
  { icon: <Wind size={32} />, title: 'Aire Acondicionado', desc: 'Control de clima individual en cada habitación para tu confort.' },
  { icon: <MapPin size={32} />, title: 'Ubicación Central', desc: 'Estamos en el corazón de Bucaramanga, cerca a centros comerciales.' },
  { icon: <BedDouble size={32} />, title: 'Escritorio de Trabajo', desc: 'Espacio ideal para ejecutivos y viajeros que necesitan productividad.' },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-secondary/30 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent-primary font-bold uppercase tracking-[0.2em] text-xs">Comodidades</span>
          <h2 className="text-4xl font-bold mt-2">Servicios Premium</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Nos esforzamos por brindarte una experiencia inigualable con servicios diseñados para tu confort y productividad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent-primary/10 group-hover:text-accent-primary transition-all border border-white/5 group-hover:border-accent-primary/20">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
