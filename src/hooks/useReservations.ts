import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc, 
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

export type ReservationStatus = 'In House' | 'Confirmed' | 'Pending' | 'Cancelled' | 'Checked Out';

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  roomId: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  total: number;
  adults: number;
  children: number;
  specialRequests?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener reservas en tiempo real
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reservationsData: Reservation[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Reservation[];
        setReservations(reservationsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching reservations:', err);
        setError('Error al cargar las reservas');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Agregar reserva
  const addReservation = useCallback(async (reservationData: Omit<Reservation, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'reservations'), {
        ...reservationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding reservation:', err);
      throw new Error('Error al agregar la reserva');
    }
  }, []);

  // Actualizar reserva
  const updateReservation = useCallback(async (id: string, reservationData: Partial<Reservation>) => {
    try {
      const reservationRef = doc(db, 'reservations', id);
      await updateDoc(reservationRef, {
        ...reservationData,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating reservation:', err);
      throw new Error('Error al actualizar la reserva');
    }
  }, []);

  // Eliminar reserva
  const deleteReservation = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (err) {
      console.error('Error deleting reservation:', err);
      throw new Error('Error al eliminar la reserva');
    }
  }, []);

  // Cambiar estado de reserva
  const updateReservationStatus = useCallback(async (id: string, newStatus: ReservationStatus) => {
    try {
      const reservationRef = doc(db, 'reservations', id);
      await updateDoc(reservationRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating reservation status:', err);
      throw new Error('Error al actualizar el estado de la reserva');
    }
  }, []);

  // Filtrar reservas por estado
  const getReservationsByStatus = useCallback((status: ReservationStatus | 'All') => {
    if (status === 'All') return reservations;
    return reservations.filter(r => r.status === status);
  }, [reservations]);

  return {
    reservations,
    loading,
    error,
    addReservation,
    updateReservation,
    deleteReservation,
    updateReservationStatus,
    getReservationsByStatus
  };
};

export default useReservations;
