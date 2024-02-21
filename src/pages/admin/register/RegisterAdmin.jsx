// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from '../../../services/api';

// const RegisterAdmin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/admin/register', {
//         username: formData.username,
//         password: formData.password
//       });

//       if (response.data.message) {
//         toast.success(response.data.message);
//         navigate('/admin/login');
//       } else {
//         toast.error('Register gagal coba lagi.');
//       }
//     } catch (error) {
//       console.error('Error Register:', error);
//       toast.error('Periksa Password anda.');
//     }
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen flex justify-center items-center">
//       <div className="max-w-md w-full p-6 rounded-md bg-white shadow-md">
//         <h2 className="text-center mb-4">Register Admin</h2>
//         <form onSubmit={handleRegisterSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               autoComplete="username"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               autoComplete="new-password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//           >
//             Register
//           </button>

//           <div className="mt-3 text-center">
//             Jika Sudah Punya Akun? <Link to="/admin/login" className="text-blue-500">Login Sekarang</Link>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default RegisterAdmin;
