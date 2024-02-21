import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import Select from 'react-select';
import Header from '../../../components/peminjam/Header';
import Footer from '../../../components/peminjam/Footer';
import useDashboard from '../../../hooks/peminjam/useDashboard';

const Dashboard = () => {
  const {
    buku,
    kategoris,
    kategoriTerpilih,
    kataKunci,
    handleKataKunciChange,
    handleKategoriChange,
    renderBintangPeringkat,
  } = useDashboard();

  return (
    <div className="bg-blue-900 text-white min-h-screen">
      <Header />
      <div className="text-center py-8">
        <FaFire className="inline-block text-3xl mb-4" />
        <h2 className="text-3xl">Cari Buku Impian Anda</h2>
      </div>
      <div className="container mx-auto px-4">
        <h4 className="text-white mb-4">Daftar Buku</h4>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridGap: '1rem' }}>
          <div>
            <Select
              className="w-full"
              value={kategoriTerpilih}
              onChange={handleKategoriChange}
              options={kategoris.map((kategori) => ({
                value: kategori.KategoriID,
                label: kategori.NamaKategori,
              }))}
              placeholder="Pilih Kategori"
              isMulti
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: '10px',
                  minHeight: '0',
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          </div>
          <div>
            <input
              type="text"
              id='cari'
              placeholder="Cari judul buku"
              className="w-full py-2 px-4 bg-white rounded-lg"
              value={kataKunci}
              onChange={handleKataKunciChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buku.map((buku) => (
            <div key={buku.BukuID}>
              <Link to={`/dashboard/buku/${buku.BukuID}`} className="no-underline text-white">
                <img
                  src={buku.imageurl}
                  alt={buku.Judul}
                  className="aspect-[3/4] overflow-hidden rounded-lg object-cover object-center"
                  height="300"
                  width="270"
                />
                <div>
                  <h5 className="text-lg font-semibold mb-1">{buku.Judul}</h5>
                  <p><strong>ISBN:</strong> {buku.ISBN}</p>
                  <p><strong>Penulis:</strong> {buku.Penulis}</p>
                  <p><strong>Tahun Terbit:</strong> {buku.TahunTerbit}</p>
                  <p><strong>Stok:</strong> {buku.stok}</p>
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ marginRight: '0.5rem' }}>Rating:</strong>
                    {renderBintangPeringkat(buku.peringkatRata)} ({buku.totalUlasan} Ulasan)
                  </p>
                  <div className="flex flex-wrap">
                    {buku.kategoribuku.map((kategoriBuku) => (
                      <p key={kategoriBuku.KategoriID} className="text-sm text-white bg-blue-800 px-2 py-1 rounded-lg mr-2 mb-2">
                        {kategoriBuku.NamaKategori}
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
