import { useState, useEffect, useCallback } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const useKoleksiPribadi = () => {
  const { getUserID } = useAuth();
  const [koleksi, setKoleksi] = useState([]);

  const perbaruiKoleksi = useCallback(async () => {
    try {
      const userId = getUserID();
      const response = await axios.get(`/koleksipribadi/${userId}`);
      const koleksiData = response.data.data;

      const koleksiDenganBuku = await Promise.all(
        koleksiData.map(async (item) => {
          const bookResponse = await axios.get(`/buku/${item.BukuID}`);
          return {
            ...item,
            buku: bookResponse.data.buku,
          };
        })
      );

      setKoleksi(koleksiDenganBuku);
      console.log('Data Koleksi Muncul:');
    } catch (error) {
      console.error('Error:', error);
    }
  }, [getUserID]);

  useEffect(() => {
    perbaruiKoleksi();
  }, [getUserID, perbaruiKoleksi]);

  return {
    koleksi,
    perbaruiKoleksi,
  };
};

export default useKoleksiPribadi;
