import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import useBookEdit from '../../../hooks/admin/useBookEdit';
import { ToastContainer } from 'react-toastify';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const EditBuku = () => {
  const { bookId } = useParams();
  const {
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
  } = useBookEdit(bookId);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content p-3">
          <div className="container mx-auto">
            <div className="mb-3">
              <h4>Edit Buku</h4>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Judul:</label>
                      <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Penulis:</label>
                      <input
                        type="text"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Penerbit:</label>
                      <input
                        type="text"
                        value={penerbit}
                        onChange={(e) => setPenerbit(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Tahun Terbit:</label>
                      <input
                        type="number"
                        value={tahunTerbit}
                        onChange={(e) => setTahunTerbit(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Deskripsi:</label>
                    <textarea
                      rows={3}
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      required
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">URL Gambar:</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Stok:</label>
                    <input
                      type="number"
                      value={stok}
                      onChange={(e) => setStok(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Kategori:</label>
                    {categories.map((category) => (
                      <div key={category.KategoriID} className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          id={`kategori-${category.KategoriID}`}
                          checked={selectedCategories.includes(category.KategoriID)}
                          onChange={() => handleCategoryChange(category.KategoriID)}
                          className="form-checkbox h-6 w-6 mr-2"
                        />
                        <label htmlFor={`kategori-${category.KategoriID}`} className="text-lg">
                          {category.NamaKategori}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary-lg lg:inline-block md:w-auto lg:w-auto px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                  <Link 
                    to="/admin/dashboard/buku" 
                    className="btn-secondary-lg lg:inline-block md:w-auto lg:w-auto px-6 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 ml-0 mt-2 lg:mt-0 lg:ml-4"
                    style={{ textDecoration: 'none' }} 
                  >
                    <RiArrowLeftLine className="inline-block align-text-bottom text-lg" /> Kembali
                  </Link>
                </form>
              </div>
            </div>
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditBuku;
