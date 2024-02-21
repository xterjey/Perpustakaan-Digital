import { useState, useEffect } from 'react';
import axios from '../../services/api';

const useLanding = () => {
  const [daftarBuku, setDaftarBuku] = useState([]);
  const [kataKunciPencarian, setKataKunciPencarian] = useState('');

  useEffect(() => {
    axios.get('/buku')
      .then(response => setDaftarBuku(response.data))
      .catch(error => console.error('Error Buku:', error));
  }, []);

  const handlePerubahanPencarian = (event) => {
    setKataKunciPencarian(event.target.value);
  };

  const bukuTersaring = daftarBuku.filter(buku => {
    if (kataKunciPencarian.trim() === '') {
      return true;
    } else {
      const kataKunciLowerCase = kataKunciPencarian.toLowerCase();
      return (
        buku.Judul.toLowerCase().includes(kataKunciLowerCase) ||
        buku.Penulis.toLowerCase().includes(kataKunciLowerCase) || 
        (typeof buku.TahunTerbit === 'string' && buku.TahunTerbit.toLowerCase().includes(kataKunciLowerCase)) || 
        buku.ISBN.toLowerCase().includes(kataKunciLowerCase)
      );
    }
  }).slice(0, 4);

  return {
    buku: bukuTersaring, 
    kataKunciPencarian,
    handlePerubahanPencarian,
  };
};

export default useLanding;
