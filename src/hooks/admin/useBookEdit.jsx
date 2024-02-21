import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useBookEdit = (bookId) => {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahunTerbit, setTahunTerbit] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stok, setStok] = useState(0); // Menambahkan state untuk stok
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/buku/${bookId}`);
        const bookData = response.data.buku;

        setJudul(bookData.Judul);
        setPenulis(bookData.Penulis);
        setPenerbit(bookData.Penerbit);
        setTahunTerbit(bookData.TahunTerbit);
        setDeskripsi(bookData.deskripsi);
        setImageUrl(bookData.imageurl);
        setSelectedCategories(bookData.kategoribuku.map(category => category.KategoriID));
        setStok(bookData.stok); // Mengambil data stok dari response
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/kategoribuku');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchBookDetails();
    fetchCategories();
  }, [bookId]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const data = {
      Judul: judul,
      Penulis: penulis,
      Penerbit: penerbit,
      TahunTerbit: tahunTerbit,
      deskripsi: deskripsi,
      imageurl: imageUrl,
      kategoribuku_id: selectedCategories,
      stok: stok,
    };

    try {
      await axios.put(`/buku/${bookId}`, data);
      toast.success('Perubahan buku berhasil disimpan.');
      navigate('/admin/dashboard/buku');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Gagal menyimpan perubahan buku. Coba lagi ya.');
    } finally {
      setIsSubmitting(false);
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
    categories,
    selectedCategories,
    handleCategoryChange,
    handleSubmit,
    isSubmitting,
    stok, 
    setStok, 
  };
};

export default useBookEdit;
