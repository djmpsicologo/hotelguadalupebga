import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import { useReservations } from '../../hooks/useReservations';
import type { Reservation, ReservationStatus } from '../../hooks/useReservations';
import { useRooms } from '../../hooks/useRooms';

interface ReservationFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: ReservationStatus;
  specialRequests: string;
}

const statusLabels: Record<ReservationStatus | 'All', string> = {
  'All': 'Todas',
  'In House': 'En Estancia',
  'Confirmed': 'Confirmada',
  'Pending': 'Pendiente',
  'Cancelled': 'Cancelada',
  'Checked Out': 'Check Out'
};

const BookingsAdmin: React.FC = () => {
  const { reservations, loading, error, addReservation, updateReservation, deleteReservation, updateReservationStatus } = useReservations();
  const { rooms } = useRooms();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'All'>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    status: 'Confirmed',
    specialRequests: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         res.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRoomPrice = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    return room?.price || 180000;
  };

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomId) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const pricePerNight = getRoomPrice(formData.roomId);
    
    return nights * pricePerNight;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      const room = rooms.find(r => r.id === formData.roomId);
      const total = calculateTotal();
      
      const reservationData = {
        ...formData,
        roomNumber: room?.name || 'Desconocida',
        total
      };
      
      if (editingReservation) {
        await updateReservation(editingReservation.id, reservationData);
      } else {
        await addReservation(reservationData);
      }
      
      setShowModal(false);
      setEditingReservation(null);
      resetForm();
    } catch (err) {
      console.error('Error saving reservation:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      status: 'Confirmed',
      specialRequests: ''
    });
  };

  const handleEdit = (reservation: Reservation) => {
    const room = rooms.find(r => r.name === reservation.roomNumber);
    setEditingReservation(reservation);
    setFormData({
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail || '',
      guestPhone: reservation.guestPhone || '',
      roomId: room?.id || '',
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      adults: reservation.adults,
      children: reservation.children,
      status: reservation.status,
      specialRequests: reservation.specialRequests || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    setDeleteLoading(id);
    try {
      await deleteReservation(id);
    } catch (err) {
      console.error('Error deleting reservation:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddNew = () => {
    setEditingReservation(null);
    resetForm();
    setShowModal(true);
  };

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    try {
      await updateReservationStatus(id, newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

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
          <h1 className="text-3xl font-bold">Registro de Reservas</h1>
          <p className="text-slate-500 mt-1">Monitorea y gestiona todas las estancias activas y futuras.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
            Exportar
          </button>
          <button 
            onClick={handleAddNew}
            className="px-6 py-3 bg-teal-500 text-black font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Reserva
          </button>
        </div>
      </div>

      <div className="glass-panel">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(statusLabels) as Array<ReservationStatus | 'All'>).map((status) => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  statusFilter === status ? 'bg-teal-500 text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Buscar huésped o habitación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
            <div className="flex items-center bg-white/5 rounded-lg px-2 py-1">
              <button className="p-1 hover:text-teal-400"><ChevronLeft size={18} /></button>
              <span className="text-xs font-bold px-2">Abril 2026</span>
              <button className="p-1 hover:text-teal-400"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
                <th className="px-8 py-5">Huésped / ID</th>
                <th className="px-8 py-5">Habitación</th>
                <th className="px-8 py-5">Estancia</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs border border-teal-500/20">
                        {res.guestName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold">{res.guestName}</p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase">{res.id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-semibold">{res.roomNumber}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={14} />
                      <span className="text-xs font-medium">{res.checkIn} - {res.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <select
                      value={res.status}
                      onChange={(e) => handleStatusChange(res.id, e.target.value as ReservationStatus)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-transparent border cursor-pointer ${
                        res.status === 'In House' ? 'border-teal-500/50 text-teal-500' :
                        res.status === 'Confirmed' ? 'border-blue-500/50 text-blue-400' :
                        res.status === 'Pending' ? 'border-orange-500/50 text-orange-400' :
                        res.status === 'Checked Out' ? 'border-slate-500/50 text-slate-400' :
                        'border-red-500/50 text-red-400'
                      }`}
                    >
                      <option value="Pending">Pendiente</option>
                      <option value="Confirmed">Confirmada</option>
                      <option value="In House">En Estancia</option>
                      <option value="Checked Out">Check Out</option>
                      <option value="Cancelled">Cancelada</option>
                    </select>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold">${res.total.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(res)}
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(res.id)}
                        disabled={deleteLoading === res.id}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all disabled:opacity-50"
                      >
                        {deleteLoading === res.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-slate-500">
                    No se encontraron reservas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="glass-panel w-full max-w-2xl p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingReservation ? 'Editar Reserva' : 'Nueva Reserva'}
                  </h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Información del Huésped</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre Completo *</label>
                        <input
                          type="text"
                          value={formData.guestName}
                          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                          placeholder="Nombre del huésped"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.guestEmail}
                          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                          placeholder="correo@ejemplo.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={formData.guestPhone}
                          onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                          placeholder="+57 300 000 0000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Detalles de la Reserva</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Seleccionar Habitación *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {rooms.filter(r => r.status === 'Available' || r.id === formData.roomId).map(room => {
                            const isSelected = formData.roomId === room.id;
                            return (
                              <button
                                key={room.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, roomId: room.id })}
                                className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                                  isSelected 
                                  ? 'bg-teal-500/10 border-teal-500 shadow-lg shadow-teal-500/10' 
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                              >
                                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-teal-400' : 'text-slate-500'}`}>
                                  {room.type}
                                </span>
                                <span className="text-sm font-bold text-white mb-2">{room.name}</span>
                                <span className={`text-xs font-medium ${isSelected ? 'text-teal-500' : 'text-slate-400'}`}>
                                  ${room.price.toLocaleString()}
                                </span>
                                {isSelected && (
                                  <motion.div 
                                    layoutId="selectedArrow"
                                    className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2" 
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {!formData.roomId && (
                          <p className="text-[10px] text-red-400 font-bold uppercase mt-3 ml-1 animate-pulse">
                            Debes seleccionar una habitación para continuar
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Estado de la Reserva</label>
                        <div className="flex flex-wrap gap-2">
                          {(['Pending', 'Confirmed', 'In House', 'Checked Out', 'Cancelled'] as ReservationStatus[]).map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setFormData({ ...formData, status })}
                              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${
                                formData.status === status 
                                ? 'bg-teal-500 border-teal-500 text-black shadow-lg shadow-teal-500/20' 
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {statusLabels[status]}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Check In *</label>
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Check Out *</label>
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Adultos</label>
                        <input
                          type="number"
                          min={1}
                          max={4}
                          value={formData.adults}
                          onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Niños</label>
                        <input
                          type="number"
                          min={0}
                          max={2}
                          value={formData.children}
                          onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Peticiones Especiales</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all resize-none"
                      rows={3}
                      placeholder="Alguna petición especial..."
                    />
                  </div>

                  {/* Total */}
                  {formData.roomId && formData.checkIn && formData.checkOut && (
                    <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Estimado:</span>
                        <span className="text-2xl font-bold text-teal-500">${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitLoading || !formData.roomId}
                      className="flex-1 px-6 py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-all disabled:bg-slate-600"
                    >
                      {submitLoading ? (
                        <Loader2 size={20} className="animate-spin mx-auto" />
                      ) : (
                        editingReservation ? 'Guardar Cambios' : 'Crear Reserva'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsAdmin;
