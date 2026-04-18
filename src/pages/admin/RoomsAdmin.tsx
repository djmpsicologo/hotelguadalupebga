import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  CheckCircle2,
  XCircle,
  Loader2,
  Users,
  AlertCircle
} from 'lucide-react';
import { useRooms } from '../../hooks/useRooms';
import type { Room } from '../../hooks/useRooms';

interface RoomFormData {
  name: string;
  type: 'Estándar' | 'Superior' | 'Suite';
  status: 'Available' | 'Occupied' | 'Maintenance';
  price: number;
  floor: string;
  description: string;
}

const RoomsAdmin: React.FC = () => {
  const { rooms, loading, error, addRoom, updateRoom, deleteRoom } = useRooms();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<RoomFormData>({
    name: '',
    type: 'Estándar',
    status: 'Available',
    price: 180000,
    floor: '1',
    description: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, formData);
      } else {
        await addRoom(formData);
      }
      setShowModal(false);
      setEditingRoom(null);
      setFormData({
        name: '',
        type: 'Estándar',
        status: 'Available',
        price: 180000,
        floor: '1',
        description: ''
      });
    } catch (err) {
      console.error('Error saving room:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      status: room.status,
      price: room.price,
      floor: room.floor,
      description: room.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta habitación?')) return;
    setDeleteLoading(id);
    try {
      await deleteRoom(id);
    } catch (err) {
      console.error('Error deleting room:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAddNew = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      type: 'Estándar',
      status: 'Available',
      price: 180000,
      floor: '1',
      description: ''
    });
    setShowModal(true);
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
          <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
          <p className="text-slate-500 mt-1">Configura y monitorea el estado de todas las unidades.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="px-6 py-3 bg-teal-500 text-black font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center gap-2 hover:bg-teal-400 transition-all"
        >
          <Plus size={20} />
          Nueva Habitación
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-white/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Filter size={18} />
              Filtros
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
                <th className="px-8 py-5">Nombre / ID</th>
                <th className="px-8 py-5">Tipo</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5">Precio</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold">{room.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 uppercase font-medium">Planta {room.floor}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-slate-300 font-medium">{room.type}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {room.status === 'Available' ? (
                        <CheckCircle2 size={14} className="text-teal-500" />
                      ) : room.status === 'Occupied' ? (
                        <Users size={14} className="text-blue-500" />
                      ) : (
                        <XCircle size={14} className="text-orange-500" />
                      )}
                      <span className={`text-[10px] font-bold uppercase ${
                        room.status === 'Available' ? 'text-teal-500' :
                        room.status === 'Occupied' ? 'text-blue-500' :
                        'text-orange-500'
                      }`}>
                        {room.status === 'Available' ? 'Disponible' :
                         room.status === 'Occupied' ? 'Ocupada' : 'Mantenimiento'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold">${room.price.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(room)}
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(room.id)}
                        disabled={deleteLoading === room.id}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all disabled:opacity-50"
                      >
                        {deleteLoading === room.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                    No se encontraron habitaciones
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
              <div className="glass-panel w-full max-w-lg p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">
                  {editingRoom ? 'Editar Habitación' : 'Nueva Habitación'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                      placeholder="Ej: Habitación 101"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tipo de Habitación</label>
                      <div className="flex flex-wrap gap-2">
                        {(['Estándar', 'Superior', 'Suite'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, type })}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${
                              formData.type === type 
                              ? 'bg-teal-500 border-teal-500 text-black shadow-lg shadow-teal-500/20' 
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Estado Inicial</label>
                      <div className="flex flex-wrap gap-2">
                        {(['Available', 'Occupied', 'Maintenance'] as const).map((status) => (
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
                            {status === 'Available' ? 'Disponible' : status === 'Occupied' ? 'Ocupada' : 'Mantenimiento'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Precio por noche</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Piso</label>
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
                        placeholder="Ej: 1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Descripción</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-teal-500 transition-all resize-none"
                      rows={3}
                      placeholder="Descripción de la habitación..."
                    />
                  </div>

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
                      disabled={submitLoading}
                      className="flex-1 px-6 py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-all disabled:bg-slate-600"
                    >
                      {submitLoading ? (
                        <Loader2 size={20} className="animate-spin mx-auto" />
                      ) : (
                        editingRoom ? 'Guardar Cambios' : 'Crear Habitación'
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

export default RoomsAdmin;
