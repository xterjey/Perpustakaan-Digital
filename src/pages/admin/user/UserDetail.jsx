import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useDetailUser from '../../../hooks/admin/useDetailUser';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';

const UserDetail = () => {
  const { userID } = useParams();
  const { userDetail, loading, error } = useDetailUser(userID);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <h2 className="mb-4">Detail User</h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p><strong>Username:</strong> {userDetail.username}</p>
            <p><strong>Password:</strong> {userDetail.password}</p>
            <p><strong>Email:</strong> {userDetail.email}</p>
            <p><strong>Nama Lengkap:</strong> {userDetail.NamaLengkap}</p>
            <p><strong>Alamat:</strong> {userDetail.Alamat}</p>
            <p><strong>Role:</strong> {userDetail.role}</p>
            <p><strong>Verification Token:</strong> {userDetail.verification_token}</p>
            <p><strong>Status:</strong> {userDetail.status}</p>
          </div>
          <Link to="/admin/dashboard/management" className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
