import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import useDashboard from '../../../hooks/admin/useDashboard';
import { useAuth } from '../../../context/AuthContext';

import './Dashboard.css';

const DashboardAdmin = () => {
  const { getUsername } = useAuth();
  const { 
    totalPeminjaman, 
    totalPeminjamPending, 
    totalPeminjamApproved, 
    totalPeminjamReturned,
    totalPeminjamRejected,
    totalBuku
  } = useDashboard();

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Header />
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-3">
              <h4>Selamat Datang, {getUsername()}!</h4>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Total Peminjaman</h4>
                    <p>{totalPeminjaman}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Pending</h4>
                    <p>{totalPeminjamPending}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Approved</h4>
                    <p>{totalPeminjamApproved}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Returned</h4>
                    <p>{totalPeminjamReturned}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Rejected</h4>
                    <p>{totalPeminjamRejected}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-3">
                    <h4>Total Buku</h4>
                    <p>{totalBuku}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
