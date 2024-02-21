import { useState, useEffect } from 'react';
import axios from '../../services/api';

const useBookDetail = (bookId) => {
  const [detailBuku, setDetailBuku] = useState(null);

  useEffect(() => {
    const ambilDetailBuku = async () => {
      try {
        const response = await axios.get(`/buku/${bookId}`);
        setDetailBuku(response.data.buku);
      } catch (error) {
        console.error('Error Baca Buku:', error);
      }
    };

    ambilDetailBuku();
  }, [bookId]); 

  const hapusBuku = async () => {
    try {
      await axios.delete(`/buku/${bookId}`);
      console.log('Buku berhasil dihapus');
    } catch (error) {
      console.error('Error delete:', error);
    }
  };

  return {
    detailBuku,
    hapusBuku,
  };
};

export default useBookDetail;
