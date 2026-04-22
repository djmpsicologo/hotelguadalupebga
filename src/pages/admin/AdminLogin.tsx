import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Hotel, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error('Firebase Auth Error:', err.code, err.message);
      
      switch (err.code) {
        case 'auth/user-not-found':
          setError('El correo no está registrado como administrador.');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos fallidos. Intenta más tarde.');
          break;
        case 'auth/operation-not-allowed':
          setError('El inicio de sesión con email no está habilitado en Firebase.');
          break;
        case 'auth/invalid-credential':
          setError('Credenciales inválidas. Verifica tu email y contraseña.');
          break;
        default:
          setError('Error al iniciar sesión: ' + (err.message || 'Intenta de nuevo.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-md p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-accent-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent-primary/20">
            <Hotel className="text-black" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-accent-primary text-center drop-shadow-[0_2px_20px_rgba(212,175,55,0.35)]">Admin Portal</h1>
          <p className="text-slate-500 text-sm mt-2">Gestiona el Hotel Guadalupe BGA</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all font-medium"
                placeholder="admin@hotelguadalupe.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-primary transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent-primary hover:bg-accent-secondary disabled:bg-slate-600 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                Acceder al Panel
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest mt-10">
          Entorno Administrativo Seguro
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
