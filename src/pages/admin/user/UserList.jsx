import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { BsFillTrashFill, BsPencil, BsEye, BsPlus } from 'react-icons/bs';
import useUserList from '../../../hooks/admin/useUserList';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';

const UserList = () => {
  const {
    daftarPengguna,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedRole,
    setSelectedRole,
    hapusPengguna,
    aktifkanPengguna,
    nonaktifkanPengguna,
    error,
  } = useUserList();

  const handleDeleteUser = (UserID) => {
    hapusPengguna(UserID);
  };

  const handleSwitchChange = (UserID, newStatus) => {
    if (newStatus) {
      aktifkanPengguna(UserID);
    } else {
      nonaktifkanPengguna(UserID);
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <h2 className="mb-4">Daftar Pengguna</h2>
          <div className="mb-3 flex flex-wrap items-center space-x-4">
            <input
              type="text"
              placeholder="Search ....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 mb-2 w-full md:w-auto"
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 mb-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 mb-2"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="petugas">Petugas</option>
              <option value="peminjam">Peminjam</option>
            </select>
            <Link to="/admin/dashboard/management/create">
  <button className="bg-blue-500 text-white py-2 px-4 rounded-md md:py-1 md:px-3">
    <BsPlus className="inline-block mr-2" /> User
  </button>
</Link>

          </div>
          <div className="table-responsive">
            {error ? (
              <p>Error fetching data: {error.message}</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 py-2 px-4">ID</th>
                    <th className="border border-gray-300 py-2 px-4">Username</th>
                    <th className="border border-gray-300 py-2 px-4">Email</th>
                    <th className="border border-gray-300 py-2 px-4">Nama Lengkap</th>
                    <th className="border border-gray-300 py-2 px-4">Alamat</th>
                    <th className="border border-gray-300 py-2 px-4">Role</th>
                    <th className="border border-gray-300 py-2 px-4">Status</th>
                    <th className="border border-gray-300 py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPengguna.map((pengguna, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
                      <td className="border border-gray-300 py-2 px-4">{pengguna.username}</td>
                      <td className="border border-gray-300 py-2 px-4">{pengguna.Email}</td>
                      <td className="border border-gray-300 py-2 px-4">{pengguna.NamaLengkap}</td>
                      <td className="border border-gray-300 py-2 px-4">{pengguna.Alamat}</td>
                      <td className="border border-gray-300 py-2 px-4">{pengguna.role}</td>
                      <td className="border border-gray-300 py-2 px-4">
                        <BootstrapSwitchButton
                          checked={pengguna.status === 'active'}
                          onstyle="success"
                          offstyle="danger"
                          size="sm"
                          onChange={(checked) => handleSwitchChange(pengguna.UserID, checked)}
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-4">
                        <Link to={`/admin/dashboard/management/edit/${pengguna.UserID}`}>
                          <button className="bg-blue-500 text-white py-1 px-3 rounded-md me-2">
                            <BsPencil />
                          </button>
                        </Link>
                        <Link to={`/admin/dashboard/management/show/${pengguna.UserID}`}>
                          <button className="bg-blue-500 text-white py-1 px-3 rounded-md me-2">
                            <BsEye />
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-md"
                          onClick={() => handleDeleteUser(pengguna.UserID)}
                        >
                          <BsFillTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
