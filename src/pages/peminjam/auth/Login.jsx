import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    username: '',
    password: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataForm(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        username: dataForm.username,
        password: dataForm.password
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
        toast.success('Login berhasil!');
      } else {
        toast.error('Login gagal, cek kembali username dan password Anda.');
      }
    } catch (error) {
      console.error('Kesalahan Aktivasi:', error);
      toast('Silakan Lakukan Aktivasi Akun Yang Kami Kirim Ke Email Anda !!.');
    }
  };

  return (
    <div className="login-container bg-blue-100 min-h-screen flex justify-center items-center">
      <div className="w-full sm:max-w-md md:max-w-lg bg-white shadow-md rounded p-8">
        <h2 className="text-center text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={dataForm.username}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Username"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Tidak Memiliki Account? <Link to="/register" className="text-blue-500">Daftar Sekarang</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
