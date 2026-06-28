import { useEffect, useState } from "react";

import ProductCard from "../../components/ui/ProductCard";

import { searchProducts,getAllProducts } from "../../services/productService";

import { useSearchParams } from "react-router-dom";

import { addToCart } from "../../services/cartService";

import CartBar from "../../components/cart/CartBar";

import toast from "react-hot-toast";

import { getCart,   updateCartItem } from "../../services/cartService";

function Products() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(null);
    const [productPage, setProductPage] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("search") || "";

    const handleAddToCart = async (productId) => {

        try {

            const request = {

                productId,

                quantity: 1

            };

            const response = await addToCart(request);
            setCart(response.data);

            console.log(response.data);

            toast.success("Product added to cart.");

        }

        catch (error) {

            console.error(error);

            console.log(error.response);

            console.log(error.response?.data);

            console.log(error.response?.status);

            alert("Unable to add product to cart.");

        }

    };
    const fetchCart = async () => {

        try {

            const response = await getCart();

            setCart(response.data);
            console.log("Cart:", response.data);

        }

        catch (error) {

            console.error(error);

        }

    };
    const getCartItem = (productId) => {

        return cart?.items?.find(

            item => item.productId === productId

        );

    };
    const getQuantity = (productId) => {

        const item = getCartItem(productId);

        return item ? item.quantity : 0;

    };
    const handleIncrease = async (productId) => {

        const cartItem = getCartItem(productId);

        if (!cartItem) return;

        try {

            const response = await updateCartItem(

                cartItem.cartItemId,

                cartItem.quantity + 1

            );

            setCart(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };
    const handleDecrease = async (productId) => {

        const cartItem = getCartItem(productId);

        if (!cartItem) return;

        try {

            const response = await updateCartItem(

                cartItem.cartItemId,

                cartItem.quantity - 1

            );

            setCart(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (keyword.trim() === "") {

            fetchProducts();
            fetchCart();

        } else {

            fetchSearchProducts(keyword);

        }

    }, [keyword]);

    const fetchProducts = async () => {

        try {

            const response = await getAllProducts();


            setProductPage(response.data);

            setProducts(response.data.content);

        }

        catch (error) {

            console.error(error);

            setError("Unable to load products.");

        }

        finally {

            setLoading(false);

        }

    };
    const fetchSearchProducts = async (keyword) => {

        try {

            const response = await searchProducts(keyword);

            setProducts(response.data);

        }

        catch (error) {

            console.error(error);

            setError("Unable to search products.");

        }

    };

    if (loading) {

        return (

            <div className="mt-24 text-center text-lg font-semibold text-slate-600">

                Loading products...

            </div>

        );

    }

    if (error) {

        return (

            <div className="mt-24 text-center text-red-500">

                {error}

            </div>

        );

    }

    return (
        <>

        <section className="mx-auto mt-16 max-w-7xl px-6">

            <h1 className="text-4xl font-bold text-slate-900">

                Fresh Groceries

            </h1>

            <p className="mt-3 text-lg text-slate-500">

                Browse fresh products available for reservation.

            </p>


            {

                products.length === 0 ?

                    (

                        <div className="mt-16 text-center text-slate-500">

                            No products available.

                        </div>

                    )

                    :

                    (

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                            {

                                products.map(product => (

                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        unit={product.unit}
                                        imageUrl={product.imageUrl}
                                        quantity={getQuantity(product.id)}
                                        availableStock={product.stockQuantity - product.reservedStock}
                                        onAddToCart={handleAddToCart}
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                    />

                                ))

                            }

                        </div>

                    )

            }


        </section>

        <CartBar
                    totalItems={cart?.totalItems ?? 0}
                    totalAmount={cart?.totalAmount ?? 0}
                />
        </>

    );

}

export default Products;