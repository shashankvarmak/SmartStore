import Button from "./Button";

function ProductCard({
    name,
    price,
    imageUrl,
    unit,
}) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">

            <img
                src={imageUrl}
                alt={name}
                className="h-52 w-full object-cover"
            />

           <div className="p-4">

               <h3 className="text-lg font-semibold text-slate-800">
                   {name}
               </h3>

               <p className="mt-1 text-lg font-bold text-emerald-600">
                   ₹{price} / {unit}
               </p>

               <div className="mt-3">
                   <Button variant="primary">
                       Add to Cart
                   </Button>
               </div>

           </div>

        </div>
    );
}

export default ProductCard;