import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const useDashboard = () => {
  const [buku, setBuku] = useState([]);
  const [kategoris, setKategoris] = useState([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState([]);
  const [kataKunci, setKataKunci] = useState('');
  const [errorBuku, setErrorBuku] = useState('');
  const [errorKategori, setErrorKategori] = useState('');
  const [loading, setLoading] = useState(true);

  const renderBintangPeringkat = (peringkatRata) => {
    const bintangPenuh = Math.floor(peringkatRata);
    const setengahBintang = peringkatRata % 1 !== 0;
    const bintangKosong = 5 - bintangPenuh - (setengahBintang ? 1 : 0);

    const bintang = [];
    for (let i = 0; i < bintangPenuh; i++) {
      bintang.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
    }

    if (setengahBintang) {
      bintang.push(<FaStarHalfAlt key="setengah" style={{ color: '#ffc107' }} />);
    }

    for (let i = 0; i < bintangKosong; i++) {
      bintang.push(<FaRegStar key={`kosong-${i}`} style={{ color: '#ffc107' }} />);
    }

    return bintang;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBuku = await axios.get('/buku');
        const bukuData = responseBuku.data;
        const updatedBukuData = await Promise.all(
          bukuData.map(async (book) => {
            const response = await axios.get(`/ulasanbuku/countrating/${book.BukuID}`);
            const { average_rating, total_ulasan } = response.data;
            return { ...book, peringkatRata: average_rating, totalUlasan: total_ulasan };
          })
        );
        setBuku(updatedBukuData);

        const responseKategori = await axios.get('/kategoribuku');
        setKategoris(responseKategori.data);

        setLoading(false);
      } catch (error) {
        setErrorBuku('Error dalam mengambil data buku.');
        setErrorKategori('Error dalam mengambil data kategori.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKataKunciChange = (event) => {
    setKataKunci(event.target.value);
  };

  const handleKategoriChange = (selectedOptions) => {
    setKategoriTerpilih(selectedOptions);
  };

  const bukuDifilter = buku.filter((book) => {
    const cocokKategori =
      kategoriTerpilih.length === 0 ||
      kategoriTerpilih.some((kategori) =>
        book.kategoribuku.some((kategoriBuku) => kategoriBuku.KategoriID === kategori.value)
      );
    const cocokKataKunci =
      book.Judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      book.Penulis.toLowerCase().includes(kataKunci.toLowerCase()) ||
      book.Penerbit.toLowerCase().includes(kataKunci.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(kataKunci.toLowerCase());
    return cocokKategori && cocokKataKunci;
  });
  
  return {
    buku: bukuDifilter,
    kategoris,
    kategoriTerpilih,
    kataKunci,
    handleKataKunciChange,
    handleKategoriChange,
    renderBintangPeringkat,
    errorBuku,
    errorKategori,
    loading,
  };
};

export default useDashboard;
