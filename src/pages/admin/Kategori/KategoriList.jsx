import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import useKategori from '../../../hooks/admin/useKategori';

const KategoriList = () => {
  const { kategori, hapusKategori, buatKategori, perbaruiKategori } = useKategori();
  const [showModal, setShowModal] = useState(false);
  const [editedKategori, setEditedKategori] = useState({
    KategoriID: null,
    NamaKategori: ''
  });

  const handleDelete = async (kategoriID) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        await hapusKategori(kategoriID);
        console.log('Kategori berhasil dihapus');
      } catch (error) {
        console.error('Error menghapus kategori:', error);
      }
    }
  };

  const handleShowModal = (kategori) => {
    setEditedKategori(kategori);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditedKategori({
      KategoriID: null,
      NamaKategori: ''
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedKategori(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editedKategori.KategoriID) {
        await perbaruiKategori(editedKategori.KategoriID, editedKategori);
      } else {
        await buatKategori(editedKategori);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <h2>Daftar Kategori Buku</h2>
            <div className="mb-3">
              <button
                onClick={() => handleShowModal({ KategoriID: null, NamaKategori: '' })}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaPlus className="inline-block mr-1" /> Kategori
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {kategori.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.NamaKategori}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button className="text-red-500 hover:text-red-700 flex items-center" onClick={() => handleDelete(item.KategoriID)}>
                          <span className="hidden sm:inline">Delete</span> <FaTrash className="ml-1" />
                        </button>
                        <button className="text-blue-500 hover:text-blue-700 flex items-center" onClick={() => handleShowModal(item)}>
                          <span className="hidden sm:inline">Edit</span> <FaPencilAlt className="ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {editedKategori.KategoriID ? 'Edit Kategori' : 'Tambah Kategori'}
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Masukkan nama kategori"
                        name="NamaKategori"
                        value={editedKategori.NamaKategori}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm"
                  onClick={handleSubmit}
                >
                  {editedKategori.KategoriID ? 'Simpan Perubahan' : 'Tambah'}
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KategoriList;
