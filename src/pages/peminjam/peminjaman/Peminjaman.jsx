import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDelete,} from 'react-icons/ai'; 
import { FaUndo } from 'react-icons/fa'; 
import usePeminjaman from '../../../hooks/peminjam/usePeminjaman';
import Header from '../../../components/peminjam/Header';
import Footer from '../../../components/peminjam/Footer';

const Peminjaman = () => {
  const { peminjaman, returnBuku, deleteBuku } = usePeminjaman(); 

  const handleReturnBuku = async (peminjamanId) => {
    try {
      await returnBuku(peminjamanId);
      toast.success('Buku berhasil dikembalikan');
    } catch (error) {
      toast.error('Gagal mengembalikan buku');
      console.error('Error returning buku:', error);
    }
  };

  const handleDeleteBuku = async (peminjamanId) => {
    try {
      await deleteBuku(peminjamanId);
      toast.success('Peminjaman berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus peminjaman');
      console.error('Error deleting peminjaman:', error);
    }
  };

  return (
    <div className="bg-blue-900 text-white min-h-screen">
      <Header />
      <ToastContainer />
      <div className="container mx-auto py-10">
        <h2 className="text-2xl mb-6">Daftar Peminjaman</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Judul Buku</th>
                <th className="px-4 py-2">Tanggal Peminjaman</th>
                <th className="px-4 py-2">Tanggal Pengembalian</th>
                <th className="px-4 py-2">Status Peminjaman</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {peminjaman.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.buku ? item.buku.Judul : 'Data buku tidak tersedia'}</td>
                  <td className="border px-4 py-2">{item.TanggalPeminjaman}</td>
                  <td className="border px-4 py-2">{item.TanggalPengembalian}</td>
                  <td className="border px-4 py-2">{item.StatusPeminjaman}</td>
                  <td className="border px-4 py-2">
                    {(item.StatusPeminjaman === 'RETURNED' || item.StatusPeminjaman === 'REJECTED') && (
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1 md:mx-2 my-1 md:my-0" onClick={() => handleDeleteBuku(item.PeminjamanID)}>
                        <AiOutlineDelete /> 
                      </button>
                    )}
                    {item.StatusPeminjaman === 'APPROVED' && (
                      <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 md:mx-2 my-1 md:my-0" onClick={() => handleReturnBuku(item.PeminjamanID)}>
                          <FaUndo /> Kembalikan
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {peminjaman.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">Belum ada peminjaman.</td>
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

export default Peminjaman;
