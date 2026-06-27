import { useEffect, useState } from "react";

import ProductCard from "../../components/ui/ProductCard";

import { getAllProducts } from "../../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [productPage, setProductPage] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchProducts();

    }, []);

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

                                        name={product.name}

                                        price={product.price}

                                        unit={product.unit}

                                        imageUrl={product.imageUrl}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </section>

    );

}

export default Products;