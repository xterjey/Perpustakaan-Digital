import { useState, useEffect } from 'react';
import axios from '../../services/api';

const useDetailUser = (userID) => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/users/${userID}`);
        setUserDetail(response.data.user);
      } catch (error) {
        console.error('Error fetching user detail:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userID]);

  return {
    userDetail,
    loading,
    error
  };
};

export default useDetailUser;
