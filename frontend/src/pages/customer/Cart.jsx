import { useEffect, useState } from "react";

import {
    getCart,
    updateCartItem,
    clearCart
} from "../../services/cartService";

function Cart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const response = await getCart();

            setCart(response.data);

        }

        catch (error) {

            console.error(error);

            setError("Unable to load cart.");

        }

        finally {

            setLoading(false);

        }

    };

    const increaseQuantity = async (item) => {

        try {

            const response = await updateCartItem(
                item.cartItemId,
                item.quantity + 1
            );

            setCart(response.data);

        }

        catch (error) {

            console.error("===== UPDATE QUANTITY ERROR =====");

            console.error(error);

            console.log("Status :", error.response?.status);

            console.log("Message :", error.response?.data);

            console.log("Headers :", error.response?.headers);

            console.log("Request :", {

                cartItemId: item.cartItemId,

                quantity: item.quantity + 1

            });

            alert(error.response?.data || "Unable to update quantity.");

        }

    };

    const decreaseQuantity = async (item) => {

        try {

            const response = await updateCartItem(
                item.cartItemId,
                item.quantity - 1
            );

            setCart(response.data);

        }

        catch (error) {

            console.error("===== DECREASE QUANTITY ERROR =====");

            console.error(error);

            console.log("Status :", error.response?.status);

            console.log("Message :", error.response?.data);

            console.log("Headers :", error.response?.headers);

            console.log("Request :", {

                cartItemId: item.cartItemId,

                quantity: item.quantity - 1

            });

            alert(error.response?.data || "Unable to update quantity.");

        }

    };

    const handleClearCart = async () => {

        if (!window.confirm("Clear your cart?")) {

            return;

        }

        try {

            const response = await clearCart();

            setCart(response.data);

        }

       catch (error) {

           console.error("===== CLEAR CART ERROR =====");

           console.error(error);

           console.log("Status :", error.response?.status);

           console.log("Message :", error.response?.data);

           console.log("Headers :", error.response?.headers);

           alert(error.response?.data || "Unable to clear cart.");

       }

    };

    if (loading) {

        return (

            <div className="mt-20 text-center text-lg font-semibold">

                Loading cart...

            </div>

        );

    }

    if (error) {

        return (

            <div className="mt-20 text-center text-red-500">

                {error}

            </div>

        );

    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-10">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold">

                        🛒 My Cart

                    </h1>

                    <p className="mt-2 text-slate-500">

                        Review your reserved groceries.

                    </p>

                </div>

                {

                    cart?.items?.length > 0 && (

                        <button

                            onClick={handleClearCart}

                            className="rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"

                        >

                            Clear Cart

                        </button>

                    )

                }

            </div>

            {

                cart?.items?.length === 0 ?

                    (

                        <div className="mt-20 text-center">

                            <h2 className="text-2xl font-semibold">

                                Your cart is empty.

                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">

                            <div className="space-y-6">

                                {

                                    cart.items.map(item => (

                                        <div

                                            key={item.cartItemId}

                                            className="flex items-center justify-between rounded-3xl bg-white p-6 shadow"

                                        >

                                            <div className="flex items-center gap-5">

                                                <img

                                                    src={item.imageUrl}

                                                    alt={item.productName}

                                                    className="h-24 w-24 rounded-xl object-cover"

                                                />

                                                <div>

                                                    <h3 className="text-xl font-semibold">

                                                        {item.productName}

                                                    </h3>

                                                    <p className="text-slate-500">

                                                        ₹{item.price} / {item.unit}

                                                    </p>

                                                    <p className="mt-2 font-semibold text-emerald-600">

                                                        ₹{item.totalPrice}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3">

                                                <button

                                                    onClick={() => decreaseQuantity(item)}

                                                    className="h-10 w-10 rounded-full bg-slate-200 text-xl"

                                                >

                                                    -

                                                </button>

                                                <span className="w-8 text-center font-semibold">

                                                    {item.quantity}

                                                </span>

                                                <button

                                                    onClick={() => increaseQuantity(item)}

                                                    className="h-10 w-10 rounded-full bg-emerald-600 text-xl text-white"

                                                >

                                                    +

                                                </button>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                            <div className="sticky top-24 h-fit rounded-3xl bg-white p-8 shadow">

                                <h2 className="text-2xl font-bold">

                                    Order Summary

                                </h2>

                                <div className="mt-8 flex justify-between">

                                    <span>Total Items</span>

                                    <span>{cart.totalItems}</span>

                                </div>

                                <div className="mt-4 flex justify-between text-xl font-bold">

                                    <span>Total</span>

                                    <span>₹{cart.totalAmount}</span>

                                </div>

                                <button

                                    className="mt-8 w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700"

                                >

                                    Proceed to Reservation

                                </button>

                            </div>

                        </div>

                    )

            }

        </section>

    );

}

export default Cart;