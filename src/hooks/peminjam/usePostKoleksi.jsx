import { useState } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const usePostKoleksi = (bookId) => {
  const { getUserID } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postKoleksi = async () => {
    try {
      setLoading(true);

      const userID = getUserID();

      await axios.post('/koleksipribadi', {
        UsersID: userID,
        BukuID: bookId,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error menambahkan ke koleksi:', error);
      setError(error);

      setLoading(false);
    }
  };

  return { postKoleksi, loading, error };
};

export default usePostKoleksi;
