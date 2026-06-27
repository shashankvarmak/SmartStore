import {
    ShoppingCart,
    Leaf,
    Apple,
    Milk,
    CircleCheck
} from "lucide-react";

function HeroPreviewCard() {

    const products = [
        {
            icon: Leaf,
            name: "Fresh Vegetables",
        },
        {
            icon: Apple,
            name: "Organic Fruits",
        },
        {
            icon: Milk,
            name: "Dairy Products",
        },
    ];

    return (
        <div className="relative">

            {/* Main Preview Card */}
            <div className="relative w-[420px] rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-xl">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                        <ShoppingCart
                            size={32}
                            className="text-emerald-600"
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-800">
                            SmartStore
                        </h3>

                        <p className="text-sm text-slate-400">
                            Grocery Reservation Preview
                        </p>
                    </div>

                </div>

                {/* Product List */}
                <div className="space-y-4">

                    {products.map((product, index) => {

                        const Icon = product.icon;

                        return (

                            <div
                                key={index}
                                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="rounded-xl bg-emerald-50 p-2">
                                        <Icon
                                            size={22}
                                            className="text-emerald-600"
                                        />
                                    </div>

                                    <span className="font-medium text-slate-700">
                                        {product.name}
                                    </span>

                                </div>

                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    Available
                                </span>

                            </div>

                        );

                    })}

                </div>

                {/* Bottom Status */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">

                    <div className="flex items-center gap-2">

                        <CircleCheck
                            size={18}
                            className="text-emerald-600"
                        />

                        <span className="font-medium text-slate-700">
                            Ready for Pickup
                        </span>

                    </div>

                    <span className="font-semibold text-emerald-600">
                        100% Fresh
                    </span>

                </div>

            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-15 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg">

                <CircleCheck size={18} />

                <span>Pickup in 15 mins</span>

            </div>

        </div>
    );
}

export default HeroPreviewCard;