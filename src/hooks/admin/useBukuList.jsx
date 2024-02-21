import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';

const useListBuku = () => {
  const [daftarBuku, setDaftarBuku] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const ambilListBuku = useCallback(async () => {
    try {
      const response = await axios.get('/buku');
      setDaftarBuku(response.data);
    } catch (error) {
      console.error('Error mengambil daftar buku:', error);
    }
  }, []);

  useEffect(() => {
    ambilListBuku();
  }, [ambilListBuku]);

  const handleHapusBuku = async (BukuID) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      try {
        await axios.delete(`/buku/${BukuID}`);
        const daftarBukuBaru = daftarBuku.filter((buku) => buku.BukuID !== BukuID);
        setDaftarBuku(daftarBukuBaru);
        console.log('Buku berhasil dihapus');
      } catch (error) {
        console.error('Error menghapus buku:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = daftarBuku.filter(buku =>
    buku.ISBN.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.Judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.Penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.Penerbit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    daftarBuku: filteredBooks,
    handleHapusBuku,
    handleSearch,
  };
};

export default useListBuku;
