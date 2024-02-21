import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import usePostPinjaman from './usePostPinjaman';
import usePostKoleksi from './usePostKoleksi';
import { useAuth } from '../../context/AuthContext';

const useShowBuku = (bookId) => {
  const [buku, setBuku] = useState(null);
  const [peringkatBuku, setPeringkatBuku] = useState({});
  const [ulasan, setUlasan] = useState({});
  const [ulasanBuku, setUlasanBuku] = useState([]);
  const { postPinjaman, loading: pinjamLoading, error: pinjamError } = usePostPinjaman(bookId);
  const { postKoleksi } = usePostKoleksi(bookId);
  const { getUserID } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      const [bukuRes, ulasanRes] = await Promise.all([
        axios.get(`/buku/${bookId}`),
        axios.get(`/ulasanbuku/${bookId}`)
      ]);

      setBuku(bukuRes.data.buku);
      setUlasanBuku(ulasanRes.data);

      const peringkatRes = await axios.get(`/ulasanbuku/countrating/${bookId}`);
      setPeringkatBuku(peringkatRes.data);
    } catch (error) {
      console.error('Error book :', error);
    }
  }, [bookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePinjam = async () => {
    try {
      await postPinjaman();
      console.log('Pinjaman berhasil!');
    } catch (error) {
      console.error('Error selama proses pinjaman:', error);
    }
  };

  const handleKoleksi = async () => {
    try {
      await postKoleksi();
      alert('Koleksi berhasil!');
    } catch (error) {
      console.error('Error selama proses koleksi:', error);
      alert('Gagal menambahkan koleksi. Silakan coba lagi.');
    }
  };

  const handlePerbaruiUlasan = async (peringkat, ulasan) => {
    try {
      const idPengguna = getUserID();
      await axios.put(`/ulasanbuku/${idPengguna}/${bookId}`, {
        Rating: peringkat,
        Ulasan: ulasan
      });
      setUlasan({ Rating: peringkat, Ulasan: ulasan });
      setUlasanBuku(prevUlasanBuku => {
        return prevUlasanBuku.map(ulasan => {
          if (ulasan.id === idPengguna) {
            return { ...ulasan, Rating: peringkat, Ulasan: ulasan };
          }
          return ulasan;
        });
      });
      console.log('Ulasan berhasil diupdate!');
      alert('Ulasan berhasil diperbarui!');
      
      // Memuat ulang data setelah pembaruan ulasan berhasil
      fetchData();
    } catch (error) {
      console.error('Error Update:', error);
      alert('Gagal memperbarui ulasan. Silakan coba lagi.');
    }
  };

  const renderIkonsPeringkatBintang = (peringkatRata) => {
    const bintangPenuh = Math.floor(peringkatRata);
    const bintangSetengah = peringkatRata % 1 !== 0;
    const ikonsBintang = [];

    for (let i = 0; i < bintangPenuh; i++) {
      ikonsBintang.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
    }

    if (bintangSetengah) {
      ikonsBintang.push(<FaStarHalfAlt key="setengah" style={{ color: '#ffc107' }} />);
    }

    return ikonsBintang;
  };

  const renderPeringkatBintang = (peringkatRata) => {
    const bintangPenuh = Math.floor(peringkatRata);
    const bintangSetengah = peringkatRata % 1 !== 0;

    if (bintangSetengah) {
      return `${bintangPenuh}.5`;
    } else {
      return bintangPenuh.toString();
    }
  };

  return {
    buku,
    peringkatBuku,
    ulasan,
    ulasanBuku,
    handlePinjam,
    handleKoleksi,
    handlePerbaruiUlasan,
    renderIkonsPeringkatBintang,
    renderPeringkatBintang,
    pinjamLoading,
    pinjamError
  };
};

export default useShowBuku;
