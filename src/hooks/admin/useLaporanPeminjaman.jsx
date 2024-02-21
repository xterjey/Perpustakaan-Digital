import { useEffect, useState } from 'react';
import axios from '../../services/api';

const useLaporanPeminjaman = () => {
  const [laporanPeminjaman, setLaporanPeminjaman] = useState([]);
  const [laporanPeminjamanTersaring, setLaporanPeminjamanTersaring] = useState([]);
  const [kataKunciPencarian, setKataKunciPencarian] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');
  const [statusFilter, setStatusFilter] = useState({
    approved: false,
    pending: false,
    returned: false,
    rejected: false,
  });

  useEffect(() => {
    const ambilLaporanPeminjaman = async () => {
      try {
        const response = await axios.get('/peminjaman');
        setLaporanPeminjaman(response.data);
      } catch (error) {
        console.error('Error fetching laporan peminjaman:', error);
      }
    };

    ambilLaporanPeminjaman();
  }, []);

  useEffect(() => {
    const daftarTersaring = laporanPeminjaman.filter((pinjaman) => {
      const tanggalPinjam = new Date(pinjaman.TanggalPeminjaman);
      const mulai = tanggalMulai ? new Date(tanggalMulai) : null;
      const akhir = tanggalAkhir ? new Date(tanggalAkhir) : null;

      const cocokStatus = 
        (statusFilter.approved && pinjaman.StatusPeminjaman === 'APPROVED') ||
        (statusFilter.pending && pinjaman.StatusPeminjaman === 'PENDING') ||
        (statusFilter.returned && pinjaman.StatusPeminjaman === 'RETURNED') ||
        (statusFilter.rejected && pinjaman.StatusPeminjaman === 'REJECTED') ||
        (!statusFilter.approved && !statusFilter.pending && !statusFilter.returned && !statusFilter.rejected);

      return (
        cocokStatus &&
        (!mulai || tanggalPinjam >= mulai) &&
        (!akhir || tanggalPinjam <= akhir) &&
        (pinjaman.user?.NamaLengkap.toLowerCase().includes(kataKunciPencarian.toLowerCase()) ||
          pinjaman.buku?.Judul.toLowerCase().includes(kataKunciPencarian.toLowerCase()))
      );
    });

    setLaporanPeminjamanTersaring(daftarTersaring);
  }, [laporanPeminjaman, kataKunciPencarian, tanggalMulai, tanggalAkhir, statusFilter]);

  const handleUbahStatus = (status) => {
    setStatusFilter({
      ...statusFilter,
      [status]: !statusFilter[status],
    });
  };

  return {
    laporanPeminjaman,
    laporanPeminjamanTersaring,
    kataKunciPencarian,
    setKataKunciPencarian,
    tanggalMulai,
    setTanggalMulai,
    tanggalAkhir,
    setTanggalAkhir,
    statusFilter,
    handleUbahStatus,
  };
};

export default useLaporanPeminjaman;