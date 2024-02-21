import React from 'react';
import useKoleksiPribadi from '../../../hooks/peminjam/useKoleksiPribadi';
import axios from '../../../services/api';
import Header from '../../../components/peminjam/Header';
import Footer from '../../../components/peminjam/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const KoleksiPribadi = () => {
  const { koleksi, perbaruiKoleksi } = useKoleksiPribadi();

  const handleDelete = async (koleksiId) => {
    try {
      await axios.delete(`/koleksipribadi/${koleksiId}`);
      toast.success('Koleksi berhasil dihapus!');
      perbaruiKoleksi();
    } catch (error) {
      console.error('Error deleting koleksi:', error);
      toast.error('Error deleting koleksi.');
    }
  };

  return (
    <div className="bg-blue-900 text-white min-h-screen">
      <Header />
      <ToastContainer />
      <div className="container mx-auto py-10">
        <h2 className="text-2xl mb-6 text-white">Koleksi Koleksi</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Penulis</th>
                <th className="px-4 py-2">Tahun Terbit</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {koleksi.length > 0 ? (
                koleksi.map((item) => (
                  <tr key={item.KoleksiID}>
                    {item.buku ? (
                      <>
                        <td className="border px-4 py-2">{item.buku.Judul}</td>
                        <td className="border px-4 py-2">{item.buku.Penulis}</td>
                        <td className="border px-4 py-2">{item.buku.TahunTerbit}</td>
                      </>
                    ) : (
                      <td className="border px-4 py-2" colSpan="3">Data buku tidak tersedia</td>
                    )}
                    <td className="border px-4 py-2">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.KoleksiID)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="4">Tidak ada koleksi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KoleksiPribadi;
