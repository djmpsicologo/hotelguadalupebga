import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  History,
  MoreVertical,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useReservations } from '../../hooks/useReservations';

interface Guest {
  name: string;
  email: string;
  phone: string;
  reservationsCount: number;
  lastStay: string;
  totalSpent: number;
  status: 'VIP' | 'Regular' | 'Nuevo';
}

const GuestsAdmin: React.FC = () => {
  const { reservations, loading, error } = useReservations();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique guests from reservations
  const guestsMap = new Map<string, Guest>();

  reservations.forEach(res => {
    const key = res.guestEmail || res.guestName;
    if (guestsMap.has(key)) {
      const existing = guestsMap.get(key)!;
      existing.reservationsCount += 1;
      existing.totalSpent += res.total;
      // Update last stay if this one is more recent
      if (new Date(res.checkIn) > new Date(existing.lastStay)) {
        existing.lastStay = res.checkIn;
      }
    } else {
      guestsMap.set(key, {
        name: res.guestName,
        email: res.guestEmail || 'No registrado',
        phone: res.guestPhone || 'No registrado',
        reservationsCount: 1,
        lastStay: res.checkIn,
        totalSpent: res.total,
        status: 'Nuevo'
      });
    }
  });

  const guests = Array.from(guestsMap.values()).map(guest => ({
    ...guest,
    status: guest.reservationsCount > 3 ? 'VIP' : guest.reservationsCount > 1 ? 'Regular' : 'Nuevo'
  }));

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={40} className="animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-red-500">
        <AlertCircle size={48} />
        <p className="mt-4 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Directorio de Huéspedes</h1>
          <p className="text-slate-500 mt-1">Gestiona la base de datos de tus clientes y su historial.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <Users size={18} className="text-teal-500" />
            <span className="text-sm font-bold">{guests.length} Huéspedes</span>
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-white/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
                <th className="px-8 py-5">Huésped</th>
                <th className="px-8 py-5">Contacto</th>
                <th className="px-8 py-5">Estadísticas</th>
                <th className="px-8 py-5">Última Estancia</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredGuests.map((guest, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold border border-teal-500/20">
                        {guest.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{guest.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase">Cliente #{Math.floor(Math.random() * 9000) + 1000}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={12} />
                        <span>{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Phone size={12} />
                        <span>{guest.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <History size={12} className="text-teal-500" />
                        <span>{guest.reservationsCount} Reservas</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">${guest.totalSpent.toLocaleString()} Total</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Calendar size={14} />
                      <span>{guest.lastStay}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      guest.status === 'VIP' ? 'border-gold-accent text-gold-accent bg-gold-accent/5' :
                      guest.status === 'Regular' ? 'border-teal-500/50 text-teal-500' :
                      'border-slate-500/50 text-slate-400'
                    }`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-slate-500">
                    No se encontraron huéspedes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuestsAdmin;
