import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../services/api';

const LoginAdmin = () => {
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
      const response = await axios.post('/admin/login', {
        username: dataForm.username,
        password: dataForm.password
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/admin/dashboard');
        toast.success('Login berhasil!');
      } else {
        toast.error('Login gagal, harap periksa username dan password Anda.');
      }
    } catch (error) {
      console.error('Error aktivasi:', error);
      toast.error('Error Ada Yang Salah!!');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 rounded-md bg-white shadow-md">
        <h2 className="text-center text-2xl mb-4">Login Panel Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={dataForm.username}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={dataForm.password}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          {/* <div className="mt-3 text-center">
            Belum punya akun? <Link to="/admin/register" className="text-blue-500">Daftar Sekarang</Link>
          </div> */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginAdmin;
