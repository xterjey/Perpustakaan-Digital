import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import useBookCreate from '../../../hooks/admin/useBookCreate';
import { ToastContainer } from 'react-toastify';
import { RiArrowLeftLine } from 'react-icons/ri';

const CreateBuku = () => {
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
    kategori,
    kategoriDipilih,
    gantiKategori,
    kirimData,
    stok, 
    setStok,
    lagiSubmit,
  } = useBookCreate();

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="p-6">
          <div className="container mx-auto">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
              <div className="flex-col space-y-1.5 p-6 flex items-start gap-2">
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Tambahkan Buku Baru</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="title"
                    >
                      Judul
                    </label>
                    <input
                      autoFocus
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="title"
                      placeholder="Masukkan judul"
                      required=""
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="author"
                    >
                      Penulis
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="author"
                      placeholder="Masukkan penulis"
                      required=""
                      value={penulis}
                      onChange={(e) => setPenulis(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="publisher"
                    >
                      Penerbit
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="publisher"
                      placeholder="Masukkan penerbit"
                      value={penerbit}
                      onChange={(e) => setPenerbit(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="year"
                    >
                      Tahun Terbit
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="year"
                      placeholder="Masukkan tahun terbit"
                      type="number"
                      value={tahunTerbit}
                      onChange={(e) => setTahunTerbit(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="description"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                    id="description"
                    placeholder="Masukkan deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="image"
                  >
                    URL Gambar
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="image"
                    placeholder="Masukkan URL gambar"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="stock"
                  >
                    Stok
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="stock"
                    placeholder="Masukkan jumlah stok"
                    type="number"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Kategori
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {kategori.map((category) => (
                      <div key={category.KategoriID} className="flex items-center mr-2">
                        <input
                          type="checkbox"
                          id={`kategori-${category.KategoriID}`}
                          checked={kategoriDipilih.includes(category.KategoriID)}
                          onChange={() => gantiKategori(category.KategoriID)}
                          className="form-checkbox h-6 w-3 mr-2"
                        />
                        <label htmlFor={`kategori-${category.KategoriID}`}>{category.NamaKategori}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-6 justify-end"></div>
              <div className="flex justify-between"> 
                <button type="submit" className="btn btn-primary" onClick={kirimData} disabled={lagiSubmit} style={{ marginRight: '8px' }}>
                  {lagiSubmit ? 'Menyimpan...' : 'Simpan'}
                </button>
                <Link to="/admin/dashboard/buku" className="btn btn-secondary" style={{ textDecoration: 'none', marginLeft: '8px' }}>
                  <RiArrowLeftLine className="inline-block align-text-bottom text-lg" /> Kembali
                </Link>
              </div>
            </div>
            <ToastContainer/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateBuku;
