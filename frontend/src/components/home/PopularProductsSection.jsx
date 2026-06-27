import ProductCard from "../ui/ProductCard";


function PopularProductsSection() {

   const products = [
       {
           id: 1,
           name: "Fresh Tomatoes",
           price: 40,
           imageUrl: "https://placehold.co/600x400",
           unit: "kg"
       },
       {
           id: 2,
           name: "Amul Milk",
           price: 32,
           imageUrl: "https://placehold.co/600x400",
            unit: "liter"
       },
       {
           id: 3,
           name: "Britannia Bread",
           price: 45,
           imageUrl: "https://placehold.co/600x400",
           unit: "loaf"
       },
       {
           id: 4,
           name: "Basmati Rice",
           price: 699,
           imageUrl: "https://placehold.co/600x400",
           unit: "kg"
       },
   ];

    return (

        <section className="mx-auto mt-24 max-w-7xl px-6">

            <h2 className="text-4xl font-bold text-slate-900">
                Popular Products
            </h2>

            <p className="mt-3 text-lg text-slate-500">
                Discover the most loved products from our store.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                {products.map((product) => (

                    <ProductCard

                        key={product.id}

                        name={product.name}

                        price={product.price}

                        imageUrl={product.imageUrl}

                        unit={product.unit}

                    />

                ))}

            </div>

        </section>

    );
}

export default PopularProductsSection;