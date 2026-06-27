import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="mt-24 bg-slate-900 text-white">

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-3">

                <div>

                    <h2 className="text-2xl font-bold text-emerald-400">
                        SmartStore
                    </h2>

                    <p className="mt-4 text-slate-300">
                        Fresh groceries with convenient online reservation.
                    </p>

                </div>

                <div>

                    <h3 className="mb-4 text-lg font-semibold">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">

                        <li><Link to="/">Home</Link></li>

                        <li><Link to="/products">Products</Link></li>

                        <li><Link to="/cart">Cart</Link></li>

                        <li><Link to="/reservations">Reservations</Link></li>

                    </ul>

                </div>

                <div>

                    <h3 className="mb-4 text-lg font-semibold">
                        Contact
                    </h3>

                    <p>Email: owner@smartstore.com</p>

                    <p className="mt-2">
                        Phone: +91 9876543210
                    </p>

                    <p className="mt-2">
                        Hyderabad, India
                    </p>

                </div>

            </div>

            <div className="border-t border-slate-700 py-5 text-center text-slate-400">

                © 2026 SmartStore. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;