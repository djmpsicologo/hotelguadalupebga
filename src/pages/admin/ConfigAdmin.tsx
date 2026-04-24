import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Globe } from 'lucide-react';

const ConfigAdmin: React.FC = () => {
  const [formValues, setFormValues] = useState({
    businessName: 'Hotel Guadalupe Bucaramanga',
    taxId: '900.XXX.XXX-X',
    phone: '+57 3XX XXX XXXX',
    address: 'Calle XX # XX - XX, Bucaramanga',
  });
  const [, setIsDirty] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    setIsDirty(true);
    setSaveMessage('');
  };

  const handleSave = () => {
    setIsDirty(false);
    setSaveMessage('Cambios guardados correctamente.');
    console.log('Configuración guardada:', formValues);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-accent-primary drop-shadow-[0_2px_20px_rgba(212,175,55,0.35)]">Configuración</h1>
          <p className="text-slate-500 mt-1">Administra los parámetros generales y la seguridad del sistema.</p>
          {saveMessage && <p className="mt-3 text-sm text-emerald-400">{saveMessage}</p>}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 bg-accent-primary text-black font-bold rounded-xl shadow-lg shadow-accent-primary/20 flex items-center gap-2 transition-all hover:bg-accent-secondary"
        >
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-accent-primary">
                <Globe size={20} />
              </div>
              <h3 className="text-xl font-bold">Información del Hotel</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre Comercial</label>
                <input 
                  type="text" 
                  value={formValues.businessName}
                  onChange={handleInputChange('businessName')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nit / Identificación</label>
                <input 
                  type="text" 
                  value={formValues.taxId}
                  onChange={handleInputChange('taxId')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Teléfono de Contacto</label>
                <input 
                  type="text" 
                  value={formValues.phone}
                  onChange={handleInputChange('phone')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dirección Física</label>
                <input 
                  type="text" 
                  value={formValues.address}
                  onChange={handleInputChange('address')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all"
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
                  <div className="w-12 h-6 bg-accent-primary/20 rounded-full relative cursor-pointer border border-accent-primary/30">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-accent-primary rounded-full" />
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
            <div className="p-3 bg-accent-primary/10 border border-accent-primary/20 rounded-xl flex items-center gap-3 text-accent-primary">
              <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase">Estado: Saludable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAdmin;
