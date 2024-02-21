import React from 'react';
import useUserCreate from '../../../hooks/admin/useUserCreate';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';

const UserCreate = () => {
  const { formData, loading, handleChange, buatPengguna } = useUserCreate();

  const handleSubmit = (e) => {
    e.preventDefault();
    buatPengguna(formData);
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <h2 className="mb-4">Buat Pengguna Baru</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Masukkan username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Masukkan password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Masukkan email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    id="namaLengkap"
                    placeholder="Masukkan nama lengkap"
                    name="NamaLengkap"
                    value={formData.NamaLengkap}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                  <input
                    type="text"
                    id="alamat"
                    placeholder="Masukkan alamat"
                    name="Alamat"
                    value={formData.Alamat}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="petugas">Petugas</option>
                    <option value="peminjam">Peminjam</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  >
                    <option value="active">Aktif</option>
                    <option value="registered">Terdaftar</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {loading ? 'Loading...' : 'Buat Pengguna'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
