import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BedDouble, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { 
    label: 'Ocupación', 
    value: '84%', 
    change: '+12%', 
    type: 'up', 
    icon: <BedDouble className="text-blue-500" />,
    desc: 'Porcentaje de habitaciones ocupadas hoy.'
  },
  { 
    label: 'Ingresos Totales', 
    value: '$ 1.245.000', 
    change: '+8%', 
    type: 'up', 
    icon: <DollarSign className="text-accent-primary" />,
    desc: 'Ingresos generados por reservaciones hoy.'
  },
  { 
    label: 'ADR (Tarifa Prom.)', 
    value: '$ 115.000', 
    change: '-2%', 
    type: 'down', 
    icon: <TrendingUp className="text-orange-500" />,
    desc: 'Precio promedio cobrado por cada habitación ocupada.'
  },
  { 
    label: 'RevPAR', 
    value: '$ 96.000', 
    change: '+5%', 
    type: 'up', 
    icon: <Users className="text-purple-500" />,
    desc: 'Ingreso promedio por cada habitación disponible (éxito total).'
  },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resumen de Hoy</h1>
          <p className="text-slate-500 mt-1">Aquí tienes lo que está pasando en el hotel hoy, 16 de Abril.</p>
        </div>
        <button className="px-6 py-3 bg-accent-primary text-black font-bold rounded-xl shadow-lg shadow-accent-primary/20">
          Nueva Reserva
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.type === 'up' ? 'text-accent-primary' : 'text-orange-500'}`}>
                {stat.change}
                {stat.type === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-semibold">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] text-slate-600 mt-2 font-medium leading-tight">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 glass-panel p-8 min-h-[400px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold">Ingresos Semanales</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/20">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 60, 45, 90, 65, 80, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                  className="w-full bg-accent-primary/20 group-hover:bg-accent-primary/40 transition-all rounded-t-lg relative" 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white text-black text-[10px] font-bold px-2 py-1 rounded">
                    ${h * 150}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">Día {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass-panel p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Reservas Recientes</h3>
            <button className="text-accent-primary text-xs font-bold uppercase tracking-wider hover:underline">Ver todas</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Juan Perez', room: '102 - Estándar', date: '16 abr - 18 abr', status: 'In House' },
              { name: 'Maria Garcia', room: '204 - Superior', date: '17 abr - 20 abr', status: 'Check In' },
              { name: 'Carlos Rodriguez', room: '301 - Suite', date: '16 abr - 22 abr', status: 'Confirmed' },
              { name: 'Ana Martinez', room: '105 - Estándar', date: '18 abr - 20 abr', status: 'Pending' },
            ].map((booking, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs">
                    {booking.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold group-hover:text-accent-primary transition-colors">{booking.name}</p>
                    <p className="text-[10px] text-slate-500">{booking.room} • {booking.date}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  booking.status === 'In House' ? 'bg-emerald-500/20 text-emerald-400' :
                  booking.status === 'Check In' ? 'bg-accent-primary/20 text-accent-primary' :
                  'bg-white/10 text-slate-400'
                }`}>
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
