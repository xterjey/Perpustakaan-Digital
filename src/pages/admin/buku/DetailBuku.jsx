import React, { useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import useBookDetail from '../../../hooks/admin/useBookDetail';
import { useParams, useNavigate } from 'react-router-dom';

const DetailBuku = () => {
  const { bookId } = useParams();
  const { detailBuku, hapusBuku } = useBookDetail(bookId);
  const navigate = useNavigate();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      await hapusBuku();
      navigate('/admin/dashboard/buku'); 
    }
  };


  const handleEdit = () => {
    navigate(`/admin/dashboard/buku/edit/${bookId}`);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
<div className="wrapper">
  <Sidebar />
  <div className="main">
    <Header />
    <main className="content p-3">
      <div className="container mx-auto">
        {detailBuku && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <img src={detailBuku.imageurl} alt={detailBuku.Judul} className="w-full" />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-bold">{detailBuku.Judul}</h2>
              <h4>ISBN: {detailBuku.ISBN}</h4>
              <h4>Penulis: {detailBuku.Penulis}</h4>
              <h4>Penerbit: {detailBuku.Penerbit}</h4>
              <h4>Tahun Terbit: {detailBuku.TahunTerbit}</h4>
              <h4>Kategori: {detailBuku.kategoribuku.map(category => category.NamaKategori).join(', ')}</h4>
              <div className="mt-4 text-justify">
                {showFullDescription ? (
                  <>
                    <h4>Deskripsi: {detailBuku.deskripsi}</h4>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={toggleDescription}
                    >
                      Sembunyikan
                    </button>
                  </>
                ) : (
                  <>
                    <h4>
                      Deskripsi: {detailBuku.deskripsi.slice(0, 100)}
                      {detailBuku.deskripsi.length > 100 && '...'}
                    </h4>
                    {detailBuku.deskripsi.length > 100 && (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={toggleDescription}
                      >
                        Baca Selengkapnya
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-3 md:mr-0 md:mb-2 w-full md:w-auto"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-3 md:mr-0 md:mb-2 w-full md:w-auto"
                  onClick={() => navigate('/admin/dashboard/buku')}
                >
                  Kembali
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
</div>


  );
};

export default DetailBuku;
