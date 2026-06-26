
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Products from "../pages/customer/Products";
import Cart from "../pages/customer/Cart";
import Reservations from "../pages/customer/Reservations";
import Profile from "../pages/customer/Profile";
import ProductDetails from "../pages/customer/ProductDetails";

import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Inventory from "../pages/admin/Inventory";
import AdminReservations from "../pages/admin/Reservations";

import CustomerLayout from "../layout/CustomerLayout";
import AdminLayout from "../layout/AdminLayout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer */}

                    <Route path="/" element={<CustomerLayout />}>
                                    <Route index element={<Home />} />
                                    <Route path="products" element={<Products />} />
                                    <Route path="products/:id" element={<ProductDetails />} />
                                    <Route path="cart" element={<Cart />} />
                                    <Route path="reservations" element={<Reservations />} />
                                    <Route path="profile" element={<Profile />} />
                    </Route>




                {/* Admin */}
                <Route path="/admin" element={<AdminLayout />}>


                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<Categories />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="reservations" element={<AdminReservations />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;