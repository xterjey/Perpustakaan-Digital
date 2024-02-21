import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/peminjam/auth/Login';
import Register from './pages/peminjam/register/Register';
import PrivateRoute from './private/PrivateRoute';
import Dashboard from './pages/peminjam/dashboard/Dashboard';
import ShowBuku from './pages/peminjam/DetailBuku/ShowBuku';
import KoleksiPribadi from './pages/peminjam/Koleksi/KoleksiPribadi.';
import Peminjaman from './pages/peminjam/peminjaman/Peminjaman';
import './App.css'
import LoginAdmin from './pages/admin/auth/LoginAdmin';
// import RegisterAdmin from './pages/admin/register/RegisterAdmin';
import DashboardAdmin from './pages/admin/dashboard/DashboardAdmin';
import KategoriList from './pages/admin/Kategori/KategoriList';
import BukuList from './pages/admin/buku/BukuList';
import CreateBuku from './pages/admin/buku/CreateBuku';
import EditBuku from './pages/admin/buku/EditBuku';
import DetailBuku from './pages/admin/buku/DetailBuku';
import Peminjam from './pages/admin/peminjam/Peminjaman';
import LaporanPeminjaman from './pages/admin/laporan/LaporanPeminjaman';
import UserList from './pages/admin/user/UserList';
import UserCreate from './pages/admin/user/UserCreate';
import UserEdit from './pages/admin/user/EditUser';
import UserDetail from './pages/admin/user/UserDetail';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route User */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<LandingPage />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/dashboard/buku/:bookId" element={<PrivateRoute element={<ShowBuku />} />} />
          <Route path="/dashboard/koleksi" element={<PrivateRoute element={<KoleksiPribadi />} />} />
          <Route path="/dashboard/peminjam" element={<PrivateRoute element={<Peminjaman />} />} />


          {/* Route Admin */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          {/* <Route path="/admin/register" element={<RegisterAdmin />} /> */}
          <Route path="/admin/dashboard" element={<PrivateRoute element={<DashboardAdmin />} />} />

          <Route path="/admin/dashboard/kategori" element={<PrivateRoute element={<KategoriList />} />} />

          <Route path="/admin/dashboard/buku" element={<PrivateRoute element={<BukuList />} />} />

          <Route path="/admin/dashboard/buku/create" element={<PrivateRoute element={<CreateBuku />} />} />
          <Route path="/admin/dashboard/buku/edit/:bookId" element={<PrivateRoute element={<EditBuku />} />} />
          <Route path="/admin/dashboard/buku/detail/:bookId" element={<PrivateRoute element={<DetailBuku />} />} />


          <Route path="/admin/dashboard/peminjaman" element={<PrivateRoute element={<Peminjam />} />} />
          <Route path="/admin/dashboard/laporan" element={<PrivateRoute element={<LaporanPeminjaman />} />} />

          <Route path="/admin/dashboard/management" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/admin/dashboard/management/create" element={<PrivateRoute element={<UserCreate />} />} />
          <Route path="/admin/dashboard/management/edit/:userID" element={<PrivateRoute element={<UserEdit />} />} />
          <Route path="/admin/dashboard/management/show/:userID" element={<PrivateRoute element={<UserDetail />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
