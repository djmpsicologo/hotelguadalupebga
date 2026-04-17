import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  BedDouble, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut, 
  Hotel,
  Bell,
  Search
} from 'lucide-react';
import Overview from '../../components/admin/Overview';
import RoomsAdmin from './RoomsAdmin';
import BookingsAdmin from './BookingsAdmin';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const navItems = [
    { icon: <BarChart3 size={20} />, label: 'Panel de Control', path: '/admin' },
    { icon: <BedDouble size={20} />, label: 'Habitaciones', path: '/admin/habitaciones' },
    { icon: <CalendarCheck size={20} />, label: 'Reservas', path: '/admin/reservas' },
    { icon: <Users size={20} />, label: 'Huéspedes', path: '/admin/huespedes' },
    { icon: <Settings size={20} />, label: 'Configuración', path: '/admin/configuracion' },
  ];

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-bg-secondary border-r border-white/5 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <Hotel className="text-black" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">GUADALUPE</h2>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Admin Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive 
                  ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/10' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-black' : 'group-hover:text-teal-400'} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-bg-secondary/50 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar reservas, huéspedes..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-white/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all text-slate-400">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full border-2 border-bg-secondary" />
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Admin Usuario</p>
                <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">General Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 border-2 border-white/10 flex items-center justify-center font-bold text-black text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="habitaciones" element={<RoomsAdmin />} />
            <Route path="reservas" element={<BookingsAdmin />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
