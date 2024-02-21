import React from 'react';
import { AiOutlineCheck, AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import usePeminjaman from '../../../hooks/admin/usePeminjaman';
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';

const Peminjaman = () => {
  const {
    peminjamans,
    hapusPeminjaman,
    setujuiPeminjaman,
    tolakPeminjaman,
    searchTerm,
    handleSearch,
  } = usePeminjaman();

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <h2 className="text-2xl font-semibold mb-4">Daftar Peminjaman</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nama Peminjam</th>
                  <th className="py-2 px-4 border-b">Judul Buku</th>
                  <th className="py-2 px-4 border-b">Tanggal Peminjaman</th>
                  <th className="py-2 px-4 border-b">Tanggal Pengembalian</th>
                  <th className="py-2 px-4 border-b">Status Peminjaman</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {peminjamans.map((peminjaman, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{peminjaman.user.NamaLengkap}</td>
                    <td className="py-2 px-4 border-b">{peminjaman.buku.Judul}</td>
                    <td className="py-2 px-4 border-b">{peminjaman.TanggalPeminjaman}</td>
                    <td className="py-2 px-4 border-b">{peminjaman.TanggalPengembalian}</td>
                    <td className="py-2 px-4 border-b">{peminjaman.StatusPeminjaman}</td>
                    <td className="py-2 px-4 border-b">
                      {peminjaman.StatusPeminjaman !== 'APPROVED' &&
                        peminjaman.StatusPeminjaman !== 'REJECTED' &&
                        peminjaman.StatusPeminjaman !== 'RETURNED' && (
                          <>
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                              onClick={() => setujuiPeminjaman(peminjaman.PeminjamanID)}
                            >
                              <AiOutlineCheck className="inline-block mr-1" /> Setujui
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2"
                              onClick={() => tolakPeminjaman(peminjaman.PeminjamanID)}
                            >
                              <AiOutlineClose className="inline-block mr-1" /> Tolak
                            </button>
                          </>
                        )}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => hapusPeminjaman(peminjaman.PeminjamanID)}
                      >
                        <AiOutlineDelete className="inline-block mr-1" /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peminjaman;
