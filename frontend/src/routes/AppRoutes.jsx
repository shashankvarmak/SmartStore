
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

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer */}

                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/profile" element={<Profile />} />

                {/* Admin */}

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/inventory" element={<Inventory />} />
                <Route path="/admin/reservations" element={<AdminReservations />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;