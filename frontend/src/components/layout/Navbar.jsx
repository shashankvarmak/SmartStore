import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="sticky top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-emerald-200/50 bg-white/70 px-8 py-4 shadow-lg backdrop-blur-md">

            {/* Logo */}

            <Link
                to="/"
                className="text-2xl font-bold text-emerald-600"
            >
                🛒 SmartStore
            </Link>

            {/* Center Navigation */}

            <ul className="flex items-center gap-8">

                <li>

                    <Link
                        to="/"
                        className="font-medium text-slate-700 transition hover:text-emerald-600"
                    >
                        Home
                    </Link>

                </li>

                <li>

                    <Link
                        to="/products"
                        className="font-medium text-slate-700 transition hover:text-emerald-600"
                    >
                        Products
                    </Link>

                </li>

                <li>

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="rounded-full border border-slate-300 px-4 py-2 outline-none transition focus:border-emerald-500"
                    />

                </li>

            </ul>

            {/* Right Side */}

            {

                token ?

                    (

                        <div className="flex items-center gap-6">

                            <Link
                                to="/cart"
                                className="font-medium text-slate-700 transition hover:text-emerald-600"
                            >
                                Cart
                            </Link>

                            <Link
                                to="/reservations"
                                className="font-medium text-slate-700 transition hover:text-emerald-600"
                            >
                                Reservations
                            </Link>

                            <Link
                                to="/profile"
                                className="font-medium text-slate-700 transition hover:text-emerald-600"
                            >
                                Profile
                            </Link>

                            <button

                                onClick={handleLogout}

                                className="rounded-full bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"

                            >

                                Logout

                            </button>

                        </div>

                    )

                    :

                    (

                        <div className="flex items-center gap-4">

                            <Link
                                to="/login"
                                className="font-medium text-slate-700 transition hover:text-emerald-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
                            >
                                Register
                            </Link>

                        </div>

                    )

            }

        </nav>

    );

}

export default Navbar;