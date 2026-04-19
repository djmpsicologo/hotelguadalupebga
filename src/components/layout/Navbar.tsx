import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Habitaciones', href: '#habitaciones' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled 
        ? 'py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
        : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-5 group">
          <div className="w-16 h-16 rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-500 shadow-xl shadow-accent-primary/20 border border-white/10">
            <img src="/assets/hotel_logo.png" alt="Hotel Guadalupe Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-[0.05em] leading-tight text-white">GUADALUPE</span>
            <span className="text-2xl font-bold text-accent-primary tracking-[0.1em] leading-tight uppercase">BGA</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[13px] font-bold uppercase tracking-widest text-slate-300 hover:text-accent-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="h-4 w-px bg-white/10 mx-2" />
          
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Admin
            </Link>
            <button className="px-7 py-3 bg-accent-primary hover:bg-accent-secondary text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent-primary/10 hover:shadow-accent-primary/20 hover:-translate-y-0.5">
              Reserva Ahora
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0c] border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight text-white hover:text-accent-primary"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-white/5 my-4" />
              <button className="w-full py-5 bg-accent-primary text-black rounded-2xl font-bold uppercase tracking-widest text-sm">
                Reserva Ahora
              </button>
              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
                <Phone size={14} />
                <span>+57 300 000 0000</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
