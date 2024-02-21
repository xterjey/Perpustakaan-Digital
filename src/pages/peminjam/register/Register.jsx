import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [isAssignmentChecked, setIsAssignmentChecked] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    Email: '',
    NamaLengkap: '',
    Alamat: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAssignment = () => {
    setIsAssignmentChecked(!isAssignmentChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', {
        username: formData.username,
        password: formData.password,
        Email: formData.Email,
        NamaLengkap: formData.NamaLengkap,
        Alamat: formData.Alamat,
      });

      if (response.status === 201) {
        toast.success(response.data.message); 
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Error register:', error);
      toast.error('Terjadi kesalahan saat registrasi, silakan coba lagi.');
    }
  };

  return (
    <div className="register-container bg-blue-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-md rounded p-8">
        <h2 className="text-center mb-4">Registrasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInput}
              autoComplete="username" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="email" 
              value={formData.Email}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="NamaLengkap"
              placeholder="Nama Lengkap"
              value={formData.NamaLengkap}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="Alamat"
              placeholder="Alamat"
              value={formData.Alamat}
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isAssignmentChecked}
                onChange={handleAssignment}
                required
              />
              <span className="text-gray-700">Saya menyetujui syarat dan ketentuan.</span>
            </label>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isAssignmentChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isAssignmentChecked}
          >
            Registrasi
          </button>

          <p className="mt-4 text-center">
            Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
