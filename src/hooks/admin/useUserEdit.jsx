import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
const useUserEdit = (userID) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',  
    email: '',
    fullName: '',
    address: '',
    role: 'admin',
    status: 'active',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/users/${userID}`);
        setFormData(response.data.user);
      } catch (error) {
        console.error('Kesalahan saat mengambil data pengguna:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateDataPengguna = async () => {
    try {
      setLoading(true);
      await axios.put(`/users/${userID}`, formData);
      console.log('Data pengguna berhasil diperbarui!');
      navigate('/admin/dashboard/management');
    } catch (error) {
      console.error('Kesalahan saat memperbarui data pengguna:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    updateDataPengguna,
  };
};

export default useUserEdit;
