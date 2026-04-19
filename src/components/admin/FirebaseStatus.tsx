import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { Database } from 'lucide-react';

const FirebaseStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    // Escuchamos una colección pequeña (o inexistente) para verificar la sincronización
    const q = query(collection(db, '_health_check'), limit(1));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const isFromCache = snapshot.metadata.fromCache;
        if (!isFromCache) {
          setStatus('online');
          setLatency(Date.now() - startTime);
        } else {
          // Si los datos vienen del cache, podría estar offline o simplemente no haber cambios
          // Pero onSnapshot suele disparar rápidamente con cache y luego con servidor
          setStatus('online'); // En Firestore, 'fromCache' true no siempre significa offline
        }
      },
      (error) => {
        console.error("Firebase Status Error:", error);
        setStatus('offline');
      }
    );

    // Verificación adicional de red del navegador
    const handleOnline = () => setStatus('checking');
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 transition-all hover:bg-white/10 group">
      <div className="relative">
        {status === 'online' ? (
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] anim-pulse" />
        ) : status === 'offline' ? (
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        ) : (
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
        )}
      </div>
      
      <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
        {status === 'online' ? (
          <>
            <span className="text-emerald-400">DB Online</span>
            {latency && <span className="text-slate-500 font-normal">({latency}ms)</span>}
          </>
        ) : status === 'offline' ? (
          <span className="text-red-400">DB Offline</span>
        ) : (
          <span className="text-amber-400">Conectando...</span>
        )}
      </span>
      
      <div className="hidden group-hover:flex items-center gap-1 ml-1 text-slate-500 transition-opacity">
        <Database size={10} />
      </div>
    </div>
  );
};

export default FirebaseStatus;
