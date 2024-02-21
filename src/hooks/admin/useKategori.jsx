import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';

const useKategori = () => {
  const [kategori, setKategori] = useState([]);

  const ambilKategori = useCallback(async () => {
    try {
      const response = await axios.get('/kategoribuku');
      setKategori(response.data);
    } catch (error) {
      console.error('Error mengambil data kategori:', error);
    }
  }, []);

  useEffect(() => {
    ambilKategori();
  }, [ambilKategori]);

  const buatKategori = async (kategoriBaru) => {
    try {
      const response = await axios.post('/kategoribuku', kategoriBaru);
      setKategori([...kategori, response.data]);
    } catch (error) {
      console.error('Error membuat kategori:', error);
    }
  };

  const perbaruiKategori = async (KategoriID, kategoriYangDiperbarui) => {
    try {
      const response = await axios.put(`/kategoribuku/${KategoriID}`, kategoriYangDiperbarui);
      const kategoriDiperbarui = kategori.map((item) =>
        item.KategoriID === KategoriID ? response.data : item
      );
      setKategori(kategoriDiperbarui);
    } catch (error) {
      console.error('Error memperbarui kategori:', error);
    }
  };

  const hapusKategori = async (KategoriID) => {
    try {
      await axios.delete(`/kategoribuku/${KategoriID}`);
      const kategoriBaru = kategori.filter((item) => item.KategoriID !== KategoriID);
      setKategori(kategoriBaru);
    } catch (error) {
      console.error('Error menghapus kategori:', error);
    }
  };

  return {
    kategori,
    buatKategori,
    perbaruiKategori,
    hapusKategori,
  };
};

export default useKategori;
