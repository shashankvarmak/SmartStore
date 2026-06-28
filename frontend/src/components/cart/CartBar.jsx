import { Link } from "react-router-dom";

function CartBar({ totalItems, totalAmount }) {

    if (totalItems === 0) {

        return null;

    }

    return (

        <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 rounded-2xl bg-emerald-600 px-6 py-4 shadow-2xl">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-white">

                        🛒 {totalItems} Items

                    </h3>

                    <p className="text-emerald-100">

                        Total ₹{totalAmount}

                    </p>

                </div>

                <Link

                    to="/cart"

                    className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"

                >

                    View Cart →

                </Link>

            </div>

        </div>

    );

}

export default CartBar;