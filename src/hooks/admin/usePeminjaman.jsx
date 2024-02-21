import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';

const usePeminjaman = () => {
  const [peminjamans, setPeminjamans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const ambilPeminjamans = useCallback(async () => {
    try {
      const response = await axios.get('/peminjaman');
      setPeminjamans(response.data);
    } catch (error) {
      console.error('Error mengambil data peminjaman:', error);
    }
  }, []);

  useEffect(() => {
    ambilPeminjamans();
  }, [ambilPeminjamans]);

  const hapusPeminjaman = async (PeminjamanID) => {
    try {
      const confirmed = window.confirm('Anda yakin ingin menghapus peminjaman ini?');
      if (confirmed) {
        await axios.delete(`/peminjaman/${PeminjamanID}`);
        const peminjamansBaru = peminjamans.filter(peminjaman => peminjaman.PeminjamanID !== PeminjamanID);
        setPeminjamans(peminjamansBaru);
        console.log('Peminjaman berhasil dihapus');
      }
    } catch (error) {
      console.error('Error menghapus peminjaman:', error);
    }
  };
  

  const setujuiPeminjaman = async (PeminjamanID) => {
    try {
      await axios.put(`/peminjamans/${PeminjamanID}/approve`);
      console.log('Peminjaman berhasil disetujui');
      ambilPeminjamans();
    } catch (error) {
      console.error('Error menyetujui peminjaman:', error);
    }
  };

  const tolakPeminjaman = async (PeminjamanID) => {
    try {
      await axios.put(`/peminjamans/${PeminjamanID}/reject`);
      console.log('Peminjaman berhasil ditolak');
      ambilPeminjamans();
    } catch (error) {
      console.error('Error menolak peminjaman:', error);
    }
  };



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPeminjamans = peminjamans.filter((peminjaman) =>
  (peminjaman.user?.NamaLengkap || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (peminjaman.buku?.Judul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (peminjaman.TanggalPeminjaman || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (peminjaman.TanggalPengembalian || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (peminjaman.StatusPeminjaman || '').toLowerCase().includes(searchTerm.toLowerCase())
);


  return {
    peminjamans: filteredPeminjamans,
    ambilPeminjamans,
    hapusPeminjaman,
    setujuiPeminjaman,
    tolakPeminjaman,
    searchTerm,
    handleSearch,
  };
};

export default usePeminjaman;
