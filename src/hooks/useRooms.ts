import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Room {
  id: string;
  name: string;
  type: 'Estándar' | 'Superior' | 'Suite';
  status: 'Available' | 'Occupied' | 'Maintenance';
  price: number;
  floor: string;
  description?: string;
  amenities?: string[];
  image?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener habitaciones en tiempo real
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'rooms'), orderBy('name'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const roomsData: Room[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Room[];
        setRooms(roomsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching rooms:', err);
        setError('Error al cargar las habitaciones');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Agregar habitación
  const addRoom = useCallback(async (roomData: Omit<Room, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        ...roomData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding room:', err);
      throw new Error('Error al agregar la habitación');
    }
  }, []);

  // Actualizar habitación
  const updateRoom = useCallback(async (id: string, roomData: Partial<Room>) => {
    try {
      const roomRef = doc(db, 'rooms', id);
      await updateDoc(roomRef, {
        ...roomData,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating room:', err);
      throw new Error('Error al actualizar la habitación');
    }
  }, []);

  // Eliminar habitación
  const deleteRoom = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'rooms', id));
    } catch (err) {
      console.error('Error deleting room:', err);
      throw new Error('Error al eliminar la habitación');
    }
  }, []);

  // Cambiar estado de habitación
  const toggleRoomStatus = useCallback(async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
    try {
      const roomRef = doc(db, 'rooms', id);
      await updateDoc(roomRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error toggling room status:', err);
      throw new Error('Error al cambiar el estado de la habitación');
    }
  }, []);

  return {
    rooms,
    loading,
    error,
    addRoom,
    updateRoom,
    deleteRoom,
    toggleRoomStatus
  };
};

export default useRooms;
