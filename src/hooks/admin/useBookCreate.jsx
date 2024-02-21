import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useBookCreate = () => {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahunTerbit, setTahunTerbit] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [kategori, setKategori] = useState([]);
  const [kategoriDipilih, setKategoriDipilih] = useState([]);
  const [stok, setStok] = useState('');
  const [lagiSubmit, setLagiSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ambilKategori = async () => {
      try {
        const respon = await axios.get('/kategoribuku');
        setKategori(respon.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    ambilKategori();
  }, []);

  const gantiKategori = (idKategori) => {
    setKategoriDipilih((kategoriSebelumnya) => {
      if (kategoriSebelumnya.includes(idKategori)) {
        return kategoriSebelumnya.filter((id) => id !== idKategori);
      } else {
        return [...kategoriSebelumnya, idKategori];
      }
    });
  };

  const kirimData = async (e) => {
    e.preventDefault();

    setLagiSubmit(true);

    const data = {
      Judul: judul,
      Penulis: penulis,
      Penerbit: penerbit,
      TahunTerbit: tahunTerbit,
      deskripsi: deskripsi,
      imageurl: imageUrl,
      kategoribuku_id: kategoriDipilih,
      stok: stok, // Tambahkan stok ke dalam objek data
    };

    try {
      await axios.post('/buku', data);
      toast.success('Buku berhasil ditambahkan.');
      navigate('/admin/dashboard/buku');
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error('Gagal menambahkan buku. Coba lagi ya.');
    } finally {
      setLagiSubmit(false);
    }
  };

  return {
    judul,
    setJudul,
    penulis,
    setPenulis,
    penerbit,
    setPenerbit,
    tahunTerbit,
    setTahunTerbit,
    deskripsi,
    setDeskripsi,
    imageUrl,
    setImageUrl,
    kategori,
    kategoriDipilih,
    gantiKategori,
    stok,
    setStok,
    kirimData,
    lagiSubmit,
  };
};

export default useBookCreate;
