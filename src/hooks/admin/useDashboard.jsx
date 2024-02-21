import { useState, useEffect } from 'react';
import axios from '../../services/api';

const useDashboard = () => {
  const [totalPeminjaman, setTotalPeminjaman] = useState(0);
  const [totalPeminjamPending, setTotalPeminjamPending] = useState(0);
  const [totalPeminjamApproved, setTotalPeminjamApproved] = useState(0);
  const [totalPeminjamReturned, setTotalPeminjamReturned] = useState(0);
  const [totalPeminjamRejected, setTotalPeminjamRejected] = useState(0);
  const [totalBuku, setTotalBuku] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePeminjaman = await axios.get('/peminjaman');
        const peminjamanData = responsePeminjaman.data;

        setTotalPeminjaman(peminjamanData.length);

        const pendingCount = peminjamanData.filter(item => item.StatusPeminjaman === 'PENDING').length;
        setTotalPeminjamPending(pendingCount);

        const approvedCount = peminjamanData.filter(item => item.StatusPeminjaman === 'APPROVED').length;
        setTotalPeminjamApproved(approvedCount);

        const returnedCount = peminjamanData.filter(item => item.StatusPeminjaman === 'RETURNED').length;
        setTotalPeminjamReturned(returnedCount);

        const rejectedCount = peminjamanData.filter(item => item.StatusPeminjaman === 'REJECTED').length;
        setTotalPeminjamRejected(rejectedCount);

     
        const responseBuku = await axios.get('/buku');
        const bukuData = responseBuku.data;
        setTotalBuku(bukuData.length);
      } catch (error) {
        console.error('Error Membaca Data:', error);
      }
    };

    fetchData();
  }, []);

  return { 
    totalPeminjaman, 
    totalPeminjamPending, 
    totalPeminjamApproved, 
    totalPeminjamReturned,
    totalPeminjamRejected,
    totalBuku 
  };
};

export default useDashboard;
