import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const usePeminjaman = () => {
  const { getUserID } = useAuth();
  const [peminjaman, setPeminjaman] = useState([]);

  const fetchPeminjaman = useCallback(async () => {
    try {
      const userId = getUserID();
      const response = await axios.get(`/peminjaman/user/${userId}`);
      setPeminjaman(response.data);
    } catch (error) {
      console.error('Error data:', error);
    }
  }, [getUserID]);

  const returnBuku = useCallback(async (peminjamanId) => {
    try {
      await axios.put(`/peminjaman/${peminjamanId}/return`);
      fetchPeminjaman();
    } catch (error) {
      console.error('Error return:', error);
    }
  }, [fetchPeminjaman]);

  const deleteBuku = useCallback(async (peminjamanId) => {
    try {
      await axios.delete(`/peminjaman/${peminjamanId}`);
      fetchPeminjaman();
    } catch (error) {
      console.error('Error delete:', error);
    }
  }, [fetchPeminjaman]);

  useEffect(() => {
    fetchPeminjaman();
  }, [fetchPeminjaman]);

  return {
    peminjaman,
    returnBuku,
    deleteBuku,
  };
};

export default usePeminjaman;
