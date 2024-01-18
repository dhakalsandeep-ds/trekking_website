import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientLayout from "./Pages/ClientLayout/ClientLayout";
import Homepage from "./Pages/ClientView/Homepage/Homepage";
import PageNotFound from "./Pages/ClientView/PageNotFound/PageNotFound";
import AboutUs from "./Pages/ClientView/AboutUs/AboutUs";
import ContactUs from "./Pages/ClientView/ContactUs/ContactUs";
import PerProductInfo from "./Pages/ClientView/PerProductInfo/PerProductInfo";
import CategoryList from "./Pages/ClientView/CategoryList/CategoryList";

import Category from "./Pages/AdminView/Category/Category";
import Contact from "./Pages/AdminView/Contact/Contact";
import ProductDetails from "./Pages/AdminView/ProductDetails/ProductDetails";
import BookingDetails from "./Pages/AdminView/BookingDetails/BookingDetails";

import AddProduct from "./Container/Admin/ProductContainer/AddEditProduct/AddProduct";
import EditProduct from "./Container/Admin/ProductContainer/AddEditProduct/EditProduct";
import Dashboard from "./Pages/AdminView/Dashboard/Dashboard";
import Inquiry from "./Pages/AdminView/Inquiry/Inquiry";
import Login from "./Pages/Login/Login";
import AdminLayout from "./Pages/AdminLayout/AdminLayoutr";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute"
import {AuthState} from "./AuthState";
import HideWhenAuthenticated from "./HIdeWhenAuthunticated";


function App() {
  return (
   
    <BrowserRouter>
     <AuthState>
      <ToastContainer />
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/packages" element={<CategoryList />} />         
          <Route path="/perProduct/:ID" element={<PerProductInfo/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>

        
        <Route path="/login" element={<HideWhenAuthenticated/>}>
        <Route index element={<Login />} />

        </Route>

        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout></AdminLayout>}>
          <Route path="" element={<Dashboard />} />
       
          <Route path="category" element={<Category />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ProductDetails />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:tripID" element={<EditProduct />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="booking/" element={<BookingDetails></BookingDetails>}></Route>
          </Route>
        </Route>
      </Routes>
      </AuthState>
    </BrowserRouter>
    
  );
}

export default App;
