import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center group-hover:bg-teal-400 transition-colors">
            <Hotel className="text-black" size={24} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block leading-none">GUADALUPE</span>
            <span className="text-[10px] text-teal-500 tracking-[0.2em] font-medium uppercase">Hotel Bucaramanga</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-teal-400 transition-colors">Inicio</Link>
          <a href="#habitaciones" className="text-sm font-medium hover:text-teal-400 transition-colors">Habitaciones</a>
          <a href="#servicios" className="text-sm font-medium hover:text-teal-400 transition-colors">Servicios</a>
          <Link to="/admin/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all">Admin</Link>
          <button className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-black rounded-full text-sm font-semibold transition-all shadow-lg shadow-teal-500/20">
            Reserva Ahora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden"
        >
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Inicio</Link>
          <a href="#habitaciones" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Habitaciones</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Servicios</a>
          <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Admin</Link>
          <button className="w-full py-4 bg-teal-500 text-black rounded-xl font-bold">Reserva Ahora</button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
