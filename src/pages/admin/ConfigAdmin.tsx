import React from 'react';
import { Settings, Save, Bell, Shield, Database, Globe } from 'lucide-react';

const ConfigAdmin: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-slate-500 mt-1">Administra los parámetros generales y la seguridad del sistema.</p>
        </div>
        <button className="px-6 py-3 bg-teal-500 text-black font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center gap-2 hover:bg-teal-400 transition-all">
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-teal-500">
                <Globe size={20} />
              </div>
              <h3 className="text-xl font-bold">Información del Hotel</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre Comercial</label>
                <input 
                  type="text" 
                  defaultValue="Hotel Guadalupe Bucaramanga"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nit / Identificación</label>
                <input 
                  type="text" 
                  defaultValue="900.XXX.XXX-X"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Teléfono de Contacto</label>
                <input 
                  type="text" 
                  defaultValue="+57 3XX XXX XXXX"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dirección Física</label>
                <input 
                  type="text" 
                  defaultValue="Calle XX # XX - XX, Bucaramanga"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-blue-500">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold">Notificaciones En Tiempo Real</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Nuevas Reservas', desc: 'Recibir alertas cuando un cliente reserve desde la web.' },
                { label: 'Check-outs Pendientes', desc: 'Notificar 1 hora antes de la hora límite de salida.' },
                { label: 'Alertas de Stock', desc: 'Avisar cuando queden pocas habitaciones disponibles.' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-teal-500/20 rounded-full relative cursor-pointer border border-teal-500/30">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-teal-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-orange-500">
                <Shield size={20} />
              </div>
              <h3 className="text-xl font-bold">Seguridad</h3>
            </div>
            <div className="space-y-6">
              <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Cambiar Contraseña
              </button>
              <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Gestionar Accesos
              </button>
            </div>
          </div>

          <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-purple-500">
                <Database size={20} />
              </div>
              <h3 className="text-xl font-bold">Base de Datos</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Tu base de datos está conectada a **Firebase Cloud**. Se realizan respaldos automáticos cada 24 horas.
            </p>
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-3 text-teal-400">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase">Estado: Saludable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAdmin;
