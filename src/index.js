import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './page/home/Home'
import Contact from './page/contact/Contact';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import SignUp from './page/SignUp';
import Footer from './componant/Footer';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux'
import AdminPanel from './page/Admin/AdminPanel';
import AllUser from './page/Admin/AllUser';
import AllProduct from './page/Admin/AllProduct';
import CategoryProduct from './page/CategoryProduct';
import ProductDetails from './page/ProductDetails';
import UserProfile from './componant/UserProfile';
import PageNotFound from './page/PageNotFound';
import SearchProduct from './page/SearchProduct';
import { ToastContainer } from 'react-toastify';
import AboutUs from './page/Aboutus/Aboutus';
import ContactUs from './page/contact/Contact';
import InquiryForm from './componant/InquiryForm';
import AllInquiry from './page/Admin/AllInquiry';
import UserInquiry from './componant/UserInquiry';
import { PersistGate } from 'redux-persist/integration/react';
import UpdatePassword from './componant/UpdatePassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} >
        <Route path="contactus" element={<ContactUs />} />
        <Route path="" element={<Home />} />
        <Route path='product-category/:categoryName' element={<CategoryProduct />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='search' element={<SearchProduct />} />
        <Route path='profile' element={<UserProfile />} >
          <Route path='inquiries' element={<UserInquiry />} />
          <Route path='update-password' element={<UpdatePassword />} />
        </Route>
        <Route path='aboutus' element={<AboutUs />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='inquiry' element={<InquiryForm />} />
      </Route>
      <Route path='admin-panel' element={<AdminPanel />} >
        <Route path="all-users" element={<AllUser />} />
        <Route path="all-product" element={<AllProduct />} />
        <Route path="all-inquiry" element={<AllInquiry />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
