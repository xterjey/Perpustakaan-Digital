import React, { useRef } from 'react';
import useLaporanPeminjaman from '../../../hooks/admin/useLaporanPeminjaman';
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import ReactToPrint from 'react-to-print';
import { FaPrint } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const LaporanPeminjaman = () => {
  const {
    laporanPeminjamanTersaring,
    kataKunciPencarian,
    setKataKunciPencarian,
    tanggalMulai,
    setTanggalMulai,
    tanggalAkhir,
    setTanggalAkhir,
    statusFilter,
    handleUbahStatus,
  } = useLaporanPeminjaman();

  const componentToPrintRef = useRef();

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <h2 className="mb-4">Laporan Peminjaman</h2>
          <ReactToPrint
            trigger={() => (
              <button className="bg-green-500 text-white py-2 px-4 rounded-md mb-3 md:mb-0">
                <FaPrint className="inline-block mr-2" /> Cetak Laporan
              </button>
            )}
            content={() => componentToPrintRef.current}
          />
          <div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mb-3 md:mb-0"
              table="table-to-xls"
              filename="laporan_peminjaman"
              sheet="laporan_peminjaman"
              buttonText="Export Excel"
            />
          </div>
          <div className="mb-3 md:flex md:items-center md:space-x-4">
            <input
              type="text"
              placeholder="Cari..."
              className="border border-gray-300 rounded py-2 px-4 mb-2 md:mb-0 w-full md:w-auto"
              value={kataKunciPencarian}
              onChange={(e) => setKataKunciPencarian(e.target.value)}
            />
            <div className="md:flex md:items-center md:space-x-4">
              <div className="flex flex-col">
                <label>Tanggal Mulai</label>
                <input
                  type="date"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="border border-gray-300 rounded py-2 px-4"
                />
              </div>
              <div className="flex flex-col">
                <label>Tanggal Akhir</label>
                <input
                  type="date"
                  value={tanggalAkhir}
                  onChange={(e) => setTanggalAkhir(e.target.value)}
                  className="border border-gray-300 rounded py-2 px-4"
                />
              </div>
              <div className="flex flex-col md:flex-row">
                <label className="mr-2">Filter Status:</label>
                {Object.entries(statusFilter).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleUbahStatus(key)}
                      className="mr-1"
                    />
                    <label>
                      {key === 'approved' && 'Approved'}
                      {key === 'pending' && 'Pending'}
                      {key === 'returned' && 'Returned'}
                      {key === 'rejected' && 'Rejected'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="table-responsive" ref={componentToPrintRef}>
            <table id="table-to-xls" className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 py-2 px-4">ID</th>
                  <th className="border border-gray-300 py-2 px-4">Nama Peminjam</th>
                  <th className="border border-gray-300 py-2 px-4">Judul Buku</th>
                  <th className="border border-gray-300 py-2 px-4">Tanggal Peminjaman</th>
                  <th className="border border-gray-300 py-2 px-4">Tanggal Pengembalian</th>
                  <th className="border border-gray-300 py-2 px-4">Status Peminjaman</th>
                </tr>
              </thead>
              <tbody>
                {laporanPeminjamanTersaring.map((laporan, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 py-2 px-4">{laporan.PeminjamanID}</td>
                    <td className="border border-gray-300 py-2 px-4">{laporan.user ? laporan.user.NamaLengkap : 'Data tidak tersedia'}</td>
                    <td className="border border-gray-300 py-2 px-4">{laporan.buku ? laporan.buku.Judul : 'Data tidak tersedia'}</td>
                    <td className="border border-gray-300 py-2 px-4">{laporan.TanggalPeminjaman}</td>
                    <td className="border border-gray-300 py-2 px-4">{laporan.TanggalPengembalian}</td>
                    <td className="border border-gray-300 py-2 px-4">{laporan.StatusPeminjaman}</td>
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

export default LaporanPeminjaman;
