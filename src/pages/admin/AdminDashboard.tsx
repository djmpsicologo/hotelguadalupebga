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
import GuestsAdmin from './GuestsAdmin';
import ConfigAdmin from './ConfigAdmin';
import FirebaseStatus from '../../components/admin/FirebaseStatus';

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
            <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center">
              <Hotel className="text-black" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">GUADALUPE</h2>
              <span className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">Admin Panel</span>
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
                  ? 'bg-accent-primary text-black shadow-lg shadow-accent-primary/10' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-black' : 'group-hover:text-accent-primary'} transition-colors`}>
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
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img src="/icon-192.png" alt="Logo" className="w-10 h-10 rounded-lg shadow-sm" />
              <div className="hidden md:block">
                <h1 className="text-sm font-bold text-slate-900 leading-none">GUADALUPE</h1>
                <span className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">Bucaramanga</span>
              </div>
            </div>

            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar reservas, huéspedes..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:border-accent-primary focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <FirebaseStatus />
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all text-slate-500">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent-primary rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Admin Usuario</p>
                <p className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">General Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary border-2 border-white shadow-sm flex items-center justify-center font-bold text-black text-sm">
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
            <Route path="huespedes" element={<GuestsAdmin />} />
            <Route path="configuracion" element={<ConfigAdmin />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
