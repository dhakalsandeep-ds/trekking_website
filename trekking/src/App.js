import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import ClientLayout from "./Pages/ClientLayout/ClientLayout";
import Homepage from "./Pages/ClientView/Homepage/Homepage";
import AdminLayout from "./Pages/AdminLayout/AdminLayout";
import PageNotFound from "./Pages/ClientView/PageNotFound/PageNotFound";
import AboutUs from "./Pages/ClientView/AboutUs/AboutUs";
import ContactUs from "./Pages/ClientView/ContactUs/ContactUs";
import PerProductInfo from "./Pages/ClientView/PerProductInfo/PerProductInfo";
import CategoryList from "./Pages/ClientView/CategoryList/CategoryList";
import About from "./Pages/AdminView/About/About";
import Category from "./Pages/AdminView/Category/Category";
import Contact from "./Pages/AdminView/Contact/Contact";
import ProductDetails from "./Pages/AdminView/ProductDetails/ProductDetails";
import BookingDetails from "./Pages/AdminView/BookingDetails/BookingDetails";
import SocialMediaDetails from "./Pages/AdminView/SocialMediaDetails/SocialMediaDetails";
import ProductReviewDetails from "./Pages/AdminView/ProductReviewDetails/ProductReviewDetails";
import AccountDetails from "./Pages/AdminView/AccountDetails/AccountDetails";
import AddProduct from "./Container/Admin/ProductContainer/AddEditProduct/AddProduct";
import EditProduct from "./Container/Admin/ProductContainer/AddEditProduct/EditProduct";
import Dashboard from "./Pages/AdminView/Dashboard/Dashboard";
import Inquiry from "./Pages/AdminView/Inquiry/Inquiry";
import Login from "./Pages/Login/Login";
import SoloActivity from "./Pages/ClientView/SoloActivity/SoloActivity";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/perproduct" element={<PerProductInfo />} />
          <Route path="/activities" element={<CategoryList />} />
          <Route path="/activities/:activity" element={<SoloActivity />} />
          <Route
            path="/activities/:activity/:tripID"
            element={<PerProductInfo />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />} path="/admin">
            <Route path="" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="category" element={<Category />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<ProductDetails />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:tripID" element={<EditProduct />} />
            <Route path="booking" element={<BookingDetails />} />
            <Route path="social" element={<SocialMediaDetails />} />
            <Route path="reviews" element={<ProductReviewDetails />} />
            <Route path="account" element={<AccountDetails />} />
            <Route path="inquiry" element={<Inquiry />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
