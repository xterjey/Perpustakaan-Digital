import React from 'react';
import useLanding from '../hooks/Landing/useLanding';
import Footer from '../components/Landing/Footer';
import Header from '../components/Landing/Header';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const {
    buku: bukuTersaring,
    kataKunciPencarian,
    handlePerubahanPencarian,
  } = useLanding();

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Selamat datang di Perpustakaan Digital
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl lg:text-base">
                Baca buku di mana saja, kapan saja. Ribuan judul di ujung jari Anda.
              </p>
            </div>
            <Link to="/register" className="mx-auto max-w-md flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
              >
                Gabung Sekarang
                </button>
              </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Buku Terbaru</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl lg:text-base">
                Temukan buku terbaru di perpustakaan kami.
              </p>
            </div>
            <div className="container mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  value={kataKunciPencarian}
                  onChange={handlePerubahanPencarian}
                  placeholder="Search for books..."
                  className="border border-gray-300 rounded-md pl-8 pr-4 py-2 w-full"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
              </div>
            </div>
            <Link to="/login">
            <div className="mx-auto grid max-w-5xl items-center gap-4 lg:grid-cols-2 lg:gap-12">
              {bukuTersaring.map(buku => (
                <div key={buku.id} className="flex flex-col items-center gap-2">
                  <img
                    alt="Cover"
                    className="aspect-[3/4] overflow-hidden rounded-lg object-cover object-center"
                    height="300"
                    src={buku.imageurl}
                    width="200"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-lg line-clamp-2">{buku.Judul}</h3>
                    <p className="text-sm text-gray-500">Penulis : {buku.Penulis}</p>
                      <p className="text-sm">
                        <div className="flex flex-wrap justify-end">
                        {buku.kategoribuku.map((kategoriBuku) => (
                          <p key={kategoriBuku.KategoriID} className="text-sm text-white bg-blue-600 px-2 py-1 rounded-lg mr-2 mb-2">
                            {kategoriBuku.NamaKategori}
                          </p>
                        ))}
                      </div>
                      </p>
                  </div>
                </div>
              ))}
            </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;
