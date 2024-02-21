import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/peminjam/Header';
import Footer from '../../../components/peminjam/Footer';
import useShowBuku from '../../../hooks/peminjam/useShowBuku';
import Rating from 'react-rating-stars-component';

const ShowBuku = () => {
  const { bookId } = useParams();

  const {
    buku,
    peringkatBuku,
    ulasanBuku,
    handlePinjam,
    handleKoleksi,
    handlePerbaruiUlasan,
    renderIkonsPeringkatBintang,
  } = useShowBuku(bookId);

  const [rating, setRating] = useState(0);
  const [ulasanState, setUlasanState] = useState('');

  const handleSubmitUlasan = async (e) => {
    e.preventDefault();
    await handlePerbaruiUlasan(rating, ulasanState);
    setRating(0);
    setUlasanState('');
  };

  return (
    <div className="bg-blue-900 text-white min-h-screen">
      <Header />
      <div className="px-4 md:px-6 pb-6">
        {buku && (
          <div>
            <div className="md:hidden">
              <img
                alt="Cover Buku"
                className="aspect-[2/2] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                src={buku.imageurl || "/placeholder.svg"}
              />
            </div>
            <div className="grid md:grid-cols-4 md:gap-6 lg:gap-12 max-w-6xl mx-auto items-start mt-9">
              <div className="md:col-span-3 grid gap-4">
                <div className="grid gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{buku.Judul}</h1>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Penulis :</strong> {buku.Penulis}</p>
                  <p className="text-sm text-muted-foreground"><strong>Penerbit :</strong> {buku.Penerbit}</p>
                  <p className="text-sm text-muted-foreground"><strong>Tahun Terbit :</strong> {buku.TahunTerbit}</p>
                  <p className="text-sm">
                    {buku.kategoribuku.map((kategori, index) => (
                      <span key={kategori.KategoriID} className={`text-green-500  border border-gray-500 border-solid rounded px-2 py-1`}>
                        {kategori.NamaKategori}
                        {index !== buku.kategoribuku.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="grid gap-4">
                  <p>{buku.deskripsi}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {renderIkonsPeringkatBintang(peringkatBuku.average_rating)}
                    <span className="ml-2">{peringkatBuku.average_rating} ({ulasanBuku.length} Ulasan)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-[400px] md:flex-row">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
                    onClick={async () => {
                      await handlePinjam();
                    }}
                  >
                    Pinjam
                  </button>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 ml-3"
                    onClick={async () => {
                      await handleKoleksi();
                    }}
                  >
                    Koleksi
                  </button>
                </div>

                <div className="grid gap-4">
                  <h2 className="text-lg font-semibold">Ulasan Buku</h2>
                  {ulasanBuku.length > 0 && (
                    <div className="border border-gray-200 p-4 rounded-lg dark:border-gray-800">
                      <div className="mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <h4>Ulasan Pengguna</h4>
                        {ulasanBuku.map((ulasan, index) => (
                          <div key={index} className="flex items-center">
                            <p className="mr-2 flex-grow">
                              <strong>{ulasan.user && ulasan.user.NamaLengkap} {index + 1} :</strong> {ulasan.Ulasan}
                            </p>
                            <div className="flex items-center">
                              {renderIkonsPeringkatBintang(ulasan.Rating)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid gap-4">
                  <h2 className="text-lg font-semibold">Tambah Ulasan Buku</h2>
                  <Rating
                    count={5}
                    value={rating}
                    onChange={(value) => setRating(value)}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <form onSubmit={handleSubmitUlasan} className="grid gap-4">
                    <textarea
                      id="ulasan"
                      name="ulasan"
                      value={ulasanState}
                      onChange={(e) => setUlasanState(e.target.value)}
                      placeholder="Tulis ulasan Anda di sini..."
                      className="border border-gray-300 rounded-md p-2 w-full"
                      style={{ color: 'black' }}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Submit Ulasan
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center md:block hidden">
                <img
                  alt="Cover Buku"
                  className="aspect-[2/3] object-cover border border-gray-200 max-w-[150px] h-auto rounded-lg overflow-hidden dark:border-gray-800"
                  src={buku.imageurl}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ShowBuku;
