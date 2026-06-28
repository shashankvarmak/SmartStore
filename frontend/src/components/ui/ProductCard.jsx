import Button from "./Button";

function ProductCard({

    id,
    name,
    price,
    imageUrl,
    unit,
    quantity,
    availableStock,
    onAddToCart,
    onIncrease,
    onDecrease

}){// Fixed: Removed the duplicate opening brace here
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
               <p className="text-sm text-slate-500">
                   Quantity in Cart : {quantity}
               </p>

               <div className="mt-4">
                   {
                       quantity === 0 ?
                           (
                               <Button
                                   variant="primary"
                                   onClick={() => onAddToCart(id)}
                               >
                                   Add to Cart
                               </Button>
                           )
                           :
                           (
                               <div className="flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-2">
                                   <button
                                       onClick={() => onDecrease(id)}
                                       className="text-2xl font-bold text-white"
                                   >
                                       −
                                   </button>
                                   <span className="text-lg font-semibold text-white">
                                       {quantity}
                                   </span>
                                   <button

                                       onClick={() => onIncrease(id)}

                                       disabled={quantity >= availableStock}

                                       className={`text-2xl font-bold text-white ${
                                           quantity >= availableStock
                                               ? "cursor-not-allowed opacity-50"
                                               : ""
                                       }`}

                                   >

                                       +

                                   </button>
                               </div>
                           )
                   }
               </div>
           </div>
        </div>
    );
}

export default ProductCard;