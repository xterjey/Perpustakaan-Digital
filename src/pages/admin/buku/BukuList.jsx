import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus, FaInfoCircle } from 'react-icons/fa';
import useListBuku from '../../../hooks/admin/useBukuList';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';

const BukuList = () => {
  const { daftarBuku, handleHapusBuku, handleSearch } = useListBuku();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e);
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
              <h2 className="mb-2 sm:mb-0">Daftar Buku</h2>
              <Link to="/admin/dashboard/buku/create" className="btn btn-primary">
                <FaPlus className="inline-block mr-1" /> Buku
              </Link>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Cari berdasarkan ISBN, Judul, Penulis, atau Penerbit"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerbit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {daftarBuku.map((buku, urut) => (
                    <tr key={buku.BukuID} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{urut + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buku.ISBN}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buku.Judul}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buku.Penulis}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buku.Penerbit}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{buku.stok}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={buku.imageurl} alt={buku.Judul} className="w-24 h-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">
                          <button onClick={() => handleHapusBuku(buku.BukuID)} className="text-red-500 hover:text-red-700 mr-2 flex items-center">
                            <FaTrash className="inline-block mr-1" /> Delete
                          </button>
                          <Link to={`/admin/dashboard/buku/edit/${buku.BukuID}`} className="text-blue-500 hover:text-blue-700 mr-2 flex items-center no-underline">
                            <FaEdit className="inline-block mr-1" /> Edit
                          </Link>
                          <Link to={`/admin/dashboard/buku/detail/${buku.BukuID}`} className="text-blue-500 hover:text-blue-700 flex items-center no-underline">
                            <FaInfoCircle className="inline-block mr-1" /> Detail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BukuList;
