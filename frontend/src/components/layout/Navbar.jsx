import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-4 z-50 mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-emerald-200/50 bg-white/70 px-8 py-4 shadow-lg backdrop-blur-md">

                <Link
                    to="/"
                    className="text-2xl font-bold text-emerald-600"
                >
                    🛒 SmartStore
                </Link>



                <ul className="flex items-center gap-8">
                    <li><Link
                            to="/"
                            className="font-medium text-slate-700 transition hover:text-emerald-600"
                        >
                            Home
                        </Link></li>
                    <li><Link
                            to="/products"
                            className="font-medium text-slate-700 transition hover:text-emerald-600"
                        >
                            Products
                        </Link></li>
                   <input
                       type="text"
                       placeholder="Search products..."
                       className="rounded-full border border-slate-300 px-4 py-2 outline-none focus:border-emerald-500"
                   />

                </ul>


                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="font-medium text-slate-700 hover:text-emerald-600"
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



        </nav>
    );

}

export default Navbar;