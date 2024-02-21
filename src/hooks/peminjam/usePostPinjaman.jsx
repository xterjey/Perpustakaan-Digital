import { useState } from 'react';
import axios from '../../services/api';
import moment from 'moment';
import { useAuth } from '../../context/AuthContext';

const usePostPinjaman = (bookId) => {
  const { getUserID } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postPinjaman = async () => {
    try {
      setLoading(true);
  
      const userID = getUserID();
      const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  
      await axios.post('/peminjaman', {
        UsersID: userID,
        BukuID: bookId,
        TanggalPeminjaman: formattedDate,
        StatusPeminjaman: 'PENDING',
      });
  
      setLoading(false);
      alert('Peminjaman buku berhasil!');
    } catch (error) {
      console.error('Error saat meminjam buku:', error);
      if (error.response && error.response.status === 422) {
        alert('Maaf, buku telah habis.');
      } else {
        console.error('Reposn:', error.response ? error.response.status : 'No response');
        setError(error);
      }
  
      setLoading(false);
    }
  };

  return { postPinjaman, loading, error };
};

export default usePostPinjaman;
