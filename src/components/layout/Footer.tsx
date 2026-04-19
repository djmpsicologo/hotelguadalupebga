import React from 'react';
import { Hotel, MapPin, Phone, Mail, Globe, MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center">
                <Hotel className="text-black" size={24} />
              </div>
              <span className="text-xl font-bold">GUADALUPE</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Tu refugio de elegancia y confort en Bucaramanga. Ofrecemos una experiencia única que combina modernidad y calidez.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all"><MessageCircle size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all"><Heart size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-accent-primary transition-colors">Habitaciones</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Servicios</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Restaurante</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-primary shrink-0" />
                <span>Carrera 15 # 56-31, Bucaramanga, Santander</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent-primary shrink-0" />
                <span>+57 (607) 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent-primary shrink-0" />
                <span>contacto@hotelguadalupe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-4">Suscríbete para recibir ofertas exclusivas y novedades.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary/50 transition-all"
              />
              <button className="w-full py-4 bg-accent-primary text-black font-bold rounded-xl hover:bg-accent-secondary transition-all">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-600">© 2026 Hotel Guadalupe BGA. Todos los derechos reservados.</p>
          <div className="flex gap-8 text-[10px] text-slate-600 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
