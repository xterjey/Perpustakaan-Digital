import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';

const useUserCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    Email: '',
    NamaLengkap: '',
    Alamat: '',
    role: 'admin',
    status: 'active',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const buatPengguna = async (dataPengguna) => {
    try {
      setLoading(true);
      await axios.post('/users', dataPengguna);
      console.log('Pengguna berhasil dibuat!');
      navigate('/admin/dashboard/management');
    } catch (error) {
      console.error('Kesalahan saat membuat pengguna:', error);
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
    buatPengguna,
  };
};

export default useUserCreate;
