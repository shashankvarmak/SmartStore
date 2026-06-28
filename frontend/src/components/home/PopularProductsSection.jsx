import ProductCard from "../ui/ProductCard";


function PopularProductsSection() {

  const featuredProducts = [

      {
          id: 1,
          name: "Fresh Tomatoes",
          price: 40,
          unit: "kg",
          imageUrl: "https://picsum.photos/id/292/600/400",
          quantity: 2
      },

      {
          id: 2,
          name: "Amul Milk",
          price: 32,
          unit: "liter",
          imageUrl: "https://picsum.photos/id/433/600/400",
          quantity: 1
      },

      {
          id: 3,
          name: "Britannia Bread",
          price: 45,
          unit: "loaf",
          imageUrl: "https://picsum.photos/id/1060/600/400",
          quantity: 0
      },

      {
          id: 4,
          name: "Basmati Rice",
          price: 699,
          unit: "kg",
          imageUrl: "https://picsum.photos/id/20/600/400",
          quantity: 3
      }

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

                {featuredProducts.map((product) => (

                    <ProductCard

                        key={product.id}

                        name={product.name}

                        price={product.price}

                        imageUrl={product.imageUrl}

                        unit={product.unit}

                        quantity={product.quantity}

                    />

                ))}

            </div>

        </section>

    );
}

export default PopularProductsSection;