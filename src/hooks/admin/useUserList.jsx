// useUserList.js
import { useState, useEffect } from 'react';
import axios from '../../services/api';

const useUserList = () => {
  const [daftarPengguna, setDaftarPengguna] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const ambilDaftarPengguna = async () => {
      try {
        const response = await axios.get('/users'); 
        setDaftarPengguna(response.data.users);
      } catch (error) {
        console.error('Kesalahan saat mengambil daftar pengguna:', error);
        setError(error);
      }
    };

    ambilDaftarPengguna();
  }, []);

  const hapusPengguna = async (UserID) => {
    const apakahDikonfirmasi = window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?');

    if (apakahDikonfirmasi) {
      try {
    
        await axios.delete(`/users/${UserID}`);

        setDaftarPengguna((daftarSebelumnya) => daftarSebelumnya.filter((pengguna) => pengguna.UserID !== UserID));
      } catch (error) {
        console.error('Kesalahan saat menghapus pengguna:', error);
        setError(error);
      }
    }
  };

  const aktifkanPengguna = async (UserID) => {
    try {
      await axios.put(`/users/${UserID}/activate`);
      setDaftarPengguna((daftarSebelumnya) =>
        daftarSebelumnya.map((pengguna) =>
          pengguna.UserID === UserID ? { ...pengguna, status: 'active' } : pengguna
        )
      );
    } catch (error) {
      console.error('Kesalahan saat mengaktifkan pengguna:', error);
      setError(error);
    }
  };

  const nonaktifkanPengguna = async (UserID) => {
    try {
      await axios.put(`/users/${UserID}/deactivate`);
      setDaftarPengguna((daftarSebelumnya) =>
        daftarSebelumnya.map((pengguna) =>
          pengguna.UserID === UserID ? { ...pengguna, status: 'inactive' } : pengguna
        )
      );
    } catch (error) {
      console.error('Kesalahan saat menonaktifkan pengguna:', error);
      setError(error);
    }
  };

  const filteredUsers = daftarPengguna.filter(
    (pengguna) =>
      (pengguna.username && pengguna.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pengguna.Email && pengguna.Email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pengguna.NamaLengkap && pengguna.NamaLengkap.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredUsersByStatus = selectedStatus !== 'all'
    ? filteredUsers.filter((pengguna) => pengguna.status === selectedStatus)
    : filteredUsers;

  const filteredUsersByRole = selectedRole !== 'all'
    ? filteredUsersByStatus.filter((pengguna) => pengguna.role === selectedRole)
    : filteredUsersByStatus;

  return {
    daftarPengguna: filteredUsersByRole,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedRole,
    setSelectedRole,
    hapusPengguna,
    aktifkanPengguna,
    nonaktifkanPengguna,
    error,
  };
};

export default useUserList;
