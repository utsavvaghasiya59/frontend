import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './componant/Footer';
import HeaderIndex from './page/Header';
import { AuthProvider } from './context'; // Import AuthProvider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
export default function App() {
  return (
    <AuthProvider>
      {/* Wrap the app with AuthProvider */}
      <HeaderIndex />
      <main className='min-h-[calc(100vh-130px)] bg-white'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </AuthProvider>
  );
}
